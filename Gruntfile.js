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
            src: ['src/*.js'],
            dest: 'build/<%= pkg.name %>.min.js'
          }
        },
		// ---- jshint
		jshint: {
			all: {
				"src": ["src/*.js"]
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
		},
        coveralls: {
            options: {
                debug: true,
                coverageDir: 'coverage',
                dryRun: false,
                force: true,
                recursive: true
            }
        },
        jsinspect: {
            examples: {
                options: {
                    threshold:   30,
                    diff:        true,
                    identifiers: false,
                    failOnMatch: true,
                    suppress:    100,
                    reporter:    'default'
                },
                src: [
                    'src/**/*.js',
                    '!**/node_modules/**'
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
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsinspect');

  // Default task(s).
  grunt.registerTask('default', ['banner','jshint','karma','uglify','replace','jsinspect','coveralls']);
  grunt.registerTask('localbuild', ['banner','jshint','karma','uglify','replace','jsinspect']);
  grunt.registerTask('check', ['banner','jshint','jsinspect','karma']);

};
