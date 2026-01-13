import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMoon, FaSun, FaMicrophone, FaShoppingCart, FaMapMarkerAlt, FaUser, FaCog } from 'react-icons/fa';

const Header = ({ cartCount, onCartClick, darkMode, toggleDarkMode, searchTerm, setSearchTerm, onAccountClick, currentCurrency = 'USD', onAdminClick }) => {
  const [isListening, setIsListening] = useState(false);
  const [userLocation, setUserLocation] = useState('');
  const [showLocationMenu, setShowLocationMenu] = useState(false);

  useEffect(() => {
    // Auto-detect user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocoding would be ideal but using coordinates for now
          setUserLocation(`📍 ${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        },
        (error) => {
          // Silently fail and allow manual entry
          console.log('Location access denied or unavailable');
        }
      );
    }
  }, []);

  const startVoiceSearch = () => {
    if (!searchTerm.trim()) {
      // Only start voice search if input is empty
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        setSearchTerm(event.results[0][0].transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.start();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <nav>
        <motion.h1
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.location.href = '/';
          }}
          title="Go to Home"
        >
          🔥 Trending Kicks
        </motion.h1>

        <motion.div
          className="search-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.input
            type="text"
            placeholder={searchTerm ? 'Search sneakers...' : 'Click mic or type...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.button
            className={`voice-btn ${isListening ? 'listening' : ''}`}
            onClick={startVoiceSearch}
            disabled={searchTerm.trim() !== ''}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={searchTerm.trim() ? 'Clear search to use voice' : 'Voice Search'}
          >
            <FaMicrophone /> {isListening ? 'Listening...' : ''}
          </motion.button>
        </motion.div>

        <motion.div className="location-selector" variants={containerVariants} initial="hidden" animate="visible">
          <motion.button
            className="location-btn"
            onClick={() => setShowLocationMenu(!showLocationMenu)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaMapMarkerAlt /> {userLocation || 'Set Location'}
          </motion.button>
          {showLocationMenu && (
            <motion.div 
              className="location-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <input type="text" placeholder="Enter city or ZIP code" />
              <button>Use Manual Location</button>
              <small>Auto-detect: {userLocation || 'Detecting...'}</small>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="header-actions"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            className="theme-btn"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1, rotate: 20 }}
            whileTap={{ scale: 0.95 }}
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </motion.button>

          <motion.button
            className="account-btn"
            onClick={onAccountClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="My Account"
          >
            <FaUser />
            Account
          </motion.button>

          <motion.button
            className="admin-btn"
            onClick={onAdminClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Admin Panel - Manage Products"
          >
            <FaCog />
            Admin
          </motion.button>

          <motion.button
            id="cart-btn"
            onClick={onCartClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="cart-button"
          >
            <FaShoppingCart />
            <span className="cart-badge">{cartCount}</span>
            Cart
          </motion.button>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;