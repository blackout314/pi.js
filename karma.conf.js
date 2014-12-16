module.exports = function(config) {
  config.set({
	autoWatch: false,
	singleRun: true,
    basePath: '.',
    frameworks: ['qunit'],
	browsers: ['PhantomJS'],
	files: [ "pi.js", "tests/**.js" ]
  });
};
