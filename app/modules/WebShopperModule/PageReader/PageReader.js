define(function(require) {
  function PageReader(moduleContext, data) {
    var that                    = this;
    this.moduleContext          = moduleContext;
    this.html                   = data.html;
    this.url                    = data.url;
    this.util                   = require('Util');
  }

  PageReader.prototype = {

      getGCAList : function($html) {

          var elementsWithAPriceContained = this.getElementsWithAPrice($html),
              msg_shown_count             = 0,
              gcas                        = [],
              price1, price2,
              gca, elem1, elem2, numberOfPrices = null;


          if(elementsWithAPriceContained == null) {window.console.log("getGCAList(): " + that.url  + "Could not find a currency symbol, returning.");return null;}

          numberOfPrices = elementsWithAPriceContained.length;

          if(numberOfPrices === 0) {window.console.log("getGCAList(): " + that.url +" has no prices, returning.");return null;}

          for (elem1 = 0; elem1 < numberOfPrices; elem1++) {
              for (elem2 = 0; elem2 < numberOfPrices; elem2++) {
                  // Dont use the same element as both args to get common ancestor.
                  if(elem1 !== elem2) {
                      price1 = elementsWithAPriceContained[elem1];
                      price2 = elementsWithAPriceContained[elem2];
                      if(msg_shown_count < 1){
                          msg_shown_count++;
                      }
                      gca = this.util.getXPath2(this.util.get_common_ancestor(price1, price2)[0]);
                      if(gca == undefined) {
                          if(msg_shown_count < 2){
                              msg_shown_count++;
                          }
                          //gca = this.util.getXPathForElement(this.util.get_common_ancestor(price1, price2)[0], this.doc);
                          gca = this.util.getXPathForElement(this.util.get_common_ancestor(price1, price2)[0], $html[0]);
                      }
                      if(gca == undefined) {
                          if(msg_shown_count < 3){
                              msg_shown_count++;
                          }
                          gca = this.util.getXPath(this.util.get_common_ancestor(price1, price2)[0]);
                      }
                      if(gca == undefined) {
                          if(msg_shown_count < 4){
                              console.log("getGCAList(): " + that.url  + " can't find the common ancestor! Returning..." + price2);
                              return null;
                          }
                      }
                      gcas.push(gca);
                  }
              }
          }
          return gcas;
      },

      getElementsWithAPrice : function($container) {

          // Get all leaf nodes containing a currency symbol
          //var priceRegex    = /(?:\n|\s*)?(US)*(?:\s*)?[$£](?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?((?:\s*)?-(?:\s*)?([$£])?(?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?)?(?:\s*)?(\/)?(?:\s*)?(each|kg|piece|p[cmw]m?)?/igm;
          var priceRegex    = /^(?:\s*)?Â?£?(?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?(?:\s*)?(\/)?(?:\s*)?(each|kg|piece|p[cmw]m?)?$/ig;
          var $priceCandidateNodes;
          var isCommentNode = false;

          $priceCandidateNodes = $(':contains(£)', $container).contents().filter(function() {

              if(this.nodeType === 3){ // Accept text nodes.

                  isCommentNode = ($(this).parent()[0].nodeType === 8);

                  if (! isCommentNode ) { // Reject comment nodes.

                      if($(this).text().match(priceRegex) !== null) {

                          //$(this).parent().css('outline','green dashed 2px');

                          return true;

                      }
                  }
              }

              return false;

          });

          if ($priceCandidateNodes.jquery) {
              return $priceCandidateNodes;
          } // if ($priceCandidateNodes.jquery)

          window.console.log("getElementsWithAPrice(): " + url + ": Could not find a currency symbol, returning.");
          return null;
      }, // getElementsWithAPrice

      getProductsContainer : function($html) {
          var highestVal                  = 0,
              i                           = 0,
              compressed                  = null,
              currVal                     = null,
              prevVal                     = null,
              xpath                       = null,
              elem                        = null,
              gCAList                     = null;
              that                        = this;

          /* Counts the number of occurences of the same array element
          * value within parameter array 'original'.
          *
          * Returns a smaller array of objects with two members: -
          *
          * value: the original array element value
          * count: the number of times it was found in array
          * parameter 'original'.
          */

          gCAList    = this.getGCAList($html);

          if(gCAList === null) {
              return null;
          }

          compressed = this.util.compressArray(gCAList);

          if(compressed === null) {
              console.log("getProductsContainer(): compressed === null! returning...");
              return null;
          }

          /*
          * Assign what we hope is the product containers XPath to xpath.
          * We guess the container based upon how many times it is cited
          * as a common ancestor.*/
          if(compressed.length > 1) {
              for(i = 0; i < compressed.length - 1; i++) {
                  prevVal = compressed[i].count;
                  currVal = compressed[i+1].count;

                  if((currVal > highestVal) | (prevVal > highestVal)) {
                      if(currVal > prevVal) {
                          highestVal = currVal;
                          xpath = compressed[i+1].value;
                      }
                      else if(currVal < prevVal) {
                          highestVal = prevVal;
                          xpath = compressed[i].value;
                      }
                  }
              }
          } else {

              // Only one ancestor on the whole page found.
              // If it's defined then use it, else we can't proceed
              // without the XPath to the product container.

              console.log("getProductsContainer(): " + that.url + ": compressed[]: " + compressed);

              if(compressed[0] == undefined) {

                  console.log("getProductsContainer(): " + that.url + ": compressed[0] == undefined.\n" + "getProductsContainer(): can't continue without a product container!");

                  return null;

              } else {

                  highestVal = compressed[0].count;

                  xpath = compressed[0].value;
              }
          }

          console.log('URL: ' + that.url + ": Products Container: " +  xpath );

          return $html.xpathEvaluate( xpath );

      }, // getProductsContainer($html)

      pageContainsPrice : function($html) {

          var $pageTextCopy = $($html[0].body).clone();
          var priceRegex    =   /(?:\n|\s*)?(US)*(?:\s*)?[$£](?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?((?:\s*)?-(?:\s*)?([$£])?(?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?)?(?:\s*)?(\/)?(?:\s*)?(each|kg|piece|p[cmw]m?)?/igm;
          var i             = 0;

          //Of course you have to trim duplicated blank spaces.
          $pageTextCopy.each(function( index ) {
              $( this ).append(' ');
          });

          //Of course you have to trim duplicated blank spaces.
          var str = $pageTextCopy.text().replace(/\s\s+/g, ' ');

          $pageTextCopy.text(str);

          var hasAPrice = str.match(priceRegex);

          if (hasAPrice !== null) {
              return true;
          }

          return false;

      }, // pageContainsPrice($html)

      analyzePage : function() {

          var url           = new URL(this.url);
          var bfURL         = document.location.href;
          var html_page     = this.html;
          var that          = this;
          var TextField     = require('TextField');
          var Product       = require('Product');
          var textField     = null;
          var product       = null;
          var textFieldList = [];
          var priceFound    = false;
          var $productHTML  = $(this);
          var isCommentNode = false;
          var newURLStr;
          var priceRegex    = /(?:\n|\s*)?(US)*(?:\s*)?[$£](?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?((?:\s*)?-(?:\s*)?([$£])?(?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?)?(?:\s*)?(\/)?(?:\s*)?(each|kg|piece|p[cmw]m?)?/igm;
          var productList   = [];
          var productNum    = 0;
          var fieldNum      = 0;
          var txt;
          var charCount;
          var wordCount;
          var j;
          var productText;
          var $textNode;

          // add <base> to the page to point to our local css, images.
          //newURLStr = "<head>\n<base href='" + bfURL + "app/modules/downloader/" + url.host + "/' />\n";
          //html_page = html_page.replace("<head>", newURLStr);

          // Create $html, a jQuery object
          $html = $(new DOMParser().parseFromString(html_page, "text/html"));

          if(!that.pageContainsPrice($html)) {
              return null;
          }

          this.productsContainer = that.getProductsContainer($html);

          if(this.productsContainer === null){
                  console.log("downloadPage():" + url + ":  I can't read the page or there's nothing interesting on it.");
                  return null;
          }

          // Mark the product grid red
          $(this.productsContainer).css('outline','red dashed 2px');

          // Process each product or (unwanted) advert
          $(this.productsContainer).children().each(function(i) {

              textField     = null;
              product       = null;
              textFieldList = [];
              priceFound    = false;
              $productHTML  = $(this);
              isCommentNode = false;


              // Mark the product yellow
              $productHTML.css('outline','yellow solid 2px');

              $("div,a,p,h1,strong,em,span", $productHTML[0]).contents().filter(function() {

                  $textNode = $(this);

                  // We're looking for text nodes
                  if(this.nodeType == Node.TEXT_NODE) {

                      // But not comment nodes
                      isCommentNode = ($textNode.parent()[0].nodeType === 8); 
                      if ( ! isCommentNode ) {

                          fieldNum++;

                          $textNode.parent().css('outline','grey solid 2px');

                          txt = $.trim($textNode.text());
                          charCount = txt.length;
                          wordCount = txt.replace( /[^\w ]/g, "" ).split( /\s+/ ).length;

                          // Ignore empty fields
                          if(charCount !== 0) {

                              textField = new TextField($textNode.parent()[0],charCount, wordCount);
                              textFieldList.push(textField);

                              if($textNode.text().match(priceRegex) !== null){
                                  $textNode.parent().css('outline','pink dashed 2px');
                                  priceFound = true;
                              }
                          }
                      } else {
                          alert("Matched products grid, skipping");
                      }
                  }
              }); // Each TextField

              fieldNum = 0;

              if(priceFound === true) {

                  // Make a new product to store the info we will scrape
                  product = new Product();

                  productNum++;

                  textFieldList.sort(function (a, b) {
                      var aTop = a.top;
                      var bTop = b.top;
                      var aSize = a.fontSize;
                      var bSize = b.fontSize;
                      //console.log("aSize " + aSize + " | bSize " + bSize);
                      //console.log("aTop  " + aTop + " | bTop " + bTop);

                      if(aTop == bTop)
                      {
                          return (aSize < bSize) ? 1 : (aSize > bSize) ? -1 : 0;
                      }
                      else
                      {
                          return (aTop < bTop) ? -1 : 1;
                      }
                  });

                  textFieldList[0].fieldName = "Title";

                  textFieldList.sort(function (a, b) {
                      var aNumWords = a.numWords;
                      var bNumWords = b.numWords;

                      return (aNumWords < bNumWords) ? 1 : -1;
                  });

                  textFieldList[0].fieldName = "Description";

                  //console.log('Title Text: ' + textFieldList[0].jqObject.text());
                  product.textFieldList = textFieldList;
                  productList.push(product);
                  priceFound            = false;
                  productText           = productNum + ':' + url + "\n";

                  for(j = 0; j < textFieldList.length; j++) {
 
                      $textNode    = textFieldList[j].jqObject;
                      txt          = $textNode.text();
                      charCount    = txt.length;
                      wordCount    = txt.replace( /[^\w ]/g, "" ).split( /\s+/ ).length;

                      if(txt.length > 50) {

                          productText += productNum + ":" + j + " " + txt + "\n";

                      } else {

                          productText += productNum + " " + txt + "\n";
                      }
                  }

                  console.log(productText);
                  productText = '';

              } // Found Price === True

          }); // Each Product

          console.log("Found " + productList.length + " items");

          this.moduleContext.notify('PAGE_ANALYZED_ACTIVITY', productNum);

          productNum = 0;
      }
  };

  return PageReader;
});

