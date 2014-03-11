module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    replace: {
        dist: {
            options: {
                prefix:'',
                patterns: [
                    {
                        match: '/@@VERSION_NUMBER/g',
                        replacement: '<%= pkg.version %>',
                        expression: true
                    }
                ]
            },
            files: [
                { 
                    expand: true, 
                    flatten: true, 
                    src: ['build/<%= pkg.name %>.min.js'], 
                    dest: 'build/' 
                }
            ]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');

  // Default task(s).
  grunt.registerTask('default', ['uglify','replace']);

};
