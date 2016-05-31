require(['config.common'], function (commonConfig) {
    require([
        'app',
        'routers/router',
        'controllers/main.controller',
        'text!templates/layout.app.html',
        'data'
    ],
      function (app, Router, MainController, tmpl, Data) {

        app.routers = {};

        app.addInitializer(function () {
            $('body').prepend(_.template(tmpl));

            app.addRegions({
              results: '#resultsRegion',
              pinned: '#pinnedRegion',
              search: '#searchRegion'
            });
        });

        app.addInitializer(function () {
            app.controllers = {
              main: new MainController({
                region: app.main
                })
            };
        });

        app.addInitializer(function () {
          var data = window.data;
          console.log(data)
          var allData = new Backbone.Collection(data);
          this.allData = allData;
          var filteredData = new Backbone.Collection({});
          filteredData.reset()
          filteredData.add(allData.models[1].get("enumItems")[0]);
          filteredData.add(allData.models[1].get("enumItems")[1]);
          filteredData.add(allData.models[1].get("enumItems")[2]);
          filteredData.add(allData.models[1].get("enumItems")[3]);
          filteredData.add(allData.models[1].get("enumItems")[4]);
          this.filteredData = filteredData;
        });

        app.addInitializer(function () {
            app.router = new Router();
            Backbone.history.start();
        });

        $(function () {
            app.start();
        });

    });

});