import React from 'react';
import Navbar from './components/Navbar';
import { Auth0Provider } from '@auth0/auth0-react';
import Main from './components/Main'; // Importe o novo componente Main

function App() {
  return (
    <Auth0Provider
      domain="dev-qmmy46zn7munz0no.us.auth0.com"
      clientId="7C1AHdZwOOdKMrVSq8LCaAjTl52glQpw"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <div className="App">
        <Navbar />
        <Main /> {/* Use o componente Main */}
      </div>
    </Auth0Provider>
  );
}

export default App;
