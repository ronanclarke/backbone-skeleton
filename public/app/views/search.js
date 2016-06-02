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

        },

        events: {
            "keyup #searchBox": "searchTermEntered"
        },


        searchTermEntered: function(){

            var searchTerm = this.$("#searchBox").val();
            app.currentSearchTerm = searchTerm;
            this.options.controllerEvents.trigger('search:updated', searchTerm);
        }





    });

    return View;
});