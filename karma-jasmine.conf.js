module.exports = function(config) {
  config.set({
    autoWatch: false,
    singleRun: true,
    basePath: '.',
    frameworks: ['jasmine','sinon'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/pi.js': ['coverage']
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },
    browsers: ['Firefox'],
    files: [ "src/*.js", "jasmine-tests/**.js" ]
  });
};
