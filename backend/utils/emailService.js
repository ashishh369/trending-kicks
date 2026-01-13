import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOrderConfirmationEmail = async (orderData) => {
  const { email, orderNumber, totalAmount, items, billingAddress } = orderData;

  const itemsHTML = items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}x</td>
      <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${item.price}</td>
    </tr>
  `
    )
    .join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      
      <h3>Order Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 10px; text-align: left;">Product</th>
            <th style="padding: 10px; text-align: left;">Qty</th>
            <th style="padding: 10px; text-align: left;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
      
      <h3 style="margin-top: 20px;">Total: $${totalAmount}</h3>
      
      <h3>Shipping Address:</h3>
      <p>
        ${billingAddress.firstName} ${billingAddress.lastName}<br>
        ${billingAddress.street}<br>
        ${billingAddress.city}, ${billingAddress.state} ${billingAddress.zipCode}<br>
        ${billingAddress.country}<br>
        ${billingAddress.phone}
      </p>
      
      <p style="margin-top: 30px; color: #666;">We'll send you another email when your order ships!</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: htmlContent,
    });
    console.log(`Order confirmation email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendOrderStatusUpdateEmail = async (email, orderNumber, status) => {
  const statusMessages = {
    confirmed: 'Your order has been confirmed!',
    shipped: 'Your order has been shipped!',
    delivered: 'Your order has been delivered!',
    cancelled: 'Your order has been cancelled.',
  };

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Order Update</h2>
      <p>${statusMessages[status]}</p>
      <p><strong>Order Number:</strong> ${orderNumber}</p>
      <p style="margin-top: 30px; color: #666;">Thank you for your business!</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Order Status Update - ${orderNumber}`,
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error('Error sending status email:', error);
    return false;
  }
};
