define(function (require) {
  var $            = require('jquery');
  var jqueryloader = require('./controller/jqueryplugin');
  var util         = require('./controller/util_controller');
  //var product      = require('./controller/product_controller');
  var controller   = require('./controller/scraper_controller');
  var model        = require('./model/m1');
  controller.setModel(model);
  controller.setUtil(util);
});
