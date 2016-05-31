define([
    'app',
    'text!templates/search.html'
],
function (app, tmpl) {
    'use strict';

    var View = Backbone.Marionette.LayoutView.extend({

        template:  _.template(tmpl),

        initialize : function () {

        },

        onRender : function () {

        }

    });

    return View;
});