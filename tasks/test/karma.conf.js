module.exports = function(config) {

  var saucelabsBrowsers = require('./saucelabs-browsers.json').browsers,
      browsers = ['PhantomJS'];

  // run the tests only on the saucelabs browsers
  if (process.env.SAUCELABS) {
    browsers = Object.keys(saucelabsBrowsers);
  }

  config.set({
      basePath: '../../',
      autoWatch: true,
      frameworks: ['mocha'],
      plugins: [
          'karma-mocha',
          'karma-coverage',
          'karma-phantomjs-launcher',
          'karma-sauce-launcher'
      ],
      sauceLabs: {
        build: process.env.TRAVIS_JOB_ID,
        testname: process.env.LIBRARY_NAME
      },
      browserNoActivityTimeout: 120000,
      customLaunchers: saucelabsBrowsers,
      files: [
          'node_modules/mocha/mocha.js',
          'node_modules/chai/chai.js',
          'node_modules/sinon/lib/sinon.js',
          'node_modules/sinon-chai/lib/sinon-chai.js',
          'node_modules/babel-core/external-helpers.js',
          'dist/' + process.env.LIBRARY_NAME + '.js',
          'test/specs/*.js',
          'test/runner.js'
      ],
      browsers: browsers,
      reporters: ['progress', 'coverage'],
      preprocessors: {
          '../dist/*': ['coverage']
      },
      coverageReporter: {
          dir: './coverage/'
      },
      singleRun: true
  });
};
