define(function(require) {

    // Load the dependencies
    var Boiler    = require('Boiler');

    var Component = function(moduleContext) {

        var panel = null, that = this;
        this.moduleContext = moduleContext;

        this.download = function(request) {

            this.request = request;
            var that = this;

            $.ajax({
                that: this,
                type: "GET",
                url: "http://localhost/app/modules/downloader/download.php",
                data: {url: that.request },
                dataType: "json",
                cache: false,
                complete: function (data) {
                    console.log("GOOD: Downloader.download(): " + data.statusText);
                    console.log("GOOD: Downloader.download(): " + data.responseText);
                    that.moduleContext.notify("PAGE_DOWNLOADED_ACTIVITY", data);
                }
            });            
        };
    };

    return Component;

});
