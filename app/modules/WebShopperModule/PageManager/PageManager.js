define(function(require) {

  var PageReader    = require('PageReader'),
      PageClicker   = require('PageClicker'),
      PageTyper     = require('PageTyper'),
      Downloader    = require('Downloader'),
      FieldSelector = require('FieldSelector'),
      totalProductsFound = 0;

  function PageManager(moduleContext, webShopper) {

    this.downloader = new Downloader(moduleContext);
    this.webShopper = webShopper;
    var pageReader, fieldSelector, that = this;

    this.i = 0;

    moduleContext.listen("PAGE_DOWNLOADED_ACTIVITY", function(data) {

      that.i += 1;

      if(webShopper.autoMode === false) {

          console.log(that.i + " GOOD: PageManager: Giving " + data.url + " to a new FieldSelector");

          fieldSelector = new FieldSelector(moduleContext,data);

      } else {

          console.log(that.i + " GOOD: PageManager: Giving " + data.url + " to a new PageReader");
          pageReader = new PageReader(moduleContext, data).analyzePage();

      }
    });

    moduleContext.listen("PAGE_ANALYZED_ACTIVITY", function(productsFoundCount) {
      totalProductsFound += productsFoundCount;
    });
  }

  PageManager.prototype = {
      push : function(url) {
        this.downloader.download(url);
      },
      getProductsFoundCount : function() {
          return totalProductsFound;
      }
  };

  return PageManager;
});

