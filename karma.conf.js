module.exports = function(config) {
  config.set({
	autoWatch: false,
	singleRun: true,
    basePath: '.',
    frameworks: ['qunit','sinon'],
	reporters: ['progress', 'coverage'],
	preprocessors: {
		'src/*.js': ['coverage']
    },
	coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },
	browsers: ['Firefox'],
	files: [ 
    'src/pi.js',
    'src/html.js',
    'src/ajax.js',
    'src/events.js',
    'src/storage.js',
    'src/util.pubsub.js',
    'src/util.route.js',
    "tests/**.js" 
  ]
  });
};
