// setupTests.js
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const crypto = require('crypto');

window.crypto = {
  subtle: crypto.webcrypto.subtle,
  getRandomValues: function(array) {
    return crypto.randomFillSync(array);
  },
};
