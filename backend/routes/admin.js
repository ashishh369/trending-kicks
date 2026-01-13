import express from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { sendOrderStatusUpdateEmail } from '../utils/emailService.js';
import { sendOrderStatusUpdateWhatsApp } from '../utils/whatsappService.js';

const router = express.Router();

// Middleware to check if admin
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.headers.userid);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized - Admin access required' });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Add product
router.post('/products/add', adminMiddleware, [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').notEmpty().withMessage('Category is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const product = new Product(req.body);
    await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
router.put('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product
router.delete('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders
router.get('/orders/all', adminMiddleware, async (req, res) => {
  try {
    const { status, paymentStatus, page = 1, limit = 10 } = req.query;
    let query = {};

    if (status) query.orderStatus = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const skip = (page - 1) * limit;
    const orders = await Order.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status
router.put('/orders/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { orderStatus, trackingNumber } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, trackingNumber },
      { new: true }
    ).populate('user');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send notifications
    if (order.user.email) {
      await sendOrderStatusUpdateEmail(order.user.email, order.orderNumber, orderStatus);
    }

    if (order.billingAddress.phone) {
      await sendOrderStatusUpdateWhatsApp(
        order.billingAddress.phone,
        order.orderNumber,
        orderStatus,
        trackingNumber
      );
    }

    res.json({
      message: 'Order status updated successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get dashboard statistics
router.get('/dashboard/stats', adminMiddleware, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProducts = await Product.countDocuments();
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalUsers,
      totalProducts,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
