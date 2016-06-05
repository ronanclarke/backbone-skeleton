require(['config.common'], function (commonConfig) {
    require([
        'app',
        'routers/router',
        'controllers/content.controller',
        'text!templates/layout.app.html'
    ],
    function (app, Router, ContentController, tmpl) {

        app.routers = {};

        app.addInitializer(function () {
            $('body').prepend(_.template(tmpl));

            app.addRegions({
                content : '#main'
            });
        });

        app.addInitializer(function () {
            app.controllers = {
                content : new ContentController({
                    region : app.content
                })
            };
        });

        app.addInitializer(function(){

            var host = "095a4233.ngrok.io";


            // special header to temporarily by-pass security for testing
            $.ajaxSetup({
                beforeSend:function(xhr){
                    xhr.setRequestHeader("X-WCC-SERVER-TO-SERVER-SECRET","OtErFBJaOW84etqj19nUhJYVdvAfM74N");
                }

            });

            // example clinics collection
            ClinicCollection = Backbone.Collection.extend({
                url: "http://" + host + "/api/v3/suppliers/19557/clinics"
            });
            new ClinicCollection().fetch();

            // example staff collection
            StaffCollection = Backbone.Collection.extend({
                url: "http://" + host + "/api/v3/suppliers/19557/staff"
            });
            new StaffCollection().fetch();

            // example treatments (clinics-procedures) collection
            TreatmentsCollection = Backbone.Collection.extend({
                url: "http://" + host + "/api/v3/clinics/30872/treatments"
            });
            new TreatmentsCollection().fetch();




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