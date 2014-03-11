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
      
    grunt.registerTask('banner', function() {
        grunt.log.writeln(' ' );
        grunt.log.writeln('       ____');
        grunt.log.writeln('   _||__|  |    ______   ________');
        grunt.log.writeln('  (        | |      | |      |');
        grunt.log.writeln('  /-()---() ~ ()--() ~ ()--()');
        grunt.log.writeln(' ' );
    });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-replace');

  // Default task(s).
  grunt.registerTask('default', ['banner','uglify','replace']);

};
