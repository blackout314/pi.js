module.exports = function(config) {
  config.set({
	autoWatch: false,
	singleRun: true,
    basePath: '.',
    frameworks: ['qunit'],
	browsers: ['Firefox'],
	files: [ "pi.js", "tests/**.js" ]
  });
};
