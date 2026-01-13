# 🚀 Deployment Guide - Trending Sneakers

## Quick Deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] Frontend build tested locally
- [ ] API endpoints verified
- [ ] Email/WhatsApp services tested
- [ ] SSL certificates ready (for production)
- [ ] Backups created

---

## Frontend Deployment

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project root
vercel
```

**Configuration (vercel.json)**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "env": {
    "REACT_APP_API_URL": "@trending_sneakers_api_url"
  }
}
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy
```

**netlify.toml**:
```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[env]
  REACT_APP_API_URL = "your-api-url"
```

### Option 3: AWS S3 + CloudFront
```bash
# Build
npm run build

# Upload to S3
aws s3 sync build/ s3://your-bucket-name/

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### Option 4: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Create app.json
cat > app.json << EOF
{
  "buildpacks": [
    {
      "url": "heroku/nodejs"
    }
  ]
}
EOF

# Deploy
heroku create your-app-name
git push heroku main
```

---

## Backend Deployment

### Option 1: Render.com (Recommended)
1. Connect GitHub repository
2. Create new Web Service
3. Configure build command: `npm install`
4. Configure start command: `npm start`
5. Set environment variables
6. Deploy

### Option 2: Railway.app
1. Connect GitHub
2. Create new project
3. Add PostgreSQL/MongoDB
4. Set environment variables
5. Deploy automatically

### Option 3: Heroku
```bash
cd backend

# Create Procfile
echo "web: node server.js" > Procfile

# Add Heroku remote
heroku create your-api-name

# Set environment variables
heroku config:set MONGODB_URI="your-uri"
heroku config:set JWT_SECRET="your-secret"

# Deploy
git push heroku main
```

### Option 4: DigitalOcean App Platform
1. Connect GitHub repository
2. Select backend folder
3. Configure environment
4. Set environment variables
5. Deploy

---

## Database Deployment

### MongoDB Atlas (Cloud)
1. Create account at mongodb.com/cloud
2. Create cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string
6. Update MONGODB_URI in .env

**Connection String Format**:
```
mongodb+srv://username:password@cluster.mongodb.net/database
```

### Self-hosted MongoDB

**DigitalOcean Droplet**:
```bash
# SSH into droplet
ssh root@your-ip

# Install MongoDB
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## Email Service Setup

### Gmail (SMTP)
1. Enable 2-Factor Authentication
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use credentials in .env

### SendGrid
1. Create SendGrid account
2. Get API key
3. Update backend configuration:

```javascript
// For SendGrid
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email,
  from: 'noreply@trendingsneakers.com',
  subject: 'Order Confirmation',
  html: htmlContent,
};

await sgMail.send(msg);
```

### AWS SES
```bash
npm install aws-sdk
```

---

## WhatsApp Setup

### Twilio Configuration
1. Create Twilio account: https://www.twilio.com
2. Get credentials:
   - Account SID
   - Auth Token
   - WhatsApp Sandbox Number
3. Add numbers to sandbox: https://console.twilio.com/sms/whatsapp/learn

### Production WhatsApp Business Account
1. Request business verification
2. Create business account
3. Generate API credentials
4. Update Twilio configuration

---

## Payment Gateway Setup

### Stripe
1. Create Stripe account
2. Get API keys (publishable & secret)
3. Set keys in .env:
```
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
```

4. Implement webhook:
```javascript
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    // Handle events
    switch (event.type) {
      case 'payment_intent.succeeded':
        // Handle successful payment
        break;
    }
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

---

## SSL/HTTPS Setup

### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Auto-renew
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Add to Express
```javascript
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/fullchain.pem'),
};

https.createServer(options, app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});
```

---

## Domain Setup

### DNS Configuration
```
A Record: @ → Your-Server-IP
A Record: www → Your-Server-IP
CNAME: api → Your-API-Domain
MX Record: (for email)
TXT Record: SPF record
```

### Example (Cloudflare)
1. Add domain to Cloudflare
2. Update nameservers
3. Configure DNS records
4. Enable SSL/TLS
5. Set up page rules if needed

---

## CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        run: npm run deploy
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## Monitoring & Logging

### Error Tracking (Sentry)
```bash
npm install @sentry/node
```

```javascript
import Sentry from "@sentry/node";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NODE_ENV,
});
```

### Monitoring (New Relic)
```bash
npm install newrelic
```

### Logging (Winston)
```bash
npm install winston
```

---

## Performance Optimization

### Frontend
```bash
# Analyze bundle
npm run analyze

# Compression
npm install compression
```

### Backend
```javascript
// Caching
app.use(compression());

// Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

---

## Backup & Recovery

### MongoDB Backup
```bash
# Full backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/db" --out=/backups

# Restore
mongorestore --uri="mongodb+srv://user:pass@cluster.mongodb.net/db" /backups/db
```

### Automated Backups
```bash
# Create backup script
#!/bin/bash
mongodump --uri="$MONGODB_URI" --out=/backups/$(date +%Y%m%d)

# Schedule with crontab
0 2 * * * /home/backup.sh  # Run daily at 2 AM
```

---

## Health Checks

```javascript
// Add health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});
```

---

## Troubleshooting

### CORS Issues
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### Database Connection
```javascript
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
})
.catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});
```

### Memory Leaks
```javascript
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
```

---

## Post-Deployment

- [ ] Test all features
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify backups
- [ ] Set up alerts
- [ ] Document processes
- [ ] Plan maintenance window

---

**Need help?** Contact: support@trendingsneakers.com
