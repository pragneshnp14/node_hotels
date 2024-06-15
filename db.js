const mongoose = require('mongoose');
require('dotenv').config();


// Define the MongoDB connection URL
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'; // Use 127.0.0.1 instead of localhost
// const mongoURL = process.env.MONGODB_URL_lOCAL
const mongoURL = process.env.MONGODB_URL_LIVE

// Set up MongoDB connection
mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Attempt to reconnect when disconnected
db.on('disconnected', () => {
    console.log('Attempting to reconnect to MongoDB...');
    mongoose.connect(mongoURL);
});

module.exports = db;
