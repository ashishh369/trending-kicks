import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import SneakersGrid from './components/SneakersGrid';
import CartModal from './components/CartModal';
import DetailModal from './components/DetailModal';
import Footer from './components/Footer';
import AccountCenter from './components/AccountCenter';
import CurrencySelector from './components/CurrencySelector';
import SeasonalAnimation from './components/SeasonalAnimation';
import AdminPanel from './components/AdminPanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css';
import { sneakersData } from './data/sneakersDatabase';
import { getCurrencyRates, convertPrice } from './utils/currencyRates';

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [showCart, setShowCart] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSneakers, setFilteredSneakers] = useState(sneakersData);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAccountCenter, setShowAccountCenter] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [currentCurrency, setCurrentCurrency] = useState('USD');
  const [orders, setOrders] = useState(JSON.parse(localStorage.getItem('orders')) || []);
  const [customProducts, setCustomProducts] = useState(JSON.parse(localStorage.getItem('customProducts')) || []);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')) || {
    name: 'Guest User',
    email: 'user@example.com',
    phone: '+1-800-000-0000',
    addresses: []
  });
  const [currencyRates, setCurrencyRates] = useState({ USD: 1 });
  useEffect(() => {
    async function fetchRates() {
      const rates = await getCurrencyRates();
      setCurrencyRates(rates);
    }
    fetchRates();
  }, [currentCurrency]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]); // Parallax effect

  useEffect(() => {
    // Check if first visit
    const visited = localStorage.getItem('visited');
    if (!visited) {
      setIsFirstVisit(true);
      localStorage.setItem('visited', 'false');
    } else {
      setIsFirstVisit(false);
    }

    // Load currency
    const savedCurrency = localStorage.getItem('currency') || 'USD';
    setCurrentCurrency(savedCurrency);

    // Load user data
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }

    // Load orders
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    setFilteredSneakers(
      sneakersData.filter(sneaker =>
        sneaker.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const updateQuantity = (id, quantity) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item).filter(item => item.quantity > 0));
  };

  const viewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const fetchMoreData = () => {
    if (filteredSneakers.length >= 20) setHasMore(false);
    setLoading(true);
    setTimeout(() => {
      setFilteredSneakers(prev => [...prev, ...sneakersData.slice(0, 4)]); // Simulate loading more
      setLoading(false);
    }, 1500);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <SeasonalAnimation />
      <div className="background-gradient" />
      <CurrencySelector 
        onSelectCurrency={(currency) => {
          setCurrentCurrency(currency.code);
          localStorage.setItem('currency', currency.code);
          localStorage.setItem('visited', 'true');
          setIsFirstVisit(false);
          toast.success(`Currency changed to ${currency}`);
        }}
        isFirstVisit={isFirstVisit}
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Header 
          cartCount={cartCount} 
          onCartClick={() => setShowCart(true)} 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode} 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          onAccountClick={() => setShowAccountCenter(true)}
          onAdminClick={() => setShowAdminPanel(true)}
          currentCurrency={currentCurrency}
        />
        <motion.div style={{ y }}>
          <Hero />
        </motion.div>
        <SneakersGrid 
          sneakers={filteredSneakers} 
          onAddToCart={addToCart} 
          onViewDetails={viewDetails} 
          hasMore={hasMore} 
          fetchMoreData={fetchMoreData} 
          loading={loading}
          currentCurrency={currentCurrency}
          currencyRates={currencyRates}
        />
        <CartModal 
          show={showCart} 
          onClose={() => setShowCart(false)} 
          cart={cart} 
          updateQuantity={updateQuantity}
          currentCurrency={currentCurrency}
          currencyRates={currencyRates}
        />
        <DetailModal 
          show={showDetails} 
          onClose={() => setShowDetails(false)} 
          product={selectedProduct}
          onAddToCart={addToCart}
          currentCurrency={currentCurrency}
          currencyRates={currencyRates}
        />
        <AccountCenter 
          isOpen={showAccountCenter}
          onClose={() => setShowAccountCenter(false)}
          user={userData}
          onUpdateUser={setUserData}
          orders={orders}
          onUpdateOrders={setOrders}
          currency={currentCurrency}
        />
        <AdminPanel 
          isOpen={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
        />
        <Footer />
      </motion.div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;