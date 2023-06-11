// App.js

import React from 'react';
import Navbar from './components/Navbar';
import { Auth0Provider } from '@auth0/auth0-react';
import Main from './components/Main'; // Importe o novo componente Main

function App() {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
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
