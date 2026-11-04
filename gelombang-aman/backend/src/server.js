require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { success: false, message: 'Terlalu banyak permintaan, coba lagi nanti.' }
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
const tsunamiRoutes = require('./routes/tsunami');
const monitoringRoutes = require('./routes/monitoring');
const victimsRoutes = require('./routes/victims');
const educationRoutes = require('./routes/education');
const simulationRoutes = require('./routes/simulation');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const statsRoutes = require('./routes/stats');
const mapRoutes = require('./routes/map');

app.use('/api/tsunami', tsunamiRoutes);
app.use('/api/monitoring', monitoringRoutes);
app.use('/api/victims', victimsRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/map', mapRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'GELOMBANG AMAN API is running', 
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint tidak ditemukan.' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || 'Terjadi kesalahan pada server.' 
  });
});

app.listen(PORT, () => {
  console.log(`🌊 GELOMBANG AMAN Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
