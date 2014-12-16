module.exports = function(grunt) {

    // ---- Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		// ---- uglify
        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build: {
            src: '<%= pkg.name %>.js',
            dest: 'build/<%= pkg.name %>.min.js'
          }
        },
		// ---- jshint
		jshint: {
			all: {
				"src": "pi.js"
			}
		},
		// ---- replace
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
        },
		karma: {
			unit: {
				configFile: "karma.conf.js"
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['banner','jshint','karma','uglify','replace']);

};
