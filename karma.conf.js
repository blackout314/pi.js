module.exports = function(config) {
  config.set({
	autoWatch: false,
	singleRun: true,
    basePath: '.',
    frameworks: ['qunit','sinon'],
	reporters: ['progress', 'coverage'],
	preprocessors: {
      'pi.js': ['coverage']
    },
	coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
	browsers: ['Firefox'],
	files: [ "pi.js", "tests/**.js" ]
  });
};
