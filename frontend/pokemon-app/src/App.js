import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import PokemonForm from './components/PokemonForm';
import SearchBar from './components/SearchBar'; // Não esqueça de importar o SearchBar aqui
import { Auth0Provider } from '@auth0/auth0-react';
// import LoginButton from './components/LoginButton'; // Importe aqui
// import LogoutButton from './components/LogoutButton'; // Importe aqui
// import Profile from './components/Profile'; // Importe aqui

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
    <Auth0Provider
      domain="dev-qmmy46zn7munz0no.us.auth0.com"
      clientId="7C1AHdZwOOdKMrVSq8LCaAjTl52glQpw"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <div className="App">
        <Navbar />
        <PokemonForm fetchPokemons={fetchPokemons} />
        <SearchBar onSearch={setSearchTerm} /> {/* Inclua a SearchBar aqui e passe a função setSearchTerm para ela */}
        <PokemonList pokemons={pokemons} fetchPokemons={fetchPokemons} searchTerm={searchTerm}/>
      </div>
    </Auth0Provider>
  );
}

export default App;