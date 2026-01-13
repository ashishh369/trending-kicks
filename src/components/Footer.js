import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.3,
      rotate: 15,
      transition: { type: 'spring', stiffness: 400 },
    },
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="footer-content">
        {/* Brand Section */}
        <motion.div className="footer-section" variants={itemVariants}>
          <h3>🔥 Trending Kicks</h3>
          <p>Your ultimate destination for the hottest sneakers and latest trends.</p>
          <div className="social-links">
            {[
              { Icon: FaFacebook, color: '#1877F2' },
              { Icon: FaTwitter, color: '#1DA1F2' },
              { Icon: FaInstagram, color: '#E4405F' },
              { Icon: FaLinkedin, color: '#0A66C2' },
            ].map((item, idx) => (
              <motion.a
                key={idx}
                href="#"
                onClick={(e) => e.preventDefault()}
                variants={iconVariants}
                whileHover="hover"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  marginRight: '0.8rem',
                  transition: 'all 0.3s ease',
                }}
              >
                <item.Icon size={18} />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div className="footer-section" variants={itemVariants}>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['Home', 'Shop', 'About Us', 'Contact'].map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Support */}
        <motion.div className="footer-section" variants={itemVariants}>
          <h4>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['Track Order', 'Returns', 'Shipping Info', 'FAQs'].map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {link}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div className="footer-section" variants={itemVariants}>
          <h4>Newsletter</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Subscribe for exclusive deals and new releases
          </p>
          <motion.div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Your email"
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '5px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
              }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '0.6rem 1.2rem',
                background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Subscribe
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div
        className="footer-bottom"
        variants={itemVariants}
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          marginTop: '2rem',
          textAlign: 'center',
        }}
      >
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          © 2024 Trending Kicks. Made with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          >
            <FaHeart color="#ff6b6b" size={16} />
          </motion.span>
          All rights reserved.
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;