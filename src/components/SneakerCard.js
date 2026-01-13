import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPlus, FaEye } from 'react-icons/fa';
import { convertPrice } from '../utils/currencyRates';

const SneakerCard = ({ sneaker, onAddToCart, onViewDetails, currentCurrency = 'USD', currencyRates = { USD: 1 } }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(sneaker);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  // AI-like smart tags based on rating and price
  const getSmartTags = () => {
    const tags = [];
    if (sneaker.rating >= 4.8) tags.push('⭐ Premium');
    if (sneaker.price < 150) tags.push('💰 Value');
    if (sneaker.popularity >= '95%') tags.push('🚀 Trending');
    return tags;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const hoverVariants = {
    hover: {
      y: -12,
      boxShadow: '0 25px 50px rgba(0, 212, 255, 0.3)',
    },
  };

  return (
    <motion.div
      className="sneaker-card"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="card-image-wrapper"
        whileHover={{ scale: 1.08 }}
        onClick={() => onViewDetails(sneaker)}
        style={{ cursor: 'pointer' }}
      >
        <motion.img
          src={sneaker.img}
          alt={sneaker.name}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="popularity-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          🔥 {sneaker.popularity}
        </motion.div>
        
        {/* Smart Tags */}
        <motion.div className="smart-tags">
          {getSmartTags().map((tag, idx) => (
            <motion.span
              key={idx}
              className="smart-tag"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.h3
          whileHover={{ color: '#007bff' }}
          transition={{ duration: 0.2 }}
        >
          {sneaker.name}
        </motion.h3>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.3, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaStar
                color={i < Math.floor(sneaker.rating) ? '#ffc107' : '#e4e5e9'}
                size={18}
              />
            </motion.div>
          ))}
          <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>
            ({sneaker.rating})
          </span>
        </div>

        <motion.p
          className="price"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          {(() => {
            const convertedPrice = convertPrice(sneaker.price, 'USD', currentCurrency, currencyRates);
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
            const symbol = currencySymbols[currentCurrency] || currentCurrency;
            const decimals = currentCurrency === 'INR' ? 0 : 2;
            return `${symbol}${convertedPrice.toFixed(decimals)}`;
          })()}
        </motion.p>

        <div className="button-group">
          <motion.button
            className="btn-add-cart"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isAdded ? { backgroundColor: '#28a745' } : {}}
          >
            <FaPlus style={{ marginRight: '0.5rem' }} />
            {isAdded ? 'Added! ✓' : 'Add to Cart'}
          </motion.button>

          <motion.button
            className="btn-view-details"
            onClick={() => onViewDetails(sneaker)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEye style={{ marginRight: '0.5rem' }} />
            View Details
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SneakerCard;