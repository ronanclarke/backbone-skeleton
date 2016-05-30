require(['config.common'], function (commonConfig) {
    require([
        'app',
        'routers/router',
        'controllers/content.controller',
        'text!templates/layout.app.html'
    ],
    function (app, Router, ContentController, tmpl) {

        app.routers = {};

        app.addInitializer(function () {
            $('body').prepend(_.template(tmpl));

            app.addRegions({
                content : '#main'
            });
        });

        app.addInitializer(function () {
            app.controllers = {
                content : new ContentController({
                    region : app.content
                })
            };
        });

        app.addInitializer(function () {
            app.router = new Router();
            Backbone.history.start();
        });

        $(function () {
            app.start();
        });

    });

});