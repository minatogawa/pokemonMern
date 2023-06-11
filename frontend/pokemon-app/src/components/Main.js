import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import PokemonForm from './PokemonForm';
import SearchBar from './SearchBar';
import { useAuth0 } from "@auth0/auth0-react";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchPokemons = async () => {
    const res = await axios.get('http://localhost:5000/api/pokemons');
    setPokemons(res.data);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <>
        <PokemonForm fetchPokemons={fetchPokemons} />
        <SearchBar onSearch={setSearchTerm} />
        <PokemonList pokemons={pokemons} fetchPokemons={fetchPokemons} searchTerm={searchTerm}/>
      </>
    )
  )
}

export default Main;
