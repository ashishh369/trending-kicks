import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCreditCard, FaPaypal, FaTruck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getCountryCodeFromCurrency, formatPhoneNumber, validatePhoneNumber, currencyToCountry } from '../utils/countryCodeMapping';
import { convertPrice } from '../utils/currencyRates';
import { validatePostalCode, getPostalCodeExample, getStatesForCountry, currencyToPostalCountry, getStatesByCountryName } from '../utils/postalCodeValidation';
import { sendAddressConfirmation, sendOrderConfirmation } from '../utils/whatsappService';
import './CheckoutForm.css';

const CheckoutForm = ({ cart, onClose, onSuccess, currentCurrency = 'USD', currencyRates = { USD: 1 } }) => {
  const [step, setStep] = useState(1);
  const [countryCode, setCountryCode] = useState(getCountryCodeFromCurrency(currentCurrency).code);
  const [billingAddress, setBillingAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [shippingAddress, setShippingAddress] = useState({ ...billingAddress });
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    // Update country code when currency changes
    const newCountryCode = getCountryCodeFromCurrency(currentCurrency).code;
    setCountryCode(newCountryCode);
  }, [currentCurrency]);

  const subtotalUSD = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxUSD = subtotalUSD * 0.1;
  const shippingUSD = subtotalUSD > 100 ? 0 : 10;
  const totalUSD = subtotalUSD + taxUSD + shippingUSD;

  // Convert to selected currency
  const subtotal = convertPrice(subtotalUSD, 'USD', currentCurrency, currencyRates);
  const tax = convertPrice(taxUSD, 'USD', currentCurrency, currencyRates);
  const shipping = convertPrice(shippingUSD, 'USD', currentCurrency, currencyRates);
  const total = convertPrice(totalUSD, 'USD', currentCurrency, currencyRates);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingAddress(prev => ({ ...prev, [name]: value }));
    if (sameAsShipping) {
      setShippingAddress(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    if (name === 'expiryDate') {
      formattedValue = value.replace(/(\d{2})(\d{2})/, '$1/$2');
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateBillingAddress = () => {
    const { firstName, lastName, email, phone, street, city, state, zipCode, country } = billingAddress;
    if (!firstName || !lastName || !email || !phone || !street || !city || !state || !zipCode || !country) {
      toast.error('All billing address fields are required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email');
      return false;
    }
    if (!validatePhoneNumber(phone, countryCode)) {
      toast.error(`Please enter a valid phone number for country code ${countryCode}`);
      return false;
    }
    // Postal code validation removed
    return true;
  };

  const validateShippingAddress = () => {
    const { firstName, lastName, street, city, state, zipCode, country } = shippingAddress;
    if (!firstName || !lastName || !street || !city || !state || !zipCode || !country) {
      toast.error('All shipping address fields are required');
      return false;
    }
    // Postal code validation removed
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
      const { cardNumber, expiryDate, cvv } = cardDetails;
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error('All card details are required');
        return false;
      }
      const cardNum = cardNumber.replace(/\s/g, '');
      if (cardNum.length !== 16) {
        toast.error('Card number must be 16 digits');
        return false;
      }
      if (cvv.length !== 3) {
        toast.error('CVV must be 3 digits');
        return false;
      }
    }
    if (paymentMethod === 'cod') {
      // COD just needs address verification (already handled in step 1)
      return true;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateBillingAddress()) return;
    if (!validateShippingAddress()) return;
    if (!validatePayment()) return;

    try {
      // Format phone with country code
      const formattedPhone = formatPhoneNumber(shippingAddress.phone, countryCode);
      
      // Create order object
      const orderData = {
        billingAddress,
        shippingAddress: {
          ...shippingAddress,
          phone: formattedPhone,
        },
        paymentMethod,
        countryCode,
        items: cart,
        total,
        date: new Date().toISOString(),
        tracking: `TK${Date.now()}`,
        currency: currentCurrency,
        currencyRates: currencyRates,
      };
      
      // Send WhatsApp notification with address
      try {
        await sendAddressConfirmation(formattedPhone, orderData.shippingAddress, countryCode);
        toast.info('📱 Address confirmation sent to WhatsApp');
      } catch (whatsappError) {
        console.log('WhatsApp address notification skipped:', whatsappError);
      }

      // Simulate payment processing
      setTimeout(() => {
        // Send full order details to WhatsApp after order confirmation

        try {
          // Send to user
          sendOrderConfirmation(formattedPhone, orderData).catch(err => 
            console.log('Order details WhatsApp notification skipped:', err)
          );
          // Send to admin
          sendOrderConfirmation('917018822131', orderData).catch(err =>
            console.log('Admin WhatsApp notification skipped:', err)
          );
        } catch (err) {
          console.log('Order details WhatsApp notification error:', err);
        }

        toast.success('Order placed successfully! Check your email and WhatsApp for confirmation.');
        onSuccess(orderData);
      }, 1500);
    } catch (error) {
      toast.error('Error processing order. Please try again.');
    }
  };

  return (
    <motion.div
      className="checkout-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="checkout-container"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="checkout-header">
          <button className="close-btn" onClick={onClose}>
            <FaArrowLeft />
          </button>
          <h2>Checkout</h2>
          <div className="step-indicator">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span>1</span>
              <p>Address</p>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span>2</span>
              <p>Payment</p>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span>3</span>
              <p>Review</p>
            </div>
          </div>
        </div>

        <div className="checkout-content">
          {/* Step 1: Address */}
          {step === 1 && (
            <motion.div
              className="checkout-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3>Billing Address</h3>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={billingAddress.firstName}
                  onChange={handleBillingChange}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={billingAddress.lastName}
                  onChange={handleBillingChange}
                  className="form-input"
                />
              </div>
              <div className="form-grid">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={billingAddress.email}
                  onChange={handleBillingChange}
                  className="form-input"
                />
                <div className="country-code-input">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="form-input country-code-select"
                    title="Select country code"
                  >
                    <option value="+1">🇺🇸 +1 (US/CA)</option>
                    <option value="+39">🇪🇺 +39 (EU)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+81">🇯🇵 +81 (JP)</option>
                    <option value="+61">🇦🇺 +61 (AU)</option>
                    <option value="+86">🇨🇳 +86 (CN)</option>
                    <option value="+91">🇮🇳 +91 (IN)</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    value={billingAddress.phone}
                    onChange={handleBillingChange}
                    className="form-input"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Street Address"
                name="street"
                value={billingAddress.street}
                onChange={handleBillingChange}
                className="form-input full-width"
              />
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={billingAddress.city}
                  onChange={handleBillingChange}
                  className="form-input"
                />
                <select
                  name="state"
                  value={billingAddress.state}
                  onChange={handleBillingChange}
                  className="form-input"
                  title="Select state or province"
                >
                  <option value="">Select State/Province</option>
                  {getStatesByCountryName(billingAddress.country || getCountryCodeFromCurrency(currentCurrency).name).map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder={`ZIP Code (e.g., ${getPostalCodeExample(currentCurrency)})`}
                  name="zipCode"
                  value={billingAddress.zipCode}
                  onChange={handleBillingChange}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={billingAddress.country}
                  onChange={handleBillingChange}
                  className="form-input"
                />
              </div>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={() => {
                    setSameAsShipping(!sameAsShipping);
                    if (!sameAsShipping) {
                      setShippingAddress({ ...billingAddress });
                    }
                  }}
                />
                Shipping address same as billing
              </label>

              {!sameAsShipping && (
                <>
                  <h3>Shipping Address</h3>
                  <div className="form-grid">
                    <input
                      type="text"
                      placeholder="First Name"
                      name="firstName"
                      value={shippingAddress.firstName}
                      onChange={handleShippingChange}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      name="lastName"
                      value={shippingAddress.lastName}
                      onChange={handleShippingChange}
                      className="form-input"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleShippingChange}
                    className="form-input full-width"
                  />
                  <div className="form-grid">
                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleShippingChange}
                      className="form-input"
                    />
                    <select
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleShippingChange}
                      className="form-input"
                      title="Select state or province"
                    >
                      <option value="">Select State/Province</option>
                      {getStatesByCountryName(shippingAddress.country || getCountryCodeFromCurrency(currentCurrency).name).map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-grid">
                    <input
                      type="text"
                      placeholder={`ZIP Code (e.g., ${getPostalCodeExample(currentCurrency)})`}
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleShippingChange}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleShippingChange}
                      className="form-input"
                    />
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div
              className="checkout-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3>Select Payment Method</h3>
              <div className="payment-methods">
                <div
                  className={`payment-option ${paymentMethod === 'credit_card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('credit_card')}
                >
                  <FaCreditCard />
                  <span>Credit Card</span>
                </div>
                <div
                  className={`payment-option ${paymentMethod === 'debit_card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('debit_card')}
                >
                  <FaCreditCard />
                  <span>Debit Card</span>
                </div>
                <div
                  className={`payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <FaPaypal />
                  <span>PayPal</span>
                </div>
                <div
                  className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <FaTruck />
                  <span>Cash on Delivery</span>
                </div>
              </div>

              {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                <>
                  <h4>Card Details</h4>
                  <input
                    type="text"
                    placeholder="Card Number (16 digits)"
                    name="cardNumber"
                    maxLength="19"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    className="form-input full-width"
                  />
                  <div className="form-grid">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      name="expiryDate"
                      maxLength="5"
                      value={cardDetails.expiryDate}
                      onChange={handleCardChange}
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="CVV (3 digits)"
                      name="cvv"
                      maxLength="3"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      className="form-input"
                    />
                  </div>
                </>
              )}

              {paymentMethod === 'cod' && (
                <div className="cod-info">
                  <div className="cod-notice">
                    <FaTruck style={{ marginRight: '10px', fontSize: '20px' }} />
                    <div>
                      <h4>Cash on Delivery</h4>
                      <p>You will pay the amount ₹{total.toFixed(2)} to the delivery agent when your order arrives. Make sure to verify the order details before payment.</p>
                    </div>
                  </div>
                  <div className="cod-address">
                    <h4>Delivery Address Confirmation</h4>
                    <div className="address-summary">
                      <p><strong>{shippingAddress.firstName} {shippingAddress.lastName}</strong></p>
                      <p>{shippingAddress.street}</p>
                      <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                      <p>{shippingAddress.country}</p>
                      <p>Phone: {shippingAddress.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="paypal-info">
                  <p>Click "Complete Purchase" to proceed with PayPal checkout</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              className="checkout-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <h3>Order Review</h3>
              <div className="review-items">
                {cart.map(item => (
                  <div key={item.id} className="review-item">
                    <img src={item.img} alt={item.name} />
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">
                      {currentCurrency === 'INR'
                        ? `₹${convertPrice(item.price * item.quantity, 'USD', 'INR', currencyRates).toFixed(0)}`
                        : currentCurrency === 'USD'
                        ? `$${(item.price * item.quantity).toFixed(2)}`
                        : `${currentCurrency} ${convertPrice(item.price * item.quantity, 'USD', currentCurrency, currencyRates).toFixed(2)}`
                      }
                    </p>
                  </div>
                ))}
              </div>

              <div className="summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>
                    {currentCurrency === 'INR'
                      ? `₹${subtotal.toFixed(0)}`
                      : currentCurrency === 'USD'
                      ? `$${subtotal.toFixed(2)}`
                      : `${currentCurrency} ${subtotal.toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>
                    {currentCurrency === 'INR'
                      ? `₹${tax.toFixed(0)}`
                      : currentCurrency === 'USD'
                      ? `$${tax.toFixed(2)}`
                      : `${currentCurrency} ${tax.toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>
                    {currentCurrency === 'INR'
                      ? `₹${shipping.toFixed(0)}`
                      : currentCurrency === 'USD'
                      ? `$${shipping.toFixed(2)}`
                      : `${currentCurrency} ${shipping.toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>
                    {currentCurrency === 'INR'
                      ? `₹${total.toFixed(0)}`
                      : currentCurrency === 'USD'
                      ? `$${total.toFixed(2)}`
                      : `${currentCurrency} ${total.toFixed(2)}`
                    }
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="checkout-footer">
          <button
            className="btn-secondary"
            onClick={() => {
              if (step === 1) {
                onClose();
              } else {
                setStep(step - 1);
              }
            }}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          {step < 3 ? (
            <button
              className="btn-primary"
              onClick={() => {
                if (step === 1 && !validateBillingAddress()) return;
                if (step === 1 && !sameAsShipping && !validateShippingAddress()) return;
                if (step === 2 && !validatePayment()) return;
                setStep(step + 1);
              }}
            >
              Continue
            </button>
          ) : (
            <button className="btn-primary btn-success" onClick={handleSubmit}>
              Complete Purchase
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CheckoutForm;
