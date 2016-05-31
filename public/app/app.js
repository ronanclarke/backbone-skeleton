define([
        'marionette',
        'bootstrap'
    ],

    function () {
        'use strict';

        var Application = Backbone.Marionette.Application.extend({

        });

        var app = new Application({

        });

        window._app = app;

        //Params have to be an array of maximum 3 elements.
        app.commands.setHandler('goto', function (route, vent, params) {
            app.router.navigate(route);

            if (_.isFunction(params.slice)) {
                var args = params.slice();
                var a1 = args[0], a2 = args[1], a3 = args[2];

                switch (args.length) {
                    case 0: app.trigger(vent); break;
                    case 1: app.trigger(vent, a1); break;
                    case 2: app.trigger(vent, a1, a2); break;
                    case 3: app.trigger(vent, a1, a2, a3); break;
                    default: app.trigger(vent, params); break;
                }
            }

        });

        return app;
    });
