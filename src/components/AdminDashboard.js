import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaShoppingCart, FaUsers, FaChartBar, FaEdit, FaTrash, FaPlus, FaEye, FaClock, FaCheckCircle, FaTruck, FaBoxOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    recentOrders: [],
  });
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: 'casual',
    image: '',
    stock: '',
    isFeatured: false,
  });

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchDashboardStats();
    } else if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/dashboard/stats`, {
        headers: { userid: localStorage.getItem('userId') },
      });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch dashboard statistics');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiUrl}/admin/orders/all`, {
        headers: { userid: localStorage.getItem('userId') },
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`${apiUrl}/admin/products/${editingProduct._id}`, formData, {
          headers: { userid: localStorage.getItem('userId') },
        });
        toast.success('Product updated successfully');
      } else {
        await axios.post(`${apiUrl}/admin/products/add`, formData, {
          headers: { userid: localStorage.getItem('userId') },
        });
        toast.success('Product added successfully');
      }
      setShowProductForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        brand: '',
        category: 'casual',
        image: '',
        stock: '',
        isFeatured: false,
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${apiUrl}/admin/products/${id}`, {
        headers: { userid: localStorage.getItem('userId') },
      });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category,
      image: product.image,
      stock: product.stock,
      isFeatured: product.isFeatured,
    });
    setShowProductForm(true);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${apiUrl}/admin/orders/${orderId}/status`,
        { orderStatus: newStatus },
        { headers: { userid: localStorage.getItem('userId') } }
      );
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      pending: '#ffc107',
      confirmed: '#17a2b8',
      shipped: '#fd7e14',
      delivered: '#28a745',
      cancelled: '#dc3545',
    };
    return colors[status] || '#666';
  };

  return (
    <div className="admin-dashboard">
      <motion.div
        className="admin-sidebar"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="admin-logo">
          <h2>Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaChartBar /> Dashboard
          </button>
          <button
            className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <FaBox /> Products
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <FaShoppingCart /> Orders
          </button>
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> Users
          </button>
        </nav>
      </motion.div>

      <div className="admin-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            className="admin-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>Dashboard</h2>
            <div className="stats-grid">
              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon" style={{ background: '#667eea' }}>
                  <FaShoppingCart />
                </div>
                <div>
                  <p>Total Orders</p>
                  <h3>{stats.totalOrders}</h3>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon" style={{ background: '#84fab0' }}>
                  <FaChartBar />
                </div>
                <div>
                  <p>Total Revenue</p>
                  <h3>${stats.totalRevenue?.toFixed(2) || '0.00'}</h3>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon" style={{ background: '#f093fb' }}>
                  <FaUsers />
                </div>
                <div>
                  <p>Total Users</p>
                  <h3>{stats.totalUsers}</h3>
                </div>
              </motion.div>

              <motion.div
                className="stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <div className="stat-icon" style={{ background: '#4facfe' }}>
                  <FaBox />
                </div>
                <div>
                  <p>Total Products</p>
                  <h3>{stats.totalProducts}</h3>
                </div>
              </motion.div>
            </div>

            <div className="recent-orders">
              <h3>Recent Orders</h3>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders?.map(order => (
                    <tr key={order._id}>
                      <td>{order.orderNumber}</td>
                      <td>{order.user?.name || 'N/A'}</td>
                      <td>${order.totalAmount?.toFixed(2) || '0.00'}</td>
                      <td>
                        <span className="badge" style={{ background: getStatusBadgeColor(order.orderStatus) }}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            className="admin-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="section-header">
              <h2>Products Management</h2>
              <button
                className="btn-primary"
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    brand: '',
                    category: 'casual',
                    image: '',
                    stock: '',
                    isFeatured: false,
                  });
                  setShowProductForm(true);
                }}
              >
                <FaPlus /> Add Product
              </button>
            </div>

            {showProductForm && (
              <motion.div
                className="product-form"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <form onSubmit={handleAddProduct}>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <input
                      type="text"
                      placeholder="Brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  ></textarea>
                  <div className="form-row">
                    <input
                      type="number"
                      placeholder="Price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Stock"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-row">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="casual">Casual</option>
                      <option value="running">Running</option>
                      <option value="basketball">Basketball</option>
                      <option value="sportswear">Sportswear</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    Featured Product
                  </label>
                  <div className="form-actions">
                    <button type="submit" className="btn-primary">
                      {editingProduct ? 'Update' : 'Add'} Product
                    </button>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setShowProductForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="products-grid">
              {products.map(product => (
                <motion.div
                  key={product._id}
                  className="product-card"
                  whileHover={{ scale: 1.02 }}
                >
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p className="brand">{product.brand}</p>
                    <p className="price">${product.price}</p>
                    <p className="stock">Stock: {product.stock}</p>
                    <div className="product-actions">
                      <button
                        className="btn-icon"
                        onClick={() => handleEditProduct(product)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="btn-icon btn-danger"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div
            className="admin-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>Orders Management</h2>
            <table className="orders-table full-width">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order.orderNumber}</td>
                    <td>{order.user?.name || 'N/A'}</td>
                    <td>${order.totalAmount?.toFixed(2)}</td>
                    <td>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <span className="badge" style={{ background: order.paymentStatus === 'completed' ? '#28a745' : '#ffc107' }}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button className="btn-icon" title="View Details">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            className="admin-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>Users Management</h2>
            <p>User management features coming soon...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
