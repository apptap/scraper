define(function(require) {

  var PageReader    = require('PageReader'),
      PageClicker   = require('PageClicker'),
      PageTyper     = require('PageTyper'),
      Downloader    = require('ScraperDownloader'),
      Util    = require('Util'),
      Scraper = require('Scraper');

  function ScraperPageManager(moduleContext, node) {

    this.downloader = new Downloader(moduleContext);
    var pageReader, scraper, that = this;
    this.node       = node;

    moduleContext.listen("SCRAPER_PAGE_DOWNLOADED_ACTIVITY", function(data) {

          scraper = new Scraper(moduleContext, that, data);

          //scrape_elements(classname, target_site_frame_element.document);

          //nextPageInfo = Util.getNextPageInfo(node, target_site_frame_element.document);

    });

  }

  ScraperPageManager.prototype = {
      push : function(url, node) {
        this.downloader.download(url);
        this.node = node;
      }
  };

  return ScraperPageManager;
});

