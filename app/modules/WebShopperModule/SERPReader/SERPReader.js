define(function() {
  function SERPReader(moduleContext, html) {
    this.that                   = this;
    this.moduleContext          = moduleContext;
    this.html                   = html;
  }

  SERPReader.prototype = {
      analyzePage : function() {

          var links = [], bannedURLs = [ 'google', 'webcache', 'youtube', 'javascript', 'blogger'];
          var bannedURL = false, i = 0, link = '';

          function uniqueOnly(value, index, self)
          {
              return self.indexOf(value) === index;
          }

          $("a", $(this.html)).each(function() {
              link = $(this).attr('href');
              if( link !== undefined ) {
                  for(i=0;i<bannedURLs.length;i++) {
                      if(link.indexOf(bannedURLs[i]) !== -1) {
                          bannedURL = true;
                      }
                  }
                  if(!bannedURL){
                      links.push(link);
                  } else {
                      bannedURL = false;
                  }
              }
          });

          links = links.filter(uniqueOnly);

          this.moduleContext.notify('URL_FOUND_ACTIVITY', links);
      }
  };

  return SERPReader;
});

