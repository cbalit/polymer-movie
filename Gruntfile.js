'use strict';
var LIVERELOAD_PORT = 35729;
var path = require('path');


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            options: {
                nospawn: true,
                livereload: { liveCSS: false }
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    '<%= yeoman.app %>/elements/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/elements/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
                ]
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint']
            },
            styles: {
                files: [
                    '<%= yeoman.app %>/styles/{,*/}*.css',
                    '<%= yeoman.app %>/elements/{,*/}*.css'
                ],
                tasks: ['copy:styles', 'autoprefixer:server']
            }
        },
        express: {
            options: {
                port: 9000,
                hostname: '*',
                server: path.resolve('./server/server.js')
            },
            livereload: {
                options: {
                    livereload: true,
                    serverreload: false,
                    open: true,
                    bases: [path.resolve('./.tmp'), path.resolve(__dirname, '<%= yeoman.app %>')]
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },
        vulcanize: {
            default: {
                options: {
                    strip: true
                },
                files: {
                    '<%= yeoman.dist %>/elements/elements.vulcanized.html': [
                        '<%= yeoman.dist %>/elements/elements.html'
                    ]
                }
            }
        },
        // See this tutorial if you'd like to run PageSpeed
        // against localhost: http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/
        pagespeed: {
            options: {
                // By default, we use the PageSpeed Insights
                // free (no API key) tier. You can use a Google
                // Developer API key if you have one. See
                // http://goo.gl/RkN0vE for info
                nokey: true
            },
            // Update `url` below to the public URL for your site
            mobile: {
                options: {
                    url: "https://developers.google.com/web/fundamentals/",
                    locale: "en_GB",
                    strategy: "mobile",
                    threshold: 80
                }
            }
        }
    });

    grunt.registerTask('server', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('serve', [
        'clean:server',
        'express',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'connect:test'
    ]);



    grunt.registerTask('default', 'serve');
};
