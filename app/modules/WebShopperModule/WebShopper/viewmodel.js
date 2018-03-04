define(function (require) {

    var ViewModel = function (webShopper) {

        this.webShopper = webShopper;

        this.goShopping = function(request) {
            this.webShopper.goShopping(request);
        };
    };

    return ViewModel;
});
