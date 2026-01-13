import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';
import './CurrencySelector.css';

const CurrencySelector = ({ onSelectCurrency, isFirstVisit }) => {
  const [showSelector, setShowSelector] = useState(isFirstVisit);
  const [selectedCurrency, setSelectedCurrency] = useState(localStorage.getItem('currency') || 'USD');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  ];

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency.code);
    localStorage.setItem('currency', currency.code);
    onSelectCurrency(currency);
    setShowSelector(false);
  };

  return (
    <>
      {showSelector && (
        <motion.div
          className="currency-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowSelector(false)}
        >
          <motion.div
            className="currency-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="currency-header">
              <FaGlobe className="globe-icon" />
              <h2>Select Your Currency</h2>
              <p>Choose your preferred currency for prices</p>
            </div>

            <div className="currency-grid">
              {currencies.map((currency) => (
                <motion.button
                  key={currency.code}
                  className={`currency-option ${selectedCurrency === currency.code ? 'selected' : ''}`}
                  onClick={() => handleSelectCurrency(currency)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="currency-flag">{currency.flag}</span>
                  <span className="currency-code">{currency.code}</span>
                  <span className="currency-name">{currency.name}</span>
                  <span className="currency-symbol">{currency.symbol}</span>
                </motion.button>
              ))}
            </div>

            <button
              className="currency-confirm"
              onClick={() => setShowSelector(false)}
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}

      <motion.button
        className="currency-toggle"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSelector(true)}
        title="Change Currency"
      >
        <FaGlobe />
        <span>{selectedCurrency}</span>
      </motion.button>
    </>
  );
};

export default CurrencySelector;
