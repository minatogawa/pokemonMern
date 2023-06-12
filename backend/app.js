//app.js

require('dotenv').config({ path: './.env' })


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const pokemonRoutes = require('./routes/pokemonRoutes');
const PORT = process.env.PORT;

app.use(cors());

connectDB();

app.use(express.json());
app.use(pokemonRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

