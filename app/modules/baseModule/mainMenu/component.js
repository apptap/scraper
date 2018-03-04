define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler'), 
        template = require('text!./view.html'),
        nls = require('i18n!./nls/resources'),
        cssPath = require('path!./style.css'),
        ViewModel = require('./viewmodel');


        var Component = function(moduleContext) {
                var vm, panel = null;
                return {
                        activate : function(parent) {
                                if (!panel) {
                                        panel = new Boiler.ViewTemplate(parent, template, nls);
                                        vm = new ViewModel(moduleContext);
                                        /* we use static method to attach the css as a separate link on head.
                                         * If we pass CSS as a text parameter to above constructor, that goes as a inline
                                         * CSS text on HTML, that makes the relative paths in CSS (images, etc) difficult to manage.
                                         */
                                        //Boiler.ViewTemplate.setStyleLink(cssPath);
                                        ko.applyBindings(vm, panel.getDomElement());
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
