module.exports = {
    // A list of paths to modules that run some code to configure or set up the testing environment before each test.
    setupFiles: ['./jest.setup.js'],
    
    // The test environment that will be used for testing
    testEnvironment: 'jsdom',
    
    globalSetup: () => {
        jsdom.env({
          crypto: true,
        });
    },
  };
  