// jest.setup.js

const jsdom = require('jsdom');
const crypto = require('crypto-browserify');

const { JSDOM } = jsdom;

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

// Use crypto-browserify para fornecer uma implementação de window.crypto
global.window.crypto = crypto;
