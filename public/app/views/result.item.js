define([
    'app',
    'text!templates/result.item.html'
  ],
  function (app, tmpl) {
    'use strict';

    var View = Backbone.Marionette.ItemView.extend({


      template: function () {
        var data = {
          resultItem: this.model,
          id: this.model.get("ClassName").replace(/\./g, "_"),
          enumItems: this.model.get("enumItems")
        };

        return _.template(tmpl, data, {variable: 'data'});
      },

      tagName: "div",
      attributes: {
        class: "panel panel-default"
      },

      events: {
        "click button": "addToPinned"
      },

      addToPinned: function (e) {
        var enumName = ($(e.currentTarget).attr("id")).replace("btn_", "");
        _.each(this.model.get("enumItems"), function (item) {
          if (item.enumName == enumName) {
            app.filteredData.add(item);
            return;

          }
        });
      },

      initialize: function () {
        _.bindAll(this, 'template');
      }

    });

    return View;
  });