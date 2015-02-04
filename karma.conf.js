module.exports = function(config) {
  config.set({
	autoWatch: false,
	singleRun: true,
    basePath: '.',
    frameworks: ['qunit','sinon'],
	reporters: ['progress', 'coverage'],
	preprocessors: {
		'src/pi.js': ['coverage']
    },
	coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },
	browsers: ['Firefox'],
	files: [ "src/*.js", "tests/**.js" ]
  });
};
