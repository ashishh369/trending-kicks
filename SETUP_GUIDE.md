# 🎟️ Trending Sneakers - Full-Stack E-Commerce Platform

A modern, fully-featured e-commerce platform for sneaker shopping with an advanced admin dashboard, real-time notifications, and beautiful responsive UI.

## 🌟 Features

### Frontend
- ✅ Modern React.js application with smooth animations (Framer Motion)
- ✅ Responsive design with comprehensive media queries (Mobile-first)
- ✅ Dark mode toggle
- ✅ Advanced product filtering and search
- ✅ Infinite scroll product grid
- ✅ Shopping cart with localStorage persistence
- ✅ Comprehensive checkout form with billing/shipping address
- ✅ 3D product viewer (React Three Fiber)
- ✅ Voice search capability (Web Speech API)
- ✅ Toast notifications
- ✅ User authentication & profiles
- ✅ Order history & tracking

### Backend
- ✅ Node.js/Express API server
- ✅ MongoDB database with Mongoose ODM
- ✅ User authentication with JWT
- ✅ RESTful API endpoints
- ✅ Admin portal with full CRUD operations
- ✅ Email notifications (Nodemailer)
- ✅ WhatsApp notifications (Twilio)
- ✅ Order management system
- ✅ Product management system
- ✅ Security features (CORS, Helmet, Rate limiting)

### Admin Dashboard
- ✅ Real-time statistics (orders, revenue, users, products)
- ✅ Product management (Add, Edit, Delete)
- ✅ Order management with status updates
- ✅ Order notifications (Email & WhatsApp)
- ✅ User management
- ✅ Responsive admin interface

## 🛠️ Tech Stack

### Frontend
- React 19
- Framer Motion (Animations)
- React Router (Navigation)
- Axios (HTTP Client)
- React Three Fiber (3D)
- React Toastify (Notifications)
- React Icons
- React TSParticles (Background effects)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (Authentication)
- Nodemailer (Email)
- Twilio (WhatsApp)
- Stripe (Payments)
- Cloudinary (Image storage)

## 📋 Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn
- Git

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/trending-sneakers.git
cd trending-sneakers
```

### 2. Setup Frontend
```bash
# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF

# Start development server
npm start
```

### 3. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Create .env file and configure services
cp .env.example .env

# Edit .env with your credentials
# MongoDB URI, JWT Secret, Email, WhatsApp, Stripe keys, etc.
nano .env  # or use your editor

# Start backend server
npm run dev
```

## 📝 Environment Variables

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/trending-sneakers
JWT_SECRET=your_secret_key_here

# Email Configuration (Gmail with App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# WhatsApp Configuration (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+1234567890

# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=5000
FRONTEND_URL=http://localhost:3000
```

## 📱 Responsive Design Breakpoints

- **Large Desktop**: 1440px+
- **Desktop**: 1024px - 1439px
- **Tablet Landscape**: 768px - 1023px
- **Tablet Portrait**: 481px - 767px
- **Mobile Landscape**: 321px - 480px
- **Small Mobile**: Max 320px

## 🔑 Key Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get product details
- `GET /api/products/featured/all` - Get featured products

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get order details

### Admin
- `POST /api/admin/products/add` - Add product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders/all` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/addresses` - Add address
- `PUT /api/users/:id/addresses/:addressId` - Update address
- `DELETE /api/users/:id/addresses/:addressId` - Delete address

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated password in `SMTP_PASS`

### Alternative Email Services
- SendGrid
- Mailgun
- Amazon SES

## 📱 WhatsApp Setup

### Twilio Configuration
1. Create Twilio account: https://www.twilio.com
2. Get your Account SID and Auth Token
3. Set up WhatsApp Sandbox or Business Account
4. Add your WhatsApp number

## 💳 Stripe Integration

1. Create Stripe account: https://stripe.com
2. Get API keys from dashboard
3. Add keys to backend .env file
4. Implement payment processing in checkout

## 🎨 Customization

### Colors
Edit `:root` variables in `src/styles/App.css`

### Fonts
Modify font imports in `index.css` and `App.css`

### Images
Replace product images with your own URLs

### Products Data
Add/edit products through the admin panel or API

## 📊 Admin Dashboard Features

1. **Dashboard Tab**
   - View key statistics
   - See recent orders
   - Monitor revenue

2. **Products Tab**
   - Add new products
   - Edit existing products
   - Delete products
   - Set featured products

3. **Orders Tab**
   - View all orders
   - Update order status
   - Automatic email/WhatsApp notifications

4. **Users Tab**
   - View registered users
   - Manage user accounts

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Helmet.js security headers
- Input validation
- XSS protection

## 📱 Mobile Optimization

- Touch-friendly buttons (minimum 44x44px)
- Optimized font sizes for readability
- Viewport meta tags
- Reduced motion support
- Mobile-first CSS approach
- Swipe gestures support

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy build folder to Vercel
```

### Backend (Heroku/Railway/Render)
```bash
# Add Procfile in backend directory:
# web: node server.js

# Push to hosting platform
```

### Database (MongoDB Atlas)
1. Create MongoDB Atlas account
2. Create cluster
3. Get connection string
4. Update MONGODB_URI in backend .env

## 📚 API Documentation

Full API documentation available at `/docs` endpoint (when implemented)

## 🐛 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED
Solution: Ensure MongoDB is running locally or check Atlas connection string
```

### CORS Errors
```
Solution: Update FRONTEND_URL in backend .env to match your frontend URL
```

### Email Not Sending
```
Solution: Check Gmail App Password, verify SMTP settings, enable Less Secure Apps
```

### WhatsApp Not Sending
```
Solution: Verify Twilio credentials, ensure WhatsApp Sandbox is active
```

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes

## 👨‍💻 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For issues and questions, please:
1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Include screenshots/videos if applicable

## 🎯 Roadmap

- [ ] Payment gateway integration (Stripe)
- [ ] User reviews & ratings
- [ ] Wishlist functionality
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Inventory management
- [ ] Coupon system
- [ ] Email marketing integration
- [ ] Social media integration

## 👏 Acknowledgments

- Framer Motion for animations
- Three.js for 3D rendering
- Twilio for SMS/WhatsApp
- Stripe for payments
- MongoDB for database

---

**Made with ❤️ by Trending Sneakers Team**

Visit: [www.trendingsneakers.com](https://www.trendingsneakers.com)
