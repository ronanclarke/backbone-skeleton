define([
    'app',
    'views/example',
    'views/example2'
],
function (app, ExampleView, Example2View) {
    'use strict';

    var Controller = Backbone.Marionette.Controller.extend({
        initialize : function (options) {
            options = options || {};
            
            _.extend(this, _.pick(options, ['region']));
            this.controllerEvents = _.extend({}, Backbone.Events);

            this.listenTo(this.controllerEvents, 'example:showSecondPage', this.showExample2);
        },

        showExample : function () {
            this.region.show(new ExampleView({
                controllerEvents: this.controllerEvents
            }));
        },

        showExample2 : function () {
            this.region.show(new Example2View());
        }

    });

    return Controller;
});