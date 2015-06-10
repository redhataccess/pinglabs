/*jshint node:true, maxstatements:false*/

module.exports = function(grunt) {

    var MINJS = ~~grunt.option('minjs');
    var leaderboardProdUrl;

    // Automatically load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Show timing of each grunt task at the end of build
    require('time-grunt')(grunt);

    try {
        leaderboardProdUrl = require('./prod-config').leaderboardUrl;
    } catch (e) {
        leaderboardProdUrl = '/leaderboard/leaders.json';
    }

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Project configuration.
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'dist',
                    hostname: 'localhost',
                    keepalive: true,
                    open: true
                }
            }
        },

        babel: {
            options: {
                sourceMap: false,
                loose: true,
                modules: 'amd',
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: [
                        '**/*.js',
                        '!require.config.js',
                        '!lib/**/*',
                        '!leaderboard/**/*'
                    ],
                    dest: 'dist/',
                }]
            }
        },

        watch: {
            scripts: {
                files: ['src/**/*.js', '!src/require.config.js'],
                tasks: ['build:dev'],
                options: {
                    spawn: false,
                    atBegin: true,
                },
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['build:dev'],
                options: {
                    spawn: false,
                },
            },
            gruntfile: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true,
                },
            },
        },

        bowerRequirejs: {
            'merge-into-config': {
                rjsConfig: 'src/require.config.js',
                options: {
                    exclude: [],
                    transitive: true,
                }
            }
        },

        requirejs: {
            compile: {
                options: {
                    // All options:
                    // https://github.com/jrburke/r.js/blob/master/build/example.build.js

                    baseUrl                 : 'dist/',
                    name                    : 'app',
                    out                     : 'dist/bundle.js',
                    mainConfigFile          : 'dist/require.config.js',
                    optimize                : ['none', 'uglify2'][MINJS],
                    optimizeCss             : 'none',
                    keepBuildDir            : true,
                    allowSourceOverwrites   : true,
                    inlineText              : true,
                    preserveLicenseComments : false,
                    generateSourceMaps      : false,
                    wrapShim                : true,
                    skipModuleInsertion     : false,
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: [
                'src/**/*.js',
                'Gruntfile.js',
                '!src/lib/**/*',
            ],
        },

        copy: {
            'src-to-dist': {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'dist/',
                    src: '**/*'
                }]
            },
        },

        sync: {
            main: {
                files: [{
                    cwd: 'src',
                    src: [
                        '**'
                    ],
                    dest: 'dist'
                }],
                pretend: false,
                updateAndDelete: false,
                verbose: true
            }
        },

        clean: ['dist'],

        replace: {
            leaderboard_url: {
                src: 'dist/leaderboard/leaderboard.js',
                dest: 'dist/leaderboard/leaderboard.js',
                replacements: [{
                    from: '/leaderboard/leaders.json',
                    to: leaderboardProdUrl
                }]
            },
            play_url: {
                src: 'dist/states/play.js',
                dest: 'dist/states/play.js',
                replacements: [{
                    from: '/leaderboard/leaders.json',
                    to: leaderboardProdUrl
                }]
            }
        }

    });

    // Default task(s).
    grunt.registerTask('default', []);
    grunt.registerTask('lint', ['jshint:all']);

    grunt.registerTask('build', function (target) {
        var t = [];
        t.push('lint');
        // t.push('bowerRequirejs'); // this is now run from bower postinstall hook
        t.push('sync');
        t.push('babel');
        t.push('replace');
        if (target !== 'dev') {
            grunt.config.set('requirejs.compile.options.optimize', 'uglify2');
            t.push('requirejs');
        }
        return grunt.task.run(t);
    });

};
