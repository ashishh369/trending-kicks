# 🎯 Quick Reference Guide - Trending Sneakers

## 🚀 Start Here

### Prerequisites Check
```
✅ Node.js installed? (v14+)
✅ MongoDB available? (local or Atlas)
✅ Git installed?
✅ Text editor ready?
```

---

## ⚡ 5-Minute Setup

```bash
# 1. Clone/Navigate to project
cd trending-sneakers

# 2. Install frontend
npm install

# 3. Install backend
cd backend
npm install
cd ..

# 4. Copy env files
cp .env.example .env
cp backend/.env.example backend/.env

# 5. Start servers
# Terminal 1:
npm start

# Terminal 2:
cd backend && npm run dev
```

**Result:** Frontend at http://localhost:3000, Backend at http://localhost:5000

---

## 📋 Essential Configuration

### Minimum .env Setup (Frontend)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Minimum .env Setup (Backend)
```
MONGODB_URI=mongodb://localhost:27017/trending-sneakers
JWT_SECRET=your-secret-key-123
PORT=5000
FRONTEND_URL=http://localhost:3000
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_WHATSAPP_NUMBER=+1234567890
```

---

## 🗺️ Key Routes

### Frontend Pages
```
/                    → Home (product grid)
/admin              → Admin dashboard (admin only)
/checkout           → Checkout process
/cart               → Shopping cart
/search?q=nike      → Search results
```

### Backend Endpoints
```
POST   /api/auth/login
POST   /api/auth/signup
GET    /api/products
POST   /api/orders/create
GET    /api/admin/orders/all
PUT    /api/admin/orders/:id/status
```

---

## 💡 Quick Tips

### Dark Mode Testing
```javascript
// In browser console:
document.querySelector('body').classList.add('dark');
```

### Add Sample Products
```javascript
// Update backend/models/Product.js
const sampleProducts = [{
  name: 'Nike Air Max',
  price: 150,
  // ...
}];
```

### Test Email Locally
1. Use Gmail with App Password
2. Or use Mailtrap for testing (free)

### Test WhatsApp
1. Create Twilio trial account
2. Add verified phone number to sandbox
3. Send message from verified number

---

## 📱 Testing Different Devices

```bash
# Open DevTools (F12) and use Device Emulation:
Ctrl+Shift+M (Windows/Linux)
Cmd+Shift+M (Mac)

# Test breakpoints:
- 320px (Small Mobile)
- 480px (Mobile Landscape)
- 768px (Tablet)
- 1024px (Desktop)
- 1440px (Large Desktop)
```

---

## 🔍 Debugging Tips

### Frontend Issues
```javascript
// Check API connectivity
console.log(process.env.REACT_APP_API_URL);

// Check localStorage
localStorage.getItem('token');
localStorage.getItem('cart');

// Check components
document.querySelector('.sneaker-card');
```

### Backend Issues
```bash
# Check MongoDB
mongosh "your-connection-string"
# db.products.find()

# Check port
netstat -an | grep 5000

# View logs
npm run dev  # Shows errors in console
```

---

## 📚 File Quick Links

| File | Purpose | Edit For |
|------|---------|----------|
| src/App.js | Main logic | Add features |
| src/styles/App.css | Styling | Colors/themes |
| backend/server.js | API setup | Server config |
| backend/models/*.js | Database | Schema changes |

---

## 🎨 Common Customizations

### Change Primary Color
```css
/* In App.css */
--primary: #007bff;  /* Change this */
```

### Add New Product Category
```javascript
// In Product model
category: String,  // Add to enum
```

### Change Email Template
```javascript
// In backend/utils/emailService.js
// Modify htmlContent in sendOrderConfirmationEmail
```

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS
- [ ] Use strong passwords
- [ ] Validate all inputs
- [ ] Never commit .env files
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Set up rate limiting

---

## 📊 Database Sample Data

### Add Test Product
```javascript
// Via MongoDB or admin panel
{
  name: "Nike Jordan 1",
  price: 150,
  brand: "Nike",
  category: "basketball",
  image: "url-to-image",
  stock: 50,
  rating: 4.5
}
```

### Create Test User
```javascript
// Via signup
Email: test@example.com
Password: Test@123
Name: Test User
```

---

## 🚨 Common Errors & Fixes

| Error | Solution |
|-------|----------|
| MongoDB connection failed | Check MONGODB_URI |
| CORS error | Update FRONTEND_URL |
| Email not sending | Verify SMTP credentials |
| Admin can't login | Check user role in DB |
| Port 5000 in use | Kill process or change port |
| npm install fails | Delete node_modules & retry |

---

## 🎯 Feature Checklist

### Core Features
- [x] Product browsing
- [x] Shopping cart
- [x] Checkout form
- [x] User authentication
- [x] Admin dashboard
- [x] Email notifications
- [x] WhatsApp notifications
- [x] Order management

### Optional Features (Ready to Add)
- [ ] Payment processing
- [ ] Product reviews
- [ ] Wishlist
- [ ] Inventory tracking
- [ ] Analytics
- [ ] Multi-language
- [ ] Social login
- [ ] Live chat

---

## 📈 Performance Tips

```javascript
// Lazy load components
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

// Optimize images
Use Next.js Image component (if using Next.js)
Compress images before upload

// Database
Create indexes for frequent queries
Cache responses with Redis
```

---

## 🌐 Deployment Quick Links

### Frontend
- [Vercel](https://vercel.com) - Recommended
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)

### Backend
- [Render](https://render.com) - Recommended
- [Railway](https://railway.app)
- [Heroku](https://heroku.com)

### Database
- [MongoDB Atlas](https://atlas.mongodb.com) - Recommended

### Services
- [Twilio](https://twilio.com) - WhatsApp
- [Gmail](https://mail.google.com) - Email
- [Stripe](https://stripe.com) - Payments

---

## 📞 Getting Help

1. **Check Documentation**
   - SETUP_GUIDE.md
   - DEPLOYMENT.md
   - COMPLETE_DOCUMENTATION.md

2. **Search Issues**
   - GitHub Issues
   - Stack Overflow
   - Documentation

3. **Debug**
   - Check browser console
   - Check server logs
   - Check MongoDB

4. **Ask for Help**
   - GitHub Discussions
   - Stack Overflow
   - Community forums

---

## ✅ Launch Checklist

### Before Launch
- [ ] All .env files configured
- [ ] Test all features locally
- [ ] Run `npm run build`
- [ ] Test build locally
- [ ] Check responsiveness
- [ ] Verify all API endpoints
- [ ] Test notifications
- [ ] Security audit

### Deployment
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Configure domain
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Document processes

### Post-Launch
- [ ] Monitor errors
- [ ] Check performance
- [ ] Gather feedback
- [ ] Plan updates
- [ ] Maintain security

---

## 🎓 Learning Resources

### Frontend
- [React Docs](https://react.dev)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)

### Backend
- [Express Guide](https://expressjs.com)
- [MongoDB Docs](https://docs.mongodb.com)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

### Full-Stack
- [Web Security Academy](https://portswigger.net/web-security)
- [System Design](https://www.educative.io)
- [Performance Tips](https://web.dev)

---

## 🎉 You're Ready!

Everything you need is set up and ready to go.

**Next Steps:**
1. ✅ Set up .env files
2. ✅ Start development servers
3. ✅ Test all features
4. ✅ Customize with your branding
5. ✅ Deploy to production

---

**Happy Coding! 🚀**

*For detailed guides, see SETUP_GUIDE.md and DEPLOYMENT.md*
