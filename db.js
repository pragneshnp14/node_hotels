const mongoose = require('mongoose');
require('dotenv').config();

// Debug logging
mongoose.set('debug', true);

// Log MongoDB URLs
console.log('Local MongoDB URL:', process.env.MONGODB_URL_LOCAL);
console.log('Live MongoDB URL:', process.env.MONGODB_URL_LIVE);

// Select the appropriate MongoDB URL based on the environment
const mongoURL = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URL_LIVE : process.env.MONGODB_URL_LOCAL;

// Set up MongoDB connection with options
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Other options like tls and retryWrites if needed
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
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Other options like tls and retryWrites if needed
  }).catch((err) => {
    console.error('Error during MongoDB reconnection attempt:', err);
  });
});

module.exports = db;
