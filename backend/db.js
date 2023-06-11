//db.js
require('dotenv').config({ path: './backend/.env' });

const DB_URI = process.env.DB_URI;
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Conectado ao banco de dados MongoDB'))
    .catch(err => console.log('Erro ao conectar ao banco de dados', err));
}

module.exports = connectDB;
