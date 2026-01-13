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
  return `
📦 *Delivery Address Confirmed*

👤 *Name:* ${address.firstName} ${address.lastName}
📱 *Phone:* ${countryCode} ${address.phone}
📧 *Email:* ${address.email}

🏠 *Address:*
${address.street}
${address.city}, ${address.state} ${address.zipCode}
${address.country}

✓ Your order will be delivered to this address.
`.trim();
};

// Format order summary for WhatsApp
export const formatOrderForWhatsApp = (orderData) => {
  const items = orderData.items.map(item => 
    `• ${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');
  
  const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 0 : 10;
  
  return `
🛍️ *ORDER CONFIRMATION*

*Order ID:* ${orderData.tracking}
*Date:* ${new Date(orderData.date).toLocaleDateString()}

📦 *Items:*
${items}

💰 *Order Total:*
  Subtotal: $${subtotal.toFixed(2)}
  Tax (10%): $${tax.toFixed(2)}
  Shipping: $${shipping.toFixed(2)}
  ─────────────────
  *TOTAL: $${orderData.total.toFixed(2)}*

💳 *Payment:* ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : orderData.paymentMethod}

📍 *Delivery Address:*
${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}
${orderData.shippingAddress.street}
${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zipCode}
${orderData.shippingAddress.country}

📞 *Contact:* ${orderData.shippingAddress.phone}

✅ Order confirmed! You will receive tracking updates shortly.
🎉 Thank you for shopping with us!
`.trim();
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
