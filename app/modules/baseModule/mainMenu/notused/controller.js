define(function(require) {

    // Load the dependencies
    var Boiler = require('Boiler');

        /**
         * @class Controller
         * @constructor
         * Here we create a simple controller class to act as the 'V' of our MVC design. We do not use
         * any thirdparty MVC library here, but use jQuery event handlers to respond to the users. 
         * This is just to demonstrate usign jQuery to create controller classes that carry logic, 
         * but we recommend a good MVX library such as knockoutjs for any non trivial development.
         * 
         * @param moduleContext {Boiler.Context}
         */
        var Controller = function(moduleContext) {

                var self = this;

                this.setOfflineMode = function (selection) {
                        alert('Selection: ' + selection);
                    if (true) {
                        $('#' + selection).css('outline','red dashed 2px');

                        //set style in header
                        //Boiler.ViewTemplate.setStyleLink(themes[selection], DICTIONARY_KEY);
                        //save in the local store
                        //localStorage.setItem(DICTIONARY_KEY, selection);
                    }
                };

                this.init = function() {
                        //if we have a stored theme setting lest use it OR use default
                        //var storedThemeKey = localStorage.getItem(DICTIONARY_KEY);
                        //if (!themes[storedThemeKey]) {
                                //if not locally stored, use the default
                        //        storedThemeKey = "bs";
                        //}

                        //lets use the panel to set style in header
                        //Boiler.ViewTemplate.setStyleLink(themes[storedThemeKey], DICTIONARY_KEY);

                        //lets handle the theme change event
                        $("#btn_offline_mode").bind("click", function() {
                                self.setOfflineMode(this.id);
                        });
                };

        };

        return Controller;
});
