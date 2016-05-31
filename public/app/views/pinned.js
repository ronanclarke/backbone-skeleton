define([
    'app',
      'views/pinned.item',
      'text!templates/pinned.html'
],
  function (app, PinnedItemView, tmpl) {
    'use strict';

    var View = Backbone.Marionette.CollectionView.extend({
        template:  _.template(tmpl),
        childView: PinnedItemView

    });

    return View;
});