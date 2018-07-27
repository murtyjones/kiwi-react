module.exports = function (wallaby) {

  return {
    files: [
      'src/**/*.js',
      'test/__mocks__/*.js',
      'test/unitSetup.js',
      '!test/__tests__/unit/**/*.test.js'
    ],

    tests: [
      'test/__tests__/unit/**/*.test.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    setup: function(wallaby) {
      let jestConfig = require('./package.json')['jest-unit'];
      jestConfig.globals = { "__DEV__": true };
      wallaby.testFramework.configure(jestConfig);
    }
  };
};