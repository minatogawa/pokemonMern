// Navbar.js
import React from 'react';

const Navbar = () => {
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
      </div>
    </nav>
    
  );
};

export default Navbar;
