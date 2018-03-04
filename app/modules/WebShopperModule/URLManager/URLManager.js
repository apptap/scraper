define(function(require) {

  var GoogleDownloader;

  function URLManager(moduleContext) {

    GoogleDownloader = require('GoogleDownloader');

    this.that             = this;
    this.uRLList          = [];
    this.moduleContext    = moduleContext;
    this.GoogleDownloader = new GoogleDownloader(this.moduleContext);

  }

  URLManager.prototype = {
      /* 
       * 1. Search Google for 'request'
       * 2. Parse result html from Google for links.
       * 3. Assign to this.uRLList.
       * 4. Send URLS_READY_ACTIVITY event.
       */
      getURLs : function(request) {

          var that = this;

          this.GoogleDownloader.download(request);

          this.moduleContext.listen("SERP_DOWNLOADED_ACTIVITY", function(html) {

              var links      = [],
                  bannedURLs = [ '/.*google.*/', '/webcache/', '/youtube/', '/javascript/', '/blogger/' ],
                  bannedURL = false,
                  i = 0,
                  link = '';

              console.log('URLManager.getURLs(): SERP_DOWNLOADED_ACTIVITY');

              function uniqueOnly(value, index, self)
              {
                  return self.indexOf(value) === index;
              }

              $("a", $(html)).each(function() {
                  link = $(this).attr('href');
                  if( link !== undefined ) {
                      if(link.indexOf('webcache') === -1){

                        for(i=0;i<bannedURLs.length;i++) {
                            if(link.match(bannedURLs[i]) !== null) {
                                bannedURL = true;
                            }
                        }

                        if(!bannedURL){
                            if(link.indexOf('/url?q=') !== -1){
                                links.push(decodeURIComponent(link.substr(7,link.indexOf('&')-7)));
                            } else if(link.match(/^(http[s]):\/\/.+/) !== null) {
                                links.push(link);
                            }
                        } else {
                            bannedURL = false;
                        }
                      }
                  }
              });

              that.uRLList = links.filter(uniqueOnly);

              that.moduleContext.notify('URLS_READY_ACTIVITY', that.uRLList);
          });
      }
  };

  return URLManager;
});

