import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaShare, FaHeart } from 'react-icons/fa';

const DetailModal = ({ show, onClose, product }) => {
  const [isFavorited, setIsFavorited] = React.useState(false);

  if (!show || !product) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: { scale: 0.8, opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <AnimatePresence>
      {show && product && (
        <motion.div
          className="modal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="modal-content detail-modal"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.span
              className="close"
              onClick={onClose}
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.span>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Product Image */}
              <motion.div variants={imageVariants}>
                <motion.img
                  src={product.img}
                  alt={product.name}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    cursor: 'pointer',
                  }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    background: 'rgba(0, 212, 255, 0.08)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                  }}
                >
                  🎨 Premium Quality • Authentic • Fast Shipping
                </motion.div>
              </motion.div>

              {/* Product Info */}
              <motion.div variants={infoVariants}>
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}
                >
                  {product.name}
                </motion.h3>

                <motion.div
                  className="rating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.2 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaStar
                        color={i < Math.floor(product.rating) ? '#ffc107' : '#e4e5e9'}
                        size={20}
                      />
                    </motion.span>
                  ))}
                  <span style={{ marginLeft: '0.8rem', fontSize: '1rem' }}>
                    {product.rating} / 5.0
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#ff6b6b',
                    marginBottom: '1.5rem',
                  }}
                >
                  ${product.price}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  style={{
                    padding: '1rem',
                    background: 'rgba(0, 212, 255, 0.08)',
                    borderRadius: '10px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <p style={{ marginBottom: '0.5rem', fontWeight: 600 }}>Reviews:</p>
                  {product.reviews && product.reviews.length > 0 ? (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {product.reviews.map((review, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          style={{
                            padding: '0.4rem 0',
                            fontSize: '0.95rem',
                            color: 'rgba(45, 55, 72, 0.7)',
                          }}
                        >
                          ✓ {review}
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reviews yet. Be the first to review!</p>
                  )}
                </motion.div>

                {/* 3D Model Viewer - Coming Soon */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 123, 255, 0.1) 100%)',
                    borderRadius: '10px',
                    height: '250px',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed rgba(0, 212, 255, 0.3)',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ fontSize: '3rem' }}>🎮</div>
                  <p style={{ textAlign: 'center', margin: 0, opacity: 0.7 }}>
                    Interactive 3D Model Viewer Coming Soon!<br />
                    <span style={{ fontSize: '0.85rem' }}>Rotate • Zoom • Inspect</span>
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1.5rem',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                    }}
                  >
                    Add to Cart
                  </motion.button>

                  <motion.button
                    onClick={() => setIsFavorited(!isFavorited)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      backgroundColor: isFavorited ? '#ff6b6b' : 'rgba(0, 212, 255, 0.15)',
                      color: isFavorited ? '#fff' : '#007bff',
                    }}
                    style={{
                      padding: '1rem 1.5rem',
                      border: '2px solid #007bff',
                      borderRadius: '50px',
                    }}
                  >
                    <FaHeart style={{ marginRight: '0.5rem' }} />
                    {isFavorited ? 'Liked' : 'Like'}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1rem 1.5rem',
                      background: 'rgba(0, 212, 255, 0.15)',
                      border: '2px solid #00d4ff',
                      borderRadius: '50px',
                    }}
                  >
                    <FaShare />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;