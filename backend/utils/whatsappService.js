import twilio from 'twilio';

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendOrderConfirmationWhatsApp = async (phoneNumber, orderData) => {
  const { orderNumber, totalAmount } = orderData;

  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneNumber}`,
      body: `🎉 Order Confirmed!\n\nOrder #: ${orderNumber}\nTotal: $${totalAmount}\n\nThank you for shopping with Trending Sneakers!\n\nWe'll keep you updated on your order status.`,
    });
    console.log(`WhatsApp confirmation sent to ${phoneNumber}`);
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return false;
  }
};

export const sendOrderStatusUpdateWhatsApp = async (phoneNumber, orderNumber, status, trackingNumber) => {
  const statusMessages = {
    confirmed: '✅ Your order has been confirmed!',
    shipped: '📦 Your order has been shipped!',
    delivered: '🎁 Your order has been delivered!',
    cancelled: '❌ Your order has been cancelled.',
  };

  let message = `${statusMessages[status]}\n\nOrder #: ${orderNumber}`;
  if (trackingNumber) {
    message += `\nTracking #: ${trackingNumber}`;
  }

  try {
    await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phoneNumber}`,
      body: message,
    });
    return true;
  } catch (error) {
    console.error('Error sending WhatsApp update:', error);
    return false;
  }
};
