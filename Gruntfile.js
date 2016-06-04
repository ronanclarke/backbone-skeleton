

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        'git-describe': {
            options: {
            },
            me: {}
        },
        requirejs: {
            options: {
                baseUrl: 'public/app',
                wrap: false,
                skipModuleInsertion: false,
                stubModules: ['text'],
                optimizeAllPluginResources: true,
                removeCombined: true,
                name: '../../node_modules/almond/almond',
                preserveLicenseComments: false,
                findNestedDependencies: true,
                inlineText: true,
                optimize: 'none'//['uglify2', 'none']
            },
            common: {
                options: {
                    mainConfigFile: ['public/app/config.common.js', 'public/app/config.common.js'],
                    include: ['init'],
                    out: 'public/dist/app.bundled.js'
                }
            }


        },

        less: {
            'public/dist/app.bundled.css': ['public/css/less/main.less']
        },

        uglify: {
            my_target: {
                files: {
                    'public/dist/app.min.js': ['public/dist/app.bundled.js']
                }
            }

        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/dist/app.min.css': ['public/dist/app.bundled.css']
                }
            }
        },

        clean: ['public/dist'],

        bower:{

            install: {
                options:{
                    targetDir: "public/libs/vendor"
                }
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory

            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('bundle', ['clean','bower','requirejs', 'less']);
    grunt.registerTask('build', ['bundle', 'uglify','cssmin']);


};
