import express from 'express';
import { body, validationResult } from 'express-validator';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { sendOrderConfirmationEmail, sendOrderStatusUpdateEmail } from '../utils/emailService.js';
import { sendOrderConfirmationWhatsApp, sendOrderStatusUpdateWhatsApp } from '../utils/whatsappService.js';

const router = express.Router();

// Create order
router.post('/create', [
  body('items').isArray().notEmpty().withMessage('Items are required'),
  body('billingAddress').notEmpty().withMessage('Billing address is required'),
  body('shippingAddress').notEmpty().withMessage('Shipping address is required'),
  body('paymentMethod').isIn(['credit_card', 'debit_card', 'paypal', 'stripe']).withMessage('Invalid payment method'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, items, billingAddress, shippingAddress, paymentMethod, notes } = req.body;

    let subtotal = 0;
    items.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    const tax = subtotal * 0.1; // 10% tax
    const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
    const totalAmount = subtotal + tax + shippingCost;

    const order = new Order({
      user: userId,
      items,
      billingAddress,
      shippingAddress,
      paymentMethod,
      subtotal,
      tax,
      shippingCost,
      totalAmount,
      notes,
    });

    await order.save();

    // Send email notification
    const user = await User.findById(userId);
    if (user && user.email) {
      await sendOrderConfirmationEmail({
        email: user.email,
        orderNumber: order.orderNumber,
        totalAmount,
        items,
        billingAddress,
      });
      order.notificationsSent.email = true;
    }

    // Send WhatsApp notification
    if (billingAddress.phone) {
      await sendOrderConfirmationWhatsApp(billingAddress.phone, {
        orderNumber: order.orderNumber,
        totalAmount,
      });
      order.notificationsSent.whatsapp = true;
    }

    await order.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
