const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    auth0Sub: { type: String, unique: true },
    name: String,
    email: String
    // Outras informações de perfil que você deseja armazenar
  });
  const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);