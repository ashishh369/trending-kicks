import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

// Products endpoints
export const productsAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured/all'),
};

// Orders endpoints
export const ordersAPI = {
  create: (data) => api.post('/orders/create', data),
  getUserOrders: (userId) => api.get(`/orders/user/${userId}`),
  getById: (id) => api.get(`/orders/${id}`),
};

// Admin endpoints
export const adminAPI = {
  addProduct: (data) => api.post('/admin/products/add', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  getAllOrders: (params) => api.get('/admin/orders/all', { params }),
  updateOrderStatus: (id, data) => api.put(`/admin/orders/${id}/status`, data),
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
};

// Users endpoints
export const usersAPI = {
  getProfile: (id) => api.get(`/users/${id}`),
  updateProfile: (id, data) => api.put(`/users/${id}`, data),
  addAddress: (id, data) => api.post(`/users/${id}/addresses`, data),
  updateAddress: (id, addressId, data) => api.put(`/users/${id}/addresses/${addressId}`, data),
  deleteAddress: (id, addressId) => api.delete(`/users/${id}/addresses/${addressId}`),
};

export default api;
