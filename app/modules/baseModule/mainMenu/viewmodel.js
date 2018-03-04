define(function (require) {

    var ViewModel = function (moduleContext) {
        var that                    = this;
        this.b_autoScrapingMode     = false;
        this.autoScrapingMode       = ko.observable(false);

        this.toggleAutoScrapingMode = function() {
            that.b_autoScrapingMode  ? that.autoScrapingMode(false) : that.autoScrapingMode(true);
            that.b_autoScrapingMode  ? that.b_autoScrapingMode = false : that.b_autoScrapingMode = true;
            moduleContext.notify('TOGGLE_AUTO_MODE_ACTIVITY', that.b_autoScrapingMode);
        };
    };

    return ViewModel;
});
