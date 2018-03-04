define(function(require) {

    // Load the dependencies
    var Boiler    = require('Boiler');

    var Component = function(moduleContext, mode) {

        var panel = null, that = this;
        this.moduleContext = moduleContext;

        this.download = function(request) {

            this.request    = request;
            var that        = this;
			var dataString  = [];
			var notifyMsg   = [];
			var notifyArgs  = [];

			dataString['google']  = { url: 'https://www.google.co.uk/search?q=' + request + '&oq=' + request };
			dataString['plain']   = { url: that.request } ;
			dataString['scraper'] = { url: that.request };

			notifyMsg['google']  = "SERP_DOWNLOADED_ACTIVITY";
			notifyMsg['plain']   = "PAGE_DOWNLOADED_ACTIVITY";
			notifyMsg['scraper'] = "SCRAPER_PAGE_DOWNLOADED_ACTIVITY";

			notifyArgs['google']  = '';
			notifyArgs['plain']   = '';
			notifyArgs['scraper'] = '';


            $.ajax({
                that: this,
                type: "GET",
                url: "http://localhost/app/modules/downloader/download.php",
				data: dataString[mode],
                dataType: "json",
                cache: false,
                complete: function (data) {
                    console.log("GOOD: Downloader.download(): " + data.statusText);
                    console.log("GOOD: Downloader.download(): Mode: " + notifyMsg[mode]);
					that.moduleContext.notify(notifyMsg[mode], notifyArgs[mode]);
                }
            });
        };
    };

    return Component;

});
