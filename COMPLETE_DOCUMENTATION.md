# 📚 Complete Project Documentation - Trending Sneakers

## 🎯 Project Overview

**Trending Sneakers** is a full-stack, production-ready e-commerce platform for sneaker shopping. It features a modern React frontend with beautiful animations, a powerful Node.js/Express backend, and a comprehensive admin dashboard for easy content management.

## 📁 Project Structure

```
trending-sneakers/
├── frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js              # Navigation, search, dark mode
│   │   │   ├── Hero.js                # Landing section
│   │   │   ├── SneakersGrid.js         # Product grid with infinite scroll
│   │   │   ├── SneakerCard.js          # Individual product card
│   │   │   ├── CartModal.js            # Shopping cart overlay
│   │   │   ├── DetailModal.js          # Product details & 3D viewer
│   │   │   ├── CheckoutForm.js         # New: 3-step checkout form
│   │   │   ├── AdminDashboard.js       # New: Admin portal
│   │   │   ├── AuthPage.js             # New: Login/signup form
│   │   │   └── Footer.js               # Footer content
│   │   ├── services/
│   │   │   └── api.js                  # New: API configuration
│   │   ├── styles/
│   │   │   └── App.css                 # Responsive styles with media queries
│   │   ├── App.js                      # Root component
│   │   └── index.js                    # Entry point
│   ├── .env.example                    # Environment variables template
│   ├── .env                            # Local environment (create from .env.example)
│   ├── package.json                    # Dependencies
│   └── README.md
│
├── backend (Node.js/Express)
│   ├── models/
│   │   ├── User.js                     # User schema with addresses
│   │   ├── Product.js                  # Product schema
│   │   └── Order.js                    # Order schema
│   ├── routes/
│   │   ├── auth.js                     # Authentication endpoints
│   │   ├── products.js                 # Product endpoints
│   │   ├── orders.js                   # Order endpoints
│   │   ├── admin.js                    # Admin endpoints
│   │   └── users.js                    # User endpoints
│   ├── utils/
│   │   ├── emailService.js             # Email notifications
│   │   ├── whatsappService.js          # WhatsApp notifications
│   │   └── auth.js                     # JWT utilities
│   ├── server.js                       # Express server setup
│   ├── .env.example                    # Environment variables template
│   ├── .env                            # Local environment (create from .env.example)
│   ├── package.json                    # Dependencies
│   └── README.md
│
├── SETUP_GUIDE.md                      # Detailed setup instructions
├── DEPLOYMENT.md                       # Deployment guide for production
├── .gitignore                          # Git ignore configuration
└── README.md                           # Main project README
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm/yarn
- Git

### Quick Start

**Option 1: Automated Setup (Linux/Mac)**
```bash
bash setup.sh
```

**Option 2: Manual Setup**

1. **Frontend Setup**
```bash
npm install
cp .env.example .env
npm start
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your credentials
npm run dev
```

---

## 🔧 Configuration

### Frontend Configuration (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_your_key
```

### Backend Configuration (.env)
```
MONGODB_URI=mongodb://localhost:27017/trending-sneakers
JWT_SECRET=your_secret_key_change_this

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# WhatsApp
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=+1234567890

# Stripe
STRIPE_PUBLIC_KEY=pk_test_key
STRIPE_SECRET_KEY=sk_test_key

PORT=5000
FRONTEND_URL=http://localhost:3000
```

---

## ✨ Key Features Implemented

### 1. Frontend Features
- ✅ **Responsive Design**: Mobile-first approach with 6+ breakpoints
- ✅ **Smooth Animations**: Framer Motion for all transitions
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Product Search**: Real-time search with multiple filters
- ✅ **Infinite Scroll**: Lazy loading for large datasets
- ✅ **Shopping Cart**: LocalStorage persistence
- ✅ **3D Product Viewer**: React Three Fiber integration
- ✅ **Voice Search**: Web Speech API support
- ✅ **Checkout Form**: Multi-step form with validation
- ✅ **User Authentication**: Login/Signup with JWT
- ✅ **Order History**: Track user orders
- ✅ **Wishlist Ready**: Infrastructure for favorites

### 2. Backend Features
- ✅ **RESTful API**: Fully documented endpoints
- ✅ **User Authentication**: JWT-based auth with roles
- ✅ **Product Management**: CRUD operations
- ✅ **Order Processing**: Complete order workflow
- ✅ **Email Notifications**: Order confirmations & updates
- ✅ **WhatsApp Notifications**: Real-time order updates
- ✅ **Admin Portal**: Full content management
- ✅ **Security**: CORS, Helmet, Rate limiting
- ✅ **Database**: MongoDB with Mongoose schemas
- ✅ **Validation**: Input validation and sanitization
- ✅ **Error Handling**: Comprehensive error middleware
- ✅ **Performance**: Optimized queries and caching

### 3. Admin Dashboard Features
- ✅ **Statistics Dashboard**: Real-time KPIs
- ✅ **Product Management**: Add/Edit/Delete products
- ✅ **Order Management**: Track and update orders
- ✅ **Order Notifications**: Auto-send email/WhatsApp
- ✅ **User Management**: View and manage users
- ✅ **Responsive Interface**: Mobile-friendly admin

---

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | User login |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (paginated) |
| GET | `/api/products/:id` | Get product details |
| GET | `/api/products/featured/all` | Get featured products |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders/create` | Create new order |
| GET | `/api/orders/user/:userId` | Get user orders |
| GET | `/api/orders/:id` | Get order details |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/products/add` | Add product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |
| GET | `/api/admin/orders/all` | Get all orders |
| PUT | `/api/admin/orders/:id/status` | Update order status |
| GET | `/api/admin/dashboard/stats` | Get dashboard stats |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/:id` | Get user profile |
| PUT | `/api/users/:id` | Update profile |
| POST | `/api/users/:id/addresses` | Add address |
| PUT | `/api/users/:id/addresses/:addressId` | Update address |
| DELETE | `/api/users/:id/addresses/:addressId` | Delete address |

---

## 📱 Responsive Breakpoints

```css
/* Large Desktop: 1440px+ */
Max container width: 1320px

/* Desktop: 1024px - 1439px */
Max container width: 960px
Grid: 3 columns

/* Tablet Landscape: 768px - 1023px */
Max container width: 720px
Grid: 2 columns

/* Tablet Portrait: 481px - 767px */
Max container width: 95%
Grid: 1-2 columns

/* Mobile Landscape: 321px - 480px */
Touch-friendly buttons: 44x44px
Sticky header with blur

/* Small Mobile: max 320px */
Single column layout
Minimal padding
```

---

## 🔐 Security Features

1. **Authentication**
   - JWT tokens with 7-day expiration
   - Password hashing with bcrypt
   - Role-based access control

2. **API Security**
   - CORS protection
   - Rate limiting (100 requests/15 minutes)
   - Helmet.js security headers
   - Input validation & sanitization

3. **Data Protection**
   - Sensitive data not exposed
   - Admin-only endpoints
   - User data isolation

---

## 📧 Email Configuration

### Gmail Setup
1. Enable 2FA on Google account
2. Generate App Password at https://myaccount.google.com/apppasswords
3. Use generated password in SMTP_PASS

### Email Templates
- Order confirmation
- Order status updates
- Delivery notifications

---

## 📱 WhatsApp Configuration

### Twilio Setup
1. Create Twilio account
2. Get Account SID & Auth Token
3. Set up WhatsApp Sandbox
4. Add verified numbers

### Messages Sent
- Order confirmation with order number
- Status updates (confirmed, shipped, delivered)
- Delivery notifications

---

## 💳 Payment Integration

### Stripe Setup
1. Create Stripe account
2. Get API keys (publishable & secret)
3. Implement payment processing
4. Set up webhooks for events

### Supported Payment Methods
- Credit/Debit cards
- PayPal
- Digital wallets (Apple Pay, Google Pay)

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  profileImage: String,
  addresses: [{
    street, city, state, zipCode, country, isDefault
  }],
  role: ['user', 'admin'],
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  name: String,
  description: String,
  price: Number,
  discountPrice: Number,
  brand: String,
  category: String,
  image: String,
  images: [String],
  sizes: [String],
  colors: [String],
  stock: Number,
  rating: Number,
  reviews: [{
    user, comment, rating, createdAt
  }],
  isFeatured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Schema
```javascript
{
  orderNumber: String (unique),
  user: ObjectId,
  items: [{
    product, name, price, quantity, size, color
  }],
  billingAddress: {
    firstName, lastName, street, city, state, zipCode, country, phone, email
  },
  shippingAddress: { /* same structure */ },
  paymentMethod: String,
  paymentStatus: String,
  orderStatus: String,
  subtotal, tax, shippingCost, totalAmount,
  trackingNumber: String,
  notificationsSent: { email, whatsapp },
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Frontend Deployment Options
- **Vercel** (Recommended) - Automatic from GitHub
- **Netlify** - Easy configuration
- **AWS S3 + CloudFront** - Scalable
- **Heroku** - Simple setup

### Backend Deployment Options
- **Render.com** (Recommended) - Free tier available
- **Railway.app** - Simple & fast
- **Heroku** - Traditional approach
- **DigitalOcean** - Full control

### Database Deployment
- **MongoDB Atlas** - Recommended (cloud)
- **Self-hosted MongoDB** - Full control

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 📊 Analytics & Monitoring

Integrate with:
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **Google Analytics** - User behavior
- **Datadog** - Infrastructure monitoring

---

## 🧪 Testing

### Frontend Testing
```bash
npm test
```

### Backend Testing
```bash
cd backend
npm test
```

---

## 🔄 Continuous Integration/Deployment

### GitHub Actions
- Automatic testing on push
- Build verification
- Deployment to production

See `.github/workflows/` for configuration.

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Framer Motion](https://www.framer.com/motion)
- [Tailwind CSS](https://tailwindcss.com)

---

## 🛠️ Troubleshooting

### Common Issues

**MongoDB Connection Failed**
- Check if MongoDB is running
- Verify connection string
- Check firewall/VPN settings

**CORS Errors**
- Update FRONTEND_URL in backend .env
- Verify API_URL in frontend .env

**Email Not Sending**
- Verify Gmail App Password
- Enable "Less Secure Apps" if needed
- Check SMTP credentials

**WhatsApp Not Sending**
- Verify Twilio credentials
- Check phone number format
- Ensure WhatsApp Sandbox is active

---

## 📞 Support & Contributing

For issues and support:
1. Check existing documentation
2. Search GitHub issues
3. Create new issue with details
4. Contact: support@trendingsneakers.com

Contributing guidelines:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

## 📄 License

MIT License - Open source and free for personal/commercial use

---

## 🎉 What's Next?

1. **Configure environment variables** in `.env` files
2. **Set up MongoDB** locally or use Atlas
3. **Start development servers**
   ```bash
   npm start  # Frontend
   npm run dev  # Backend (in backend folder)
   ```
4. **Visit** http://localhost:3000
5. **Start building!**

---

**Happy Coding! 🚀**

Created with ❤️ by Trending Sneakers Team
