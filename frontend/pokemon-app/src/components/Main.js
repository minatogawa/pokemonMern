import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PokemonList from './PokemonList';
import PokemonForm from './PokemonForm';
import SearchBar from './SearchBar';
import { useAuth0 } from "@auth0/auth0-react";

const Main = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  const { isAuthenticated, user } = useAuth0();

  const fetchPokemons = useCallback(async () => {
    if (user) {
      try {
        const res = await axios.get(`http://localhost:5000/api/pokemons?userSub=${user.sub}`);
        setPokemons(res.data);
      } catch (error) {
        console.error('Houve um problema ao obter os Pokémon:', error);
      }
    }
  }, [user]);
  
  useEffect(() => {
    fetchPokemons();
  }, [user, fetchPokemons]);

  return (
    isAuthenticated && (
      <>
        <PokemonForm fetchPokemons={fetchPokemons} />
        <SearchBar onSearch={setSearchTerm} />
        <PokemonList pokemons={pokemons} fetchPokemons={fetchPokemons} searchTerm={searchTerm} userSub={user.sub} />
      </>
    )
  )
}

export default Main;
