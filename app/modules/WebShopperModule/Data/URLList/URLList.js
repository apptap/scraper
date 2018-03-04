define(function(require) {

  var URLList = function(moduleContext) {
    this.moduleContext = moduleContext;
    this.urlList = [];
  }

  URLList.prototype = {
      add : function(urlList) {
          this.urlList = urlList;
      }
  }

  return URLList;
});

