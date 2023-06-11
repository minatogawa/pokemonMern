import React from 'react';
import axios from 'axios';

const PokemonList = ({ pokemons, fetchPokemons, searchTerm, userSub }) => {

  const deletePokemon = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pokemons/${id}?userSub=${userSub}`);
      fetchPokemons();  //Recarregar a lista de pokemons após a exclusão
    } catch (error) {
      console.error('Houve um problema ao excluir o Pokémon:', error);
    }
  };
  

  // Filtramos os pokémons com base no termo de pesquisa antes de renderizá-los
  let filteredPokemons = pokemons.filter((pokemon) => {
    if (!pokemon.nome) return true; // Retorna true se o nome do Pokémon está indefinido
    return pokemon.nome.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='container'>
      <div className='row'>
      {filteredPokemons.map(pokemon => (
          <div className="col-sm-6 col-md-4 col-lg-2 mt-4" key={pokemon._id}>
            <div className="card">
              <img className="card-img-top" src={pokemon.spriteUrl} alt={pokemon.nome} />
              <div className="card-block">
                <h4 className="card-title">{pokemon.nome}</h4>
                <div className="card-text">
                  {pokemon.descricao}
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary btn-sm">Editar</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => deletePokemon(pokemon._id)}>Excluir</button>
              </div>
            </div>
          </div>
        ))
      }
      </div>
    </div>
  );
};
  


export default PokemonList;
