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

            //
            // adding this cursory collection definitions here cos in lazy hack mode
            //
            app.addInitializer(function () {

                ClassName = Backbone.Model.extend({
                    parse: function (response) {
                        response.enumItems = new EnumItems(response.enumItems, {parse: true});
                        return response;
                    }
                });

                EnumItem = Backbone.Model.extend({
                    parse: function (response) {
                        response.fieldList = new FieldList(response.fieldList)
                        return response;
                    }
                });

                EnumItems = Backbone.Collection.extend({
                    model: EnumItem
                });

                ClassNames = Backbone.Collection.extend({
                    model: ClassName
                });

                FieldItem = Backbone.Model.extend({});
                FieldList = Backbone.Collection.extend({
                    model: FieldItem
                });


            });

            app.addInitializer(function () {
                var data = window.data;


                var allData = new ClassNames(data, {parse: true});

                this.searchResults = allData;

                var pinnedData = new Backbone.Collection({model: EnumItem});
                pinnedData.reset();

                this.pinnedData = pinnedData;

                this.currentSearchTerm = "";
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