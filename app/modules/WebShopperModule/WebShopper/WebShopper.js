define(function(require) {


    /*
     *  Activities
     *  ----------
     *  URLS_READY
     *  SERP_DOWNLOADED
     *  PAGE_ANALYZED
     *  PAGE_DOWNLOADED
     *  TOGGLE_AUTO_MODE
    */



    // Load the dependencies
    var Boiler       = require('Boiler'),
        template     = require('text!./app/modules/WebShopperModule/WebShopper/view.html'),
        ViewModel    = require('./app/modules/WebShopperModule/WebShopper/viewmodel'),
        ItemManager  = require('ItemManager'),
        PageManager  = require('PageManager'),
        URLManager   = require('URLManager');

    var WebShopper = function(moduleContext) {

        var vm,
            panel    = null,
            that     = this;

        this.autoMode = false;

        /*
        * Enables the WebShopper component.
        * Displays GUI, toggles autoMode upon user click.
        * @method activate(parent)
        */
        this.activate = function (parent) {

            if (!panel) {
                panel = new Boiler.ViewTemplate(parent, template, null);
                vm = new ViewModel(that);
                ko.applyBindings(vm, panel.getDomElement());
            }

            moduleContext.listen("TOGGLE_AUTO_MODE_ACTIVITY", function(autoMode) {

                that.autoMode = autoMode;

                console.log("Auto mode toggled. autoMode = " + that.autoMode);
            });

        };

        /*
        * Main entry point to scraped, called by user clicking 'Go Shopping' button.
        * URL comes from the user too when they complete the text input on the GUI.
        * @method goShopping(request)
        * @param  @String request the URL to download.
        */
        this.goShopping = function(request) {

            var urlManager   = new URLManager(moduleContext),
                pageManager  = new PageManager(moduleContext, this),
                itemManager  = new ItemManager(),
                i;

            console.log('goShopping(): Starting run - Request: ' + request);

            // We now have a list of URLs to serve as starting points
            // for data extraction.
            moduleContext.listen("URLS_READY_ACTIVITY", function(uRLList) {

                for( i = 0; i < uRLList.length; i++ ) {

                    pageManager.push( uRLList[i] );
                    //pageManager.push( "https://www.idealista.com/en/alquiler-habitacion/barcelona-provincia/" );

                }

                console.log("(" + uRLList.length + ") URLS_READY_ACTIVITY:\n" + uRLList.join("\n"));

            });

            if( ! ( request.startsWith('http') || request.startsWith('www') ) ) {

                urlManager.getURLs(request); // Assume it's a query to pass to Google.

            } else {

                moduleContext.notify('URLS_READY_ACTIVITY', request.split(',')); // Assume it's a URL or URL list

            }
        };
    };

    return WebShopper;

});
