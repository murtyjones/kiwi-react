module.exports = function (wallaby) {

  return {
    files: ['src/**/*.js', 'test/__mocks__/*.js', '!test/**/*.test.js'],

    tests: ['test/**/*.test.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    setup: function(wallaby) {
      let jestConfig = require('./package.json').jest;
      jestConfig.globals = { "__DEV__": true };
      wallaby.testFramework.configure(jestConfig);
    }
  };
};