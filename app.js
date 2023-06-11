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

const userSchema = new mongoose.Schema({
  auth0Sub: { type: String, unique: true },
  name: String,
  email: String
  // Outras informações de perfil que você deseja armazenar
});
const User = mongoose.model('User', userSchema);

const pokemonSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    spriteUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});
  
// Rota para criar um novo Pokémon
app.post('/api/pokemons', async (req, res) => {
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
app.get('/api/pokemons', async (req, res) => {

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
app.put('/api/pokemons/:id', async (req, res) => {
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
app.delete('/api/pokemons/:id', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});