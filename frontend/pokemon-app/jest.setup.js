// jest.setup.js

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

// Simulação do Auth0Client
jest.mock('@auth0/auth0-spa-js', () => ({
  Auth0Client: jest.fn().mockImplementation(() => ({
    handleRedirectCallback: jest.fn(),
    // Adicione quaisquer outros métodos que você está usando
  })),
}));
