define(function(require) {

    // Load the dependencies
    var Boiler     = require('Boiler'),
        template   = require('text!./view.html'),
        nls        = require('i18n!./nls/resources'),
        Controller = require('./controller'),
        cssPath    = require('path!./style.css');


    var Component = function(moduleContext) {

        var panel = null;

        return {
            activate : function(parent) {
                if (!panel) {
                    //create the theme selection component
                    panel = new Boiler.ViewTemplate(parent, template, null);

                    Boiler.ViewTemplate.setStyleLink(cssPath);

                    //create our controller that will handle user events
                    new Controller(moduleContext).init();
                }
                panel.show();
            },

            deactivate : function() {
                if (panel) {
                    panel.hide();
                }
            }
        };
    };

    return Component;

});
