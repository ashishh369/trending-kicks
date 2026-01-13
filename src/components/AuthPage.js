import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { authAPI } from '../services/api';
import './AuthPage.css';

const AuthPage = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userId', response.data.user.id);

        if (response.data.user.role === 'admin') {
          localStorage.setItem('adminToken', response.data.token);
          window.location.href = '/admin';
        } else {
          toast.success('Login successful!');
          onSuccess();
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setLoading(false);
          return;
        }

        const response = await authAPI.signup({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userId', response.data.user.id);

        toast.success('Registration successful!');
        onSuccess();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="auth-title">Trending Sneakers</h1>

        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
            }}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <>
              <div className="form-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="switch-link"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
              }}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
