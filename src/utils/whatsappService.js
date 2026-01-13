import { convertPrice } from './currencyRates';

// Currency symbols mapping
const currencySymbols = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  AUD: 'A$',
  CAD: 'C$',
  CNY: '¥'
};

// WhatsApp notification service
export const sendWhatsAppNotification = async (phoneNumber, message) => {
  try {
    // Backend will handle actual Twilio integration
    const response = await fetch('/api/notifications/whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phoneNumber,
        message,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send WhatsApp notification');
    }

    return await response.json();
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    throw error;
  }
};

// Format address for WhatsApp message
export const formatAddressForWhatsApp = (address, countryCode) => {
  let msg = '';
  msg += 'Delivery Address Confirmed\n';
  msg += '\n';
  msg += 'Name: ' + address.firstName + ' ' + address.lastName + '\n';
  msg += 'Phone: ' + countryCode + ' ' + address.phone + '\n';
  msg += 'Email: ' + address.email + '\n';
  msg += '\n';
  msg += 'Address:\n';
  msg += address.street + '\n';
  msg += address.city + ', ' + address.state + ' ' + address.zipCode + '\n';
  msg += address.country + '\n';
  msg += '\n';
  msg += 'Your order will be delivered to this address.';
  return msg;
};

// Format order summary for WhatsApp
export const formatOrderForWhatsApp = (orderData) => {
  // Get currency info
  const currency = orderData.currency || 'USD';
  const rates = orderData.currencyRates || { USD: 1, INR: 83.1, EUR: 0.92, GBP: 0.81, JPY: 145.2, AUD: 1.48, CAD: 1.34, CNY: 7.1 };
  const symbol = currencySymbols[currency] || currency;

  // Convert and format item prices
  let itemsText = '';
  for (let i = 0; i < orderData.items.length; i++) {
    const item = orderData.items[i];
    const itemUnitPrice = item.price || 0;
    const convertedPrice = convertPrice(itemUnitPrice, 'USD', currency, rates);
    const itemTotal = convertedPrice * item.quantity;
    
    itemsText += '- ' + item.name + ' (Qty: ' + item.quantity + ') - ' + symbol + itemTotal.toFixed(currency === 'INR' ? 0 : 2);
    if (i < orderData.items.length - 1) itemsText += '\n';
  }

  // Calculate totals in USD first
  const subtotalUSD = orderData.items.reduce(function(sum, item) { return sum + ((item.price || 0) * item.quantity); }, 0);
  const taxUSD = subtotalUSD * 0.1;
  const shippingUSD = subtotalUSD > 100 ? 0 : 10;
  const totalUSD = subtotalUSD + taxUSD + shippingUSD;

  // Convert totals to target currency
  const subtotal = convertPrice(subtotalUSD, 'USD', currency, rates);
  const tax = convertPrice(taxUSD, 'USD', currency, rates);
  const shipping = convertPrice(shippingUSD, 'USD', currency, rates);
  const total = convertPrice(totalUSD, 'USD', currency, rates);

  // Build message
  let msg = '';
  msg += 'ORDER CONFIRMATION\n';
  msg += '\n';
  msg += 'Order ID: ' + orderData.tracking + '\n';
  msg += 'Date: ' + new Date(orderData.date).toLocaleDateString() + '\n';
  msg += '\n';
  msg += 'Items:\n' + itemsText + '\n';
  msg += '\n';
  msg += 'Order Total:\n';
  msg += '  Subtotal: ' + symbol + subtotal.toFixed(currency === 'INR' ? 0 : 2) + '\n';
  msg += '  Tax (10%): ' + symbol + tax.toFixed(currency === 'INR' ? 0 : 2) + '\n';
  msg += '  Shipping: ' + symbol + shipping.toFixed(currency === 'INR' ? 0 : 2) + '\n';
  msg += '  -----\n';
  msg += '  TOTAL: ' + symbol + total.toFixed(currency === 'INR' ? 0 : 2) + '\n';
  msg += '\n';
  msg += 'Payment: ' + (orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod) + '\n';
  msg += '\n';
  msg += 'Delivery Address:\n';
  msg += orderData.shippingAddress.firstName + ' ' + orderData.shippingAddress.lastName + '\n';
  msg += orderData.shippingAddress.street + '\n';
  msg += orderData.shippingAddress.city + ', ' + orderData.shippingAddress.state + ' ' + orderData.shippingAddress.zipCode + '\n';
  msg += orderData.shippingAddress.country + '\n';
  msg += '\n';
  msg += 'Contact: ' + orderData.shippingAddress.phone + '\n';
  msg += '\n';
  msg += 'Order confirmed! You will receive tracking updates shortly.\n';
  msg += 'Thank you for shopping with us!';
  
  return msg;
};

// Send address confirmation WhatsApp
export const sendAddressConfirmation = async (phoneNumber, address, countryCode) => {
  const message = formatAddressForWhatsApp(address, countryCode);
  return sendWhatsAppNotification(phoneNumber, message);
};

// Send order confirmation WhatsApp
export const sendOrderConfirmation = async (phoneNumber, orderData) => {
  const message = formatOrderForWhatsApp(orderData);
  return sendWhatsAppNotification(phoneNumber, message);
};
