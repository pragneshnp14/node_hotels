const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('debug', true); // Enable Mongoose debugging

const mongoURL = process.env.MONGODB_URL_LIVE;

const options = {
  tls: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true
};

mongoose.connect(mongoURL, options)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  mongoose.connect(mongoURL, options).catch(err => {
    console.error('Error during MongoDB reconnection attempt:', err);
  });
});

module.exports = db;
