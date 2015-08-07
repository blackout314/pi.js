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
            dest: 'build/<%= pkg.version %>/<%= pkg.name %>.min.js'
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
                        src: ['build/<%= pkg.version %>/<%= pkg.name %>.min.js'],
                        dest: 'build/<%= pkg.version %>/'
                    }
                ]
          }
        },
    		karma: {
    			unit: {
    				configFile: "karma.conf.js"
    			},
          unitj: {
            configFile: "karma-jasmine.conf.js"
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
        },

        /* ---- jasmine prova ---- */
        jasmine: {
            test: {
                src: ['src/**/*.js'],
                options: {
                    specs: ['jasmine-tests/**/*.js']
                }
            }
        },
        watch: {
          test : {
            files: ['src/**/*.js', 'jasmine-tests/**/*.js'],
            tasks: 'jasmine:test'
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
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsinspect');

  // grunt-perfbudget (?)
  // jsfmt
  // fixmyjs

  // Default task(s).
  grunt.registerTask('default', ['banner', 'jshint', 'jsinspect', 'karma:unit', 'uglify', 'replace', 'coveralls']);
  grunt.registerTask('localbuild', ['banner', 'jshint', 'jsinspect', 'karma:unit', 'uglify', 'replace']);
  grunt.registerTask('check', ['banner', 'jshint', 'jsinspect', 'karma:unit']);
  grunt.registerTask('checkj', ['banner', 'jshint', 'jsinspect', 'karma:unitj']);

};
