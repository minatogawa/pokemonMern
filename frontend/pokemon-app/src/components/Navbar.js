// Navbar.js
import React from 'react';

import { useAuth0 } from "@auth0/auth0-react";

import Login from './Login'; // Certifique-se de que os caminhos dos imports estão corretos
import Logout from './Logout';
import Profile from './Profile';

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="https://www.globo.com/">Pokémon App</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="https://www.globo.com/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.globo.com/">Link</a>
            </li>
          </ul>
        </div>
        <div>
          {isAuthenticated ? (
            <>
              <Profile /> {/* Mostra as informações do usuário autenticado */}
              <Logout /> {/* Mostra o botão de logout quando o usuário está autenticado */}
            </>
          ) : (
            <Login /> /* Mostra o botão de login quando o usuário não está autenticado */
          )}
        </div>
      </div>
    </nav>
    
  );
};

export default Navbar;
