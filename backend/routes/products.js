import express from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products with filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, page = 1, limit = 12 } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ];
    }

    let sortQuery = {};
    if (sort) {
      if (sort === 'price_asc') sortQuery = { price: 1 };
      if (sort === 'price_desc') sortQuery = { price: -1 };
      if (sort === 'newest') sortQuery = { createdAt: -1 };
      if (sort === 'rating') sortQuery = { rating: -1 };
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort(sortQuery)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.json({
      products,
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

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get featured products
router.get('/featured/all', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
