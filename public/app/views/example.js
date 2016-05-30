define([
    'app',
    'views/example2',
    'text!templates/example.html'
],
function (app, Example2View, tmpl) {
    'use strict';

    var View = Backbone.Marionette.LayoutView.extend({

        template:  _.template(tmpl),

        events : {
            'click #exampleButton' : 'onClickExampleButton'
        },

        onClickExampleButton : function () {
            this.options.controllerEvents.trigger("example:showSecondPage");
        }

    });

    return View;
});