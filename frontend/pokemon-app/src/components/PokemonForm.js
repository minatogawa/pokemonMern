import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const PokemonForm = ({ fetchPokemons }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [spriteUrl, setSpriteUrl] = useState('');

  const { user } = useAuth0();  // Obter o objeto user do hook useAuth0

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPokemon = { 
      nome, 
      descricao, 
      spriteUrl, 
      userSub: user.sub  // Incluir o userSub no objeto newPokemon
    };
    await axios.post('http://localhost:5000/api/pokemons', newPokemon);

    fetchPokemons();

    setNome('');
    setDescricao('');
    setSpriteUrl('');
  };

  return (
    <div className='container'>
      <h2>Adicionar um novo Pokémon</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {/* <label for="exampleInputEmail1" class="form-label">Email address</label> */}
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
          {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          {/* <label for="exampleInputPassword1" class="form-label">Password</label> */}
          <input type="text" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
        </div>
        <div className="mb-3">
        <input type="text" value={spriteUrl} onChange={e => setSpriteUrl(e.target.value)} placeholder="URL do Sprite" />
          {/* <label class="form-check-label" for="exampleCheck1">Check me out</label> */}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PokemonForm;
