import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import SearchBar from './components/SearchBar'; // Não esqueça de importar o SearchBar aqui

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // novo estado para o termo de pesquisa

  const fetchPokemons = async () => {
    const res = await axios.get('http://localhost:5000/api/pokemons');
    setPokemons(res.data);
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <Navbar />
      
      <PokemonForm fetchPokemons={fetchPokemons} />
      <SearchBar onSearch={setSearchTerm} /> {/* Inclua a SearchBar aqui e passe a função setSearchTerm para ela */}
      <PokemonList pokemons={pokemons} fetchPokemons={fetchPokemons} searchTerm={searchTerm}/>
    </div>
  );
}

export default App;