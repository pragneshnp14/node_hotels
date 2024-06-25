const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParse = require('body-parser');
const passport = require('./auth');

app.use(bodyParse.json());
app.use(passport.initialize());

//auth middleware
const localAuthMiddleware = passport.authenticate('local', {session: false});

//Middleware Function
const logRequest = (req, res, next) => {
  // console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();
}
app.use(logRequest);

app.get('/',function (req, res) {
  res.send('Welcome to hotel !');
})

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

app.use('/person', personRoutes);
app.use('/menu', menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('listing on port 3000');
})