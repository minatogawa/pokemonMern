const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000; // ou a porta que desejar
const cors = require('cors');

app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/pokemonDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao banco de dados MongoDB'))
.catch(err => console.log('Erro ao conectar ao banco de dados', err));

const pokemonSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    spriteUrl: String
  });
  const Pokemon = mongoose.model('Pokemon', pokemonSchema);

  app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
  
// Rota para criar um novo Pokémon
app.post('/api/pokemons', (req, res) => {
  const { nome, descricao, spriteUrl } = req.body;
  const newPokemon = new Pokemon({ nome, descricao, spriteUrl });
  newPokemon.save()
    .then(() => res.json('Pokémon adicionado com sucesso!'))
    .catch(err => res.status(400).json('Erro: ' + err));
});

// Rota para obter todos os Pokémon
app.get('/api/pokemons', (req, res) => {
  Pokemon.find()
    .then(pokemons => res.json(pokemons))
    .catch(err => res.status(400).json('Erro: ' + err));
});

// Rota para atualizar um Pokémon
app.put('/api/pokemons/:id', (req, res) => {
  Pokemon.findById(req.params.id)
    .then(pokemon => {
      pokemon.nome = req.body.nome;
      pokemon.descricao = req.body.descricao;
      pokemon.spriteUrl = req.body.spriteUrl;
      pokemon.save()
        .then(() => res.json('Pokémon atualizado com sucesso!'))
        .catch(err => res.status(400).json('Erro: ' + err));
    })
    .catch(err => res.status(400).json('Erro: ' + err));
});

// Rota para excluir um Pokémon
app.delete('/api/pokemons/:id', (req, res) => {
  Pokemon.findByIdAndDelete(req.params.id)
    .then(() => res.json('Pokémon excluído com sucesso!'))
    .catch(err => res.status(400).json('Erro: ' + err));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});