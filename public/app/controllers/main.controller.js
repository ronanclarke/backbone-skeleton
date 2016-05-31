define([
    'app',
    'views/results',
    'views/pinned',
    'views/search'
],
  function (app, ResultsView, PinnedView, SearchView) {
    'use strict';

    var Controller = Backbone.Marionette.Controller.extend({
        initialize : function (options) {
            options = options || {};
            
            _.extend(this, _.pick(options, ['region']));
            this.controllerEvents = _.extend({}, Backbone.Events);

            this.listenTo(this.controllerEvents, 'example:showSecondPage', this.showExample2);
        },

      start: function () {

        app.results.show(new ResultsView({
          controllerEvents: this.controllerEvents,
          collection: app.allData
            }));

        app.pinned.show(new PinnedView({
          controllerEvents: this.controllerEvents,
          collection: app.filteredData
        }));


        app.search.show(new SearchView({
          controllerEvents: this.controllerEvents,

        }));
        },

        showExample2 : function () {
          this.searchRegion.show(new Example2View());
        }

    });

    return Controller;
});