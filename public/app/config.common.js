require.config({
    "waitSeconds": 60,
    paths: {
        'app': 'app',
        'library': '../libs/wc',
        'custom': '../libs/custom',
        'backbone': '../libs/vendor/backbone/backbone',
        'bootstrap': '../libs/vendor/bootstrap/dist/js/bootstrap.min',
        'underscore': '../libs/vendor/underscore/underscore',
        'jquery': '../libs/vendor/jquery/jquery',
        'text': '../libs/vendor/requirejs-text/text',
        'marionette': '../libs/vendor/marionette/lib/backbone.marionette',
        'backbone.subroute': '../libs/vendor/backbone.subroute/backbone.subroute',
        'less': '../libs/vendor/less/dist/less-1.3.3'
    },

    wrapShim: true,

    include: [
        'app'
    ],

    shim: {

        app : {
            deps: ['backbone', 'bootstrap', 'marionette'],
            exports: 'app'
        },

        jquery : {
            exports: 'jQuery'
        },

        jqueryui : {
            deps: ['jquery']
        },

        underscore : {
            exports: '_'
        },

        backbone : {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        marionette : {
            deps: ['underscore', 'jquery', 'backbone'],
            exports: 'Backbone.Marionette'
        },

        bootstrap : {
            deps: ['jquery']
        }

    }
});
