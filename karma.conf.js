module.exports = function(config) {
  config.set({
	autoWatch: false,
	singleRun: true,
    basePath: '.',
    frameworks: ['qunit','sinon'],
	browsers: ['Firefox'],
	files: [ "pi.js", "tests/**.js" ]
  });
};
