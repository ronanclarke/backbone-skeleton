define([
    'app'
],
function (app) {
    'use strict';

    var Router = Backbone.Router.extend({

        routes : function() {
            return {
                '' : 'initializeDefaultModule'
            }
        },

        initializeDefaultModule : function () {
            app.controllers.content.showExample();
        }

    });

    return Router;
});