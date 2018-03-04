define(function (require) {
  var $ = require('jquery');
  var controller = require('./controller/scraper_controller');
  var model = require('./model/m1');
  var siteList = ["http://localhost/amazon.co.uk/1.html", "http://localhost/tesco/1.html"];

    //A fabricated API to show interaction of
    //common and specific pieces.
  controller.setModel(model);
  
  $(function () {
    controller.scrapeSites(siteList);
  });
});
