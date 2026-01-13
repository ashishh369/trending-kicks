import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import CheckoutForm from './CheckoutForm';
import { toast } from 'react-toastify';

const CartModal = ({ show, onClose, cart, updateQuantity, currentCurrency = 'USD' }) => {
  const [showCheckout, setShowCheckout] = useState(false);

  if (!show) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: { y: 50, opacity: 0, transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="modal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
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

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaShoppingBag /> Your Cart ({itemCount} items)
              </h2>
            </motion.div>

            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  textAlign: 'center',
                  padding: '3rem 0',
                  color: 'rgba(45, 55, 72, 0.6)',
                }}
              >
                <FaShoppingBag size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p style={{ fontSize: '1.1rem' }}>Your cart is empty</p>
                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  Start shopping to add items!
                </p>
              </motion.div>
            ) : (
              <motion.div>
                <motion.div
                  className="cart-items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <AnimatePresence>
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="cart-item"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="item-info">
                          <h4>{item.name}</h4>
                          <p className="item-price">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="quantity-controls">
                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            className="qty-btn"
                          >
                            <FaMinus size={12} />
                          </motion.button>

                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.3 }}
                            animate={{ scale: 1 }}
                            className="qty-display"
                          >
                            {item.quantity}
                          </motion.span>

                          <motion.button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            className="qty-btn"
                          >
                            <FaPlus size={12} />
                          </motion.button>
                        </div>

                        <p className="subtotal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <motion.button
                          onClick={() => updateQuantity(item.id, 0)}
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                          className="delete-btn"
                          title="Remove item"
                        >
                          <FaTrash />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  className="payment-methods"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3>Order Summary</h3>
                </motion.div>

                <motion.div
                  className="cart-summary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <div className="summary-row total-row">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </motion.div>

                <motion.button
                  onClick={() => setShowCheckout(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="checkout-btn"
                  style={{
                    width: '100%',
                    marginTop: '1.5rem',
                  }}
                >
                  Checkout - ${total.toFixed(2)}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
      {showCheckout && (
        <CheckoutForm 
          cart={cart} 
          onClose={() => setShowCheckout(false)} 
          onSuccess={(orderData) => {
            // Save order to localStorage
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            const newOrder = {
              id: orders.length + 1,
              date: new Date().toISOString(),
              items: orderData.items,
              total: orderData.total,
              status: 'pending',
              tracking: `TK${Date.now()}`,
              ...orderData,
            };
            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // Clear cart
            setShowCheckout(false);
            onClose();
            toast.success('Order created successfully!');
          }}
          currentCurrency={currentCurrency}
        />
      )}
    </AnimatePresence>
  );
};

export default CartModal;