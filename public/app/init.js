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

            ClinicCollection = Backbone.Collection.extend({
                url: "http://localhost/api/v3/suppliers/111647/clinics"
            });

            $.ajaxSetup({
                beforeSend:function(xhr){
                    xhr.setRequestHeader("X-WCC-SERVER-TO-SERVER-SECRET","OtErFBJaOW84etqj19nUhJYVdvAfM74N");
                }

            });
            var col = new ClinicCollection();
            col.fetch({
                done:function(){
                    console.log("done");
                }
            });

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