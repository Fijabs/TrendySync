require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const socketio = require('socket.io');
const winston = require('winston');
const cron = require('node-cron');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/trendsync', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.info('MongoDB connected successfully');
}).catch(err => {
  logger.error('MongoDB connection error:', err);
});

// Passport configuration
require('./config/passport')(passport);
app.use(passport.initialize());

// Import routes
const authRoutes = require('./routes/auth');
const trendRoutes = require('./routes/trends');
const subscriptionRoutes = require('./routes/subscriptions');
const analyticsRoutes = require('./routes/analytics');

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/trends', trendRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Socket.io setup
const io = socketio(server);

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info('New client connected');
  
  socket.on('subscribe', (channels) => {
    channels.forEach(channel => socket.join(channel));
  });

  socket.on('disconnect', () => {
    logger.info('Client disconnected');
  });
});

// Schedule trend analysis tasks
cron.schedule('*/15 * * * *', async () => {
  try {
    // Update trends every 15 minutes
    await require('./services/trendAnalyzer').analyzeTrends();
    logger.info('Trend analysis completed successfully');
  } catch (error) {
    logger.error('Error in trend analysis:', error);
  }
});

// Export for testing
module.exports = app;