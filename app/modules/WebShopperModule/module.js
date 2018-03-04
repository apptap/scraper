/*
 * Definition of the base module. Base module contain some common components some one
 * may use in creating their own application. These components are not a core part of
 * BoilerplateJS, but available as samples.
 */
define(function(require) {

    // Load the dependencies
    var Boiler       = require('Boiler'),
        WebShopper   = require('WebShopper');

    // Definition of the base Module as an object, this is the return value of this AMD script
    return {

        initialize : function(parentContext) {
            //create module context by assiciating with the parent context
            var context = new Boiler.Context(parentContext);

            //the landing page should respond to the root URL, so let's use an URLController too
            var controller = new Boiler.UrlController($(".appcontent"));
            controller.addRoutes({
                "/" : new WebShopper(context)
            });
            controller.start();
        }

    };

});
