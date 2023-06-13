// jest.setup.js

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

global.window.crypto = {
    subtle: {
      digest: () => Promise.resolve('mocked_crypto'),
    },
};