const express = require('express');
const app = express();
const db = require('./db');

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

app.listen(3000, () => {
  console.log('listing on port 3000');
})