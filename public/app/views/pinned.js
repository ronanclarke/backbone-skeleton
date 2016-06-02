define([
        'app',
        'views/pinned.item',
        'text!templates/pinned.html',
        'text!templates/pinned.empty.html'
    ],
    function (app, PinnedItemView, tmpl,tmplEmpty) {
        'use strict';

        var View = Backbone.Marionette.CollectionView.extend({
            template: _.template(tmpl),
            childView: PinnedItemView,

            emptyView: Marionette.ItemView.extend({
                tagName: "div",
                attributes:{
                    class: "row"
                },
                template: tmplEmpty
            }),

            initialize: function () {
                this.listenTo(this.options.controllerEvents, 'search:updated', this.render);
            }

        });

        return View;
    });