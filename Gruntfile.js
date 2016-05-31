

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
                    out: 'public/dist/out.min.js'
                }
            }


        },


    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('build', ['requirejs']);

};
