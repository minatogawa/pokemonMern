const mongoose = require('mongoose');


const pokemonSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    spriteUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = mongoose.model('Pokemon', pokemonSchema);