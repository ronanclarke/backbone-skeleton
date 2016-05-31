define([
    'app',
      'views/result.item',
      'text!templates/results.html'
],
  function (app, ResultItemView, tmpl) {
    'use strict';

      var View = Backbone.Marionette.CompositeView.extend({

          childViewContainer: '#classList',
          template: _.template(tmpl),
          childView: ResultItemView

    });

    return View;
});