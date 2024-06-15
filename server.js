const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParse = require('body-parser');
app.use(bodyParse.json());

const Person = require('./Models/Person');
const MenuItem = require('./Models/MenuItem');

app.get('/', function (req, res) {
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