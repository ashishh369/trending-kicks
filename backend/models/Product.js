import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['running', 'basketball', 'casual', 'sportswear'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  images: [String], // Multiple images for product gallery
  sizes: [String], // e.g., ['6', '7', '8', '9', '10', '11', '12', '13']
  colors: [String], // e.g., ['Black', 'White', 'Red']
  stock: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      user: mongoose.Schema.Types.ObjectId,
      comment: String,
      rating: Number,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  popularity: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);
