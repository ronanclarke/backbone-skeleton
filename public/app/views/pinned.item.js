define([
        'app',
        'text!templates/pinned.item.html'
    ],
    function (app, tmpl) {
        'use strict';

        var View = Backbone.Marionette.LayoutView.extend({

            tagName: "div",
            attributes: {
                class: "col-md-4"
            },


            template: function () {

                var data = {
                    model: this.model
                };

                return _.template(tmpl)({data:data});
            },

            events: {
                "click .fa-times": "removeMe"
            },

            initialize: function () {
                _.bindAll(this, "template");
            },

            removeMe: function () {
                app.pinnedData.remove(this.model);

            }

        });

        return View;
    });