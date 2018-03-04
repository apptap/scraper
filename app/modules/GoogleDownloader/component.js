define(function(require) {

    //https://www.google.co.uk/search?safe=strict&dcr=0&source=hp&q=shoes&oq=shoes&gs_l=psy-ab.3..0i131k1j0l2j0i131k1.343.470.0.1578.5.2.0.0.0.0.615.615.5-1.1.0....0...1.1.64.psy-ab..4.1.607.roAkU0iMzAU

    // Load the dependencies
    var Boiler    = require('Boiler');

    var Component = function(moduleContext) {

        var panel = null, that = this;
        this.moduleContext = moduleContext;

        this.download = function(request) {
            $.ajax({
                type: "POST",
                url: "http://localhost/app/modules/downloader/download.php",
                data: {url: 'https://www.google.co.uk/search?q=' + request + '&oq=' + request },
                dataType: "json",
                cache: false,
                success: function (html) {
                    var msg = html.html.substr(0,100);
                    that.moduleContext.notify("SERP_DOWNLOADED_ACTIVITY", html.html);
                }
            });
        };
    };

    return Component;

});
