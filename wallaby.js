module.exports = function(wallaby) {
  return {
    files: [
      'config/*.json',
      'src/**/*.js',
      'testing/helpers/**/*.js'
    ],

    tests: [
      'testing/src/**/*.js'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node',
      params: {
        env: 'NODE_ENV=unittest'
      }
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    setup: function() {
      require('./testing/helpers/Setup');
    }
  };
};
