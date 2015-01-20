module.exports = function(config) {
  config.set({
	autoWatch: false,
	singleRun: true,
    basePath: '.',
    frameworks: ['qunit','sinon'],
	reporters: ['progress', 'coverage'],
	preprocessors: {
		'src/pi.js': ['coverage'],
		'src/pi.lazyload.js': ['coverage']
    },
	coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
	browsers: ['Firefox'],
	files: [ "src/*.js", "tests/**.js" ]
  });
};
