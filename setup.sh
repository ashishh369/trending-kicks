#!/bin/bash

echo "🚀 Trending Sneakers - Full Stack Setup"
echo "========================================"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Create frontend .env file
echo "🔧 Creating frontend .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Frontend .env created. Please update with your configuration."
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Create backend .env file
echo "🔧 Creating backend .env file..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Backend .env created. Please update with your configuration."
    echo ""
    echo "⚠️  IMPORTANT: Configure the following in backend/.env:"
    echo "  - MONGODB_URI"
    echo "  - JWT_SECRET"
    echo "  - SMTP credentials (Gmail)"
    echo "  - TWILIO credentials (WhatsApp)"
    echo "  - STRIPE keys"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "  1. Update backend/.env with your credentials"
echo "  2. Start MongoDB (if running locally)"
echo "  3. Run: npm start (in root directory for frontend)"
echo "  4. Run: npm run dev (in backend directory)"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3000"
echo "🔌 Backend will be available at: http://localhost:5000"
