const mongoose = require('mongoose');
require('dotenv').config();

// Debug logging
mongoose.set('debug', true);

// Log the MongoDB URL to ensure it's loaded correctly
console.log('MongoDB URL:', process.env.MONGODB_URL_LIVE);

// Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LIVE;

// Set up MongoDB connection with updated options
mongoose.connect(mongoURL, {
  tls: true, // Enforce TLS/SSL connection
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  retryWrites: true,
  tlsAllowInvalidCertificates: true, // Only for testing, should be false in production
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  mongoose.connect(mongoURL, {
    tls: true, // Enforce TLS/SSL connection
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
    tlsAllowInvalidCertificates: true, // Only for testing, should be false in production
  }).catch((err) => {
    console.error('Error during MongoDB reconnection attempt:', err);
  });
});

module.exports = db;
