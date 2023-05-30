// Importamos React e o Hook useState do pacote 'react'.
import React, { useState } from 'react';

// Definimos nosso componente SearchBar, que recebe onSearch como prop.
// onSearch será uma função que será chamada sempre que o valor do input mudar.
const SearchBar = ({ onSearch }) => {
  // Usamos o Hook useState para criar uma variável de estado chamada 'search'
  // e uma função 'setSearch' para atualizá-la. O estado inicial é uma string vazia.
  const [search, setSearch] = useState("");

  // Definimos uma função 'handleSearch' que será chamada quando o valor do input mudar.
  // Esta função atualiza o estado 'search' e chama a função 'onSearch' passada como prop.
  const handleSearch = (event) => {
    setSearch(event.target.value);
    onSearch(event.target.value);
  };

  // Retornamos o JSX para renderizar nosso componente.
  // O input está dentro de uma div que utiliza classes do Bootstrap para 
  //centralizar o elemento e adicionar margem vertical.
  // O valor do input é ligado ao estado 'search', e a função 'handleSearch' 
  //é chamada sempre que o valor do input muda.
  return (
    <div className="my-4">
      <h2 className="text-center">Search Pokemon</h2>
      <div className="d-flex justify-content-center">
        <input 
          type="text" 
          placeholder="Search..." 
          value={search} 
          onChange={handleSearch} 
          className="form-control w-50"
        />
      </div>
    </div>
  );
};

// Exportamos nosso componente para que possa ser usado em outros arquivos.
export default SearchBar;
