const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { createTables, insertDefaultPaymentMethods } = require('./config/initDatabase');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const transactionRoutes = require('./routes/transactions');
const notificationRoutes = require('./routes/notifications');
const chatRoutes = require('./routes/chat');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Initialize database tables after server starts
setTimeout(async () => {
  try {
    await createTables();
    await insertDefaultPaymentMethods();
  } catch (err) {
    console.error('Failed to initialize database:', err);
  }
}, 100);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/payment', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Database: PostgreSQL`);
  console.log(`🔐 JWT Secret configured: ${!!process.env.JWT_SECRET}`);
  console.log(`💰 Platform fee: ${process.env.PLATFORM_FEE_PERCENTAGE}%`);
});
