/*
 * Definition of the base module. Base module contain some common components some one may use in
 * creating own application. These components are not a core part of BoilerplateJS, but available as samples.
 */
define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'),
        MainMenuComponent = require('./mainMenu/component'),
        LanguageComponent = require('./language/component'),
        LoginComponent = require('./login/component'),
        ThemeComponent = require('./theme/component'),
        FooterComponent = require('./footer/component');

    // Definition of the base Module as an object, this is the return value of this AMD script
    return {
        
        initialize : function(parentContext) {
            //create module context by assiciating with the parent context
            var context = new Boiler.Context(parentContext);

            //scoped DomController that will be effective only on $('#page-content')
            var controller = new Boiler.DomController($('#page-content'));
            //add routes with DOM node selector queries and relevant components
            controller.addRoutes({
                ".main-menu" : new MainMenuComponent(context),
                ".language" : new LanguageComponent(context),
                ".login" : new LoginComponent(context),
                ".theme" : new ThemeComponent(context),
                ".footer" : new FooterComponent(context)
            });
            controller.start();

        }
    }
});
