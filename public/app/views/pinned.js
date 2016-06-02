define([
        'app',
        'views/pinned.item',
        'text!templates/pinned.html'
    ],
    function (app, PinnedItemView, tmpl) {
        'use strict';

        var View = Backbone.Marionette.CollectionView.extend({
            template: _.template(tmpl),
            childView: PinnedItemView,

            initialize: function () {
                this.listenTo(this.options.controllerEvents, 'search:updated', this.render);
            }

        });

        return View;
    });