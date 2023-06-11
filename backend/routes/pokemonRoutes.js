// pokemonRoutes.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pokemon = require('../models/Pokemon');

router.get('/', (req, res) => {
    res.send('Hello, world!');
});
    
// Rota para criar um novo Pokémon
router.post('/api/pokemons', async (req, res) => {
const { nome, descricao, spriteUrl, userSub } = req.body;
console.log('userSub recebido:', userSub);  // log userSub

// Verifique se o usuário já existe
let user = await User.findOne({ auth0Sub: userSub });
if (!user) {
    // Se o usuário não existir, crie um novo usuário
    user = new User({ auth0Sub: userSub });
    await user.save();
    console.log('Usuário criado:', user);  // log user

    // Log todos os usuários
    const users = await User.find();
    console.log('Todos os usuários:', users);
}

const newPokemon = new Pokemon({ nome, descricao, spriteUrl, user: user._id});
newPokemon.save()
    .then(() => res.json('Pokémon adicionado com sucesso!'))
    .catch(err => res.status(400).json('Erro: ' + err));
});

// Rota para obter todos os Pokémon
router.get('/api/pokemons', async (req, res) => {

const { userSub } = req.query;  // Obter o userSub do query string

const user = await User.findOne({ auth0Sub: userSub });
if (!user) {
    return res.status(400).json('Usuário não encontrado');
}

Pokemon.find({ user: user._id })
    .then(pokemons => res.json(pokemons))
    .catch(err => res.status(400).json('Erro: ' + err));
});

// Rota para atualizar um Pokémon
router.put('/api/pokemons/:id', async (req, res) => {
const { nome, descricao, spriteUrl, userSub } = req.body;

const user = await User.findOne({ auth0Sub: userSub });
if (!user) {
    return res.status(400).json('Usuário não encontrado');
}

// Atualize o Pokémon apenas se pertencer ao usuário
Pokemon.findOneAndUpdate({ _id: req.params.id, user: user._id }, { nome, descricao, spriteUrl })
    .then(pokemon => {
    if (!pokemon) {
        return res.status(400).json('Pokémon não encontrado ou não pertence ao usuário');
    }
    res.json('Pokémon atualizado com sucesso!')
    })
    .catch(err => res.status(400).json('Erro: ' + err));
});

// Rota para excluir um Pokémon
router.delete('/api/pokemons/:id', async (req, res) => {
const { userSub } = req.query;

const user = await User.findOne({ auth0Sub: userSub });
if (!user) {
    return res.status(400).json('Usuário não encontrado');
}

// Exclua o Pokémon apenas se pertencer ao usuário
Pokemon.findOneAndDelete({ _id: req.params.id, user: user._id })
    .then(pokemon => {
    if (!pokemon) {
        return res.status(400).json('Pokémon não encontrado ou não pertence ao usuário');
    }
    res.json('Pokémon excluído com sucesso!')
    })
    .catch(err => res.status(400).json('Erro: ' + err));
});

module.exports = router;