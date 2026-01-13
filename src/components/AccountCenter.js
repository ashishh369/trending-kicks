import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaHeart, FaShoppingBag, FaSignOutAlt, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import './AccountCenter.css';

const AccountCenter = ({ isOpen, onClose, user, orders }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [addresses, setAddresses] = useState(user?.addresses || []);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isDefault: false,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaEdit },
    { id: 'orders', label: 'Orders', icon: FaShoppingBag },
    { id: 'addresses', label: 'Addresses', icon: FaMapMarkerAlt },
    { id: 'wishlist', label: 'Wishlist', icon: FaHeart },
  ];

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city) {
      alert('Please fill all fields');
      return;
    }
    if (editingId) {
      setAddresses(addresses.map(addr => addr.id === editingId ? { ...newAddress, id: editingId } : addr));
      setEditingId(null);
    } else {
      setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    }
    setNewAddress({ street: '', city: '', state: '', zipCode: '', country: '', isDefault: false });
    setShowAddForm(false);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <motion.div
      className={`account-center-overlay ${isOpen ? 'active' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="account-center-container"
        initial={{ x: 400 }}
        animate={{ x: isOpen ? 0 : 400 }}
        transition={{ duration: 0.3 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="account-header">
          <div className="user-info">
            <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
            <div>
              <h2>{user?.name || 'Guest User'}</h2>
              <p>{user?.email}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><FaTimes /></button>
        </div>

        {/* Tabs */}
        <div className="account-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="account-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              className="tab-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="profile-section">
                <h3>Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Full Name</label>
                    <p>{user?.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{user?.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <p>{user?.phone || 'Not provided'}</p>
                  </div>
                  <div className="info-item">
                    <label>Member Since</label>
                    <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
                <button className="edit-profile-btn">Edit Profile</button>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <motion.div
              className="tab-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Recent Orders</h3>
              {orders && orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order, idx) => (
                    <motion.div
                      key={idx}
                      className="order-item"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="order-header">
                        <div>
                          <h4>Order #{order.orderNumber}</h4>
                          <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className={`order-status ${order.orderStatus}`}>
                          {order.orderStatus.toUpperCase()}
                        </div>
                      </div>
                      <div className="order-items">
                        {order.items.map((item, i) => (
                          <span key={i} className="item-tag">{item.name} x{item.quantity}</span>
                        ))}
                      </div>
                      <div className="order-footer">
                        <span className="order-total">${order.totalAmount.toFixed(2)}</span>
                        {order.trackingNumber && (
                          <span className="tracking">Track: {order.trackingNumber}</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaShoppingBag />
                  <p>No orders yet</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <motion.div
              className="tab-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="addresses-header">
                <h3>Saved Addresses</h3>
                <button
                  className="add-address-btn"
                  onClick={() => {
                    setShowAddForm(!showAddForm);
                    setEditingId(null);
                    setNewAddress({ street: '', city: '', state: '', zipCode: '', country: '', isDefault: false });
                  }}
                >
                  <FaPlus /> Add Address
                </button>
              </div>

              {showAddForm && (
                <motion.div
                  className="address-form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="form-grid">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    />
                  </div>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newAddress.isDefault}
                      onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                    />
                    Set as default address
                  </label>
                  <div className="form-actions">
                    <button className="btn-primary" onClick={handleAddAddress}>
                      {editingId ? 'Update' : 'Add'} Address
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingId(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="addresses-list">
                {addresses.length > 0 ? (
                  addresses.map((addr) => (
                    <motion.div
                      key={addr.id}
                      className={`address-card ${addr.isDefault ? 'default' : ''}`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {addr.isDefault && <span className="default-badge">Default</span>}
                      <p><strong>{addr.street}</strong></p>
                      <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                      <p>{addr.country}</p>
                      <div className="address-actions">
                        <button
                          className="btn-icon edit"
                          onClick={() => {
                            setNewAddress(addr);
                            setEditingId(addr.id);
                            setShowAddForm(true);
                          }}
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          className="btn-icon delete"
                          onClick={() => handleDeleteAddress(addr.id)}
                        >
                          <FaTimes /> Delete
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="empty-state">
                    <FaMapMarkerAlt />
                    <p>No saved addresses</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <motion.div
              className="tab-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Wishlist</h3>
              <div className="empty-state">
                <FaHeart />
                <p>Your wishlist is empty</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="account-footer">
          <button className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountCenter;
