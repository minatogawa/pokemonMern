//app.js

require('dotenv').config({ path: './.env' })


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const pokemonRoutes = require('./routes/pokemonRoutes');
const PORT = process.env.PORT || 5000;

app.use(cors());

connectDB();

app.use(express.json());
app.use(pokemonRoutes);

// Serve any static files built by React
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing, return all requests to the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

