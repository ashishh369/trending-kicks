import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTrash, FaEdit, FaTimes, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './AdminPanel.css';

const AdminPanel = ({ isOpen, onClose }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('customProducts');
    return saved ? JSON.parse(saved) : [];
  });
  const [isEditingNew, setIsEditingNew] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    img: '',
    rating: '',
    popularity: '',
    brand: '',
    category: '',
    reviews: '',
  });

  useEffect(() => {
    localStorage.setItem('customProducts', JSON.stringify(products));
  }, [products]);

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      img: '',
      rating: '',
      popularity: '',
      brand: '',
      category: '',
      reviews: '',
    });
    setIsEditingNew(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.brand) {
      toast.error('Please fill in required fields: Name, Price, Brand');
      return;
    }

    if (editingId) {
      // Update existing product
      setProducts(prev =>
        prev.map(p =>
          p.id === editingId
            ? {
              ...p,
              name: formData.name,
              price: parseFloat(formData.price),
              img: formData.img,
              rating: parseFloat(formData.rating) || 4.5,
              popularity: formData.popularity || '80%',
              brand: formData.brand,
              category: formData.category,
              reviews: formData.reviews.split(',').map(r => r.trim()).filter(r => r),
            }
            : p
        )
      );
      toast.success('Product updated successfully!');
    } else {
      // Add new product
      const newProduct = {
        id: Date.now(),
        name: formData.name,
        price: parseFloat(formData.price),
        img: formData.img,
        rating: parseFloat(formData.rating) || 4.5,
        popularity: formData.popularity || '80%',
        brand: formData.brand,
        category: formData.category,
        reviews: formData.reviews.split(',').map(r => r.trim()).filter(r => r),
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Product added successfully!');
    }
    resetForm();
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      img: product.img,
      rating: product.rating.toString(),
      popularity: product.popularity,
      brand: product.brand,
      category: product.category,
      reviews: product.reviews ? product.reviews.join(', ') : '',
    });
    setEditingId(product.id);
    setIsEditingNew(true);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="admin-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="admin-container"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="admin-header">
              <h2>🛠️ Admin Panel - Manage Products</h2>
              <button className="close-btn" onClick={onClose}>
                <FaTimes />
              </button>
            </div>

            <div className="admin-content">
              {/* Form Section */}
              <div className="form-section">
                <h3>{editingId ? 'Edit Product' : 'Add New Product'}</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Product Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Price *"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="form-input"
                    step="0.01"
                  />
                  <input
                    type="text"
                    placeholder="Brand *"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <input
                    type="text"
                    placeholder="Category (e.g., Running)"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Rating (0-5)"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="form-input"
                    step="0.1"
                    min="0"
                    max="5"
                  />
                  <input
                    type="text"
                    placeholder="Popularity (e.g., 90%)"
                    name="popularity"
                    value={formData.popularity}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                <textarea
                  placeholder="Image URL"
                  name="img"
                  value={formData.img}
                  onChange={handleInputChange}
                  className="form-input full-width"
                  rows="2"
                />
                <textarea
                  placeholder="Reviews (comma-separated)"
                  name="reviews"
                  value={formData.reviews}
                  onChange={handleInputChange}
                  className="form-input full-width"
                  rows="3"
                />
                <div className="form-actions">
                  <button
                    className="btn-primary"
                    onClick={handleAddProduct}
                  >
                    <FaSave /> {editingId ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingId && (
                    <button
                      className="btn-secondary"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Products List Section */}
              <div className="products-section">
                <h3>
                  <FaPlus /> Custom Products ({products.length})
                </h3>
                {products.length === 0 ? (
                  <p className="empty-message">No custom products added yet. Add your first product!</p>
                ) : (
                  <div className="products-grid">
                    {products.map(product => (
                      <motion.div
                        key={product.id}
                        className="product-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <img src={product.img} alt={product.name} className="product-image" />
                        <div className="product-info">
                          <h4>{product.name}</h4>
                          <p className="brand">{product.brand}</p>
                          <p className="price">${product.price.toFixed(2)}</p>
                          <p className="meta">Rating: {product.rating}★ | {product.category}</p>
                        </div>
                        <div className="product-actions">
                          <button
                            className="btn-edit"
                            onClick={() => handleEditProduct(product)}
                            title="Edit product"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteProduct(product.id)}
                            title="Delete product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminPanel;
