/*
 * What's Important
 * ----------------
 *
 *   
 * Life
 *   Family Life
 *     Bugs or Death by prolonged exposure to unnatural chemicals
 *   Own Life
 *
 * Health
 *   Family Health
 *     Threats To Family
 *       Boys Kidney Better Health
 *         Get the best care available
 *           Pay for that care
 *           Study most beneficial food and drink
 *           Decide if surgery is acceptable
 *       Mothers Eyesight Better Health
 *       George Not Mixing
 *   Own Health
 *
 * Liberty
*/

/*
 *
 * Sequence
 *
 * Inform what URLs to use
 * Download first URL
 * Either use a local HTML file or a JS string
 *
 *
 * User clicks "Get Deals" button.
 * getDeals -> downloadPage -> scrapePage -> getProductsContainer -> getGCAList ->
 * getElementsWithAPrice -> validateContainerHighlightChildElems -> filterPrices -> scrapeProducts
 *
 * <li data-product-id="257351069" class="product clearfix expandedClear" id="yui_3_13_0_1_1493999562739_531">
 *   <div class="desc" id="yui_3_13_0_1_1493999562739_1131">
 *     <h2 id="yui_3_13_0_1_1493999562739_1130"><a href="/groceries/product/details/?id=257351069" id="yui_3_13_0_1_1493999562739_1129"><span class="image" id="yui_3_13_0_1_1493999562739_1128"><img height="110" width="110" alt="" id="product_257351069" title="Tesco Multivitamins Plus Cod Liver Oil X 90 - view full details" src="https://img.tesco.com/Groceries/pi/649/5051008158649/IDShot_110x110.jpg"><span class="promoNew" id="yui_3_13_0_1_1493999562739_1127"><img src="https://ui.tescoassets.com/groceries/UIAssets/I/../Compressed/I_636286237635383043/Sites/Retail/Superstore/Online/Product/plpOfferSash.png" alt="Offer" id="yui_3_13_0_1_1493999562739_1126"></span><!----></span><span data-title="true">Tesco Multivitamins Plus Cod Liver Oil X 90</span></a></h2>
 *     <div class="descContentGrid">
 *       <div class="promo">
 *         <a data-product-id="257351069" href="/groceries/specialoffers/specialofferdetail/?promoId=A31323366" class="promotionAlternatives" title="Any 3 for 2 Cheapest Product Free - all products for this offer"><em>Any 3 for 2 Cheapest Product Free</em></a><span class="promoDate">Offer valid for delivery from 5/3/2014</span>
 *       </div>
 *     </div>
 *   </div>
 *   <div class="quantityWrapper" id="yui_3_13_0_1_1493999562739_1134">
 *     <!---->
 *     <div class="content addToBasket" id="yui_3_13_0_1_1493999562739_1133">
 *       <p class="price"><span class="linePrice">£3.75</span><span class="linePriceAbbr">(£0.04/each)</span></p>
 *       <h4 class="hide">Add to basket</h4>
 *       <form method="post" class="productListForm" autocomplete="off" data-product-id="257351069" id="fBrowse-257351069-6" action="https://www.tesco.com/groceries/product/search/default.aspx?searchBox=essential+oils&amp;newSort=true&amp;search=Search">
 *         <input type="text" class="rm"><input type="hidden" name="formName" value="fBrowse"><input type="hidden" name="pageName" value="Tesco.Com.Applications.Retail.Superstore.Online.Pages.Product.Search.Default"><input type="hidden" name="__fd" value="cGJvcHRmbj1mQmFza2V0JTQwJTNiZlNlYXJjaCUzYmZOb3RlcGFkJTQwJTNiZkJyb3dzZSU0MCUzYiU0MCUzYiU0MCUzYiU0MCUzYiU0MCUzYg=="><!--[if IE]><!--><input type="text" disabled="disabled" size="1" class="hide"><!--<![endif]-->
 *         <fieldset class="addToBasket">
 *           <label for="qty-257351069-3">Quantity</label>
 *           <div data-product-id="257351069" class="pd decrement" title="Decrease quantity">
 *             <!---->
 *           </div>
 *           <input id="qty-257351069-3" name="qty-257351069" value="1" class="textbox quantity" data-product-id="257351069" maxlength="4">
 *           <div data-product-id="257351069" class="pi increment" title="Increase quantity">
 *             <!---->
 *           </div>
 *           <input value="Add" data-product-id="257351069" name="add-257351069" type="submit" class="submit pa hd rounded addToBasketButton" alt="Add to basket">
 *         </fieldset>
 *       </form>
 *       <div class="restOfShelf" id="yui_3_13_0_1_1493999562739_1132">
 *         <a href="https://www.tesco.com/groceries/product/browse/default.aspx?searchBox=essential+oils&amp;newSort=true&amp;search=Search&amp;N=4293437704" title="Multivitamins Tablets">Rest of <span class="hide">Multivitamins Tablets</span> shelf</a>
 *       </div>
 *       <!---->
 *       <div class="allMessages">
 *         <!---->
 *         <!---->
 *       </div>
 *       <p class="productStatus">
 *         <!---->
 *       </p>
 *       <!---->
 *     </div>
 *   </div>
 *   <!---->
 * </li>
 *
 * User can view items by: -
 *
 * 1. Domain (all things the site is offering)
 * 2. URL (we assume the URL is part of a series of pages and we scrape them all)
 * 3. Category (items from any URL described by this category.)
 * 4. Search Phrase (items from any URL described by this search phrase.)
 * 5. Saved set of URLs
 * 6. Saved set of items (current method used for development)
 *
 * Target Data Selection
 *
 * Target data selection can be achieved: -
 *
 * 1. Automatically
 * 2. Manually
 * 3. Combination
 *
 * Automatic Search
 *
 * The program retrieves data matching a known format
 * such as price, buy button/link, product photo
 * and description text from the product grid structure
 * with the most products contained that it finds on a page.
 *
 * Objects in the system
 * ---------------------
 *
 * Application
 * SiteFinder
 * PageFinder
 * ProductsGridFinder
 * ProductFinder
 * ProductDetailFinder
 * ProductDetailFinder.scanProductFromTopToBottom
 * ProductDetailFinder.countRows(){
 *
 *   var elem_offset_from_top = null;
 *
 *   $(product).contents().each(function() {
 *
 *     elem_offset_from_top = $(this).position().top;
 *
 *
 *
 *   });
 *
 *
 *
 * }
 * ProductDetailFinder.countRows
 * Display
 *
 *-------------------------------------------
 * Data Finding Process
 *
 * What can be derived or ascertained from a 
 * plain text representation of the HTML: -
 *
 * Derived
 * -------
 * Ascertained
 * -----------
 * 1. That there are prices on the page, so
 *    confirming the page is worthy of further
 *    investigation.
 *
 * 2. What those prices are. But not what details
 *    relate to each price. Armed with the
 *    prices unobscured by HTML tags a new
 *    way of searching for the item details
 *    becomes possible.
 *
 *    1. Find all visible elements.
 *
 *    2. Find all elements containing the first
 *       char of the first price found.(after 
 *       price has whitespace removed.)
 *
 *    $('contains:"firstCharOfPrice"')
 *
 *    3. While the price has remaining chars
 *       unchecked, compare next char of.
 *       price previously found in raw
 *       text with next char of 
 *       current element text.
 *
 *    4. If equal, goto step 3.
 *
 *    5. If unequal, check if is a '<', 
 *       whitespace, or newline.
 *
 *    6. If so, disregard those chars
 *       or the tag and read ahead
 *       then goto step 3.
 *
 *    7. If not, we now know that the current char of the price
 *       being compared has not been found and can check
 *       the next element from step 2.
 *-------------------------------------------
*/

define(['jquery', './Product', 'bootstrap', 'jquery.xpath'], function ($, Product) {
  'use strict';

  // Constructor/Factory function.
  function controllerBase(id) {
    this.id             = id;
    this.util           = null;
    this.currentProduct = null;
    this.data           = null;
    this.debug          = true;
    this.doc            = null;
    this.i              = 0;
    this.id_of_element_clicked = null;
    this.iframe         = document.getElementsByTagName('iframe')[0];
    this.productContainer = null,
    this.productFieldList = {
      product_description: null,
      product_price: null,
      product_photo: null,
      product_photo_xpath: null,
      product_buy_link_tagname: null,
      product_buy_link_type: null,
      product_buy_link_id: null,
      product_quantity: null,
      product_quantity_inc: null,
      product_quantity_dec: null,
      product_next_page_link_tagname: null,
      product_next_page_link_type: null,
      product_next_page_link_id: null,
      product_next_page_link_href: null   
    };
    this.products       = [];
    
    //      "https://www.tesco.com/groceries/product/browse/default.aspx?N=4294701775&Ne=4294793660",

    this.siteList       = [
      "http://www.made-in-china.com/productdirectory.do?word=led&subaction=hunt&style=b&mode=and&comProvince=nolimit&order=0&isOpenCorrection=1&code=3005010000&log_from=1",
      "http://www.friday-ad.co.uk/uk/property/for-rent/?keywords=rent+a+flat",
      "https://www.spareroom.co.uk/flatshare/?search_id=476882647&",
      "http://cgclighting.en.made-in-china.com/product/LCQnXiYSHfkK/China-Outdoor-High-Power-Flood-Light-Rechargeable-LED-Worklight.html",
      "https://www.blablacar.co.uk/search?fn=London&fc=51.507351%7C-0.127758&fcc=GB&fp=0&tn=Barcelona&tc=41.385064%7C2.173403&tcc=ES&tp=0",
      "https://www.tesco.com/groceries/product/browse/default.aspx?N=4292233936&Ne=4294793660",
      "https://www.zalando.co.uk/mens-shoes-trainers/",
      "http://localhost/c/components/capacitors.html",
      "http://localhost/alibaba.com/1.html",
      "http://localhost/zalando/product_page_1.html",
      "http://localhost/friday-ad.co.uk/Property_for_Rent/1.html",
      "http://localhost/fiverr.co.uk/1.html"
    ];

    var that = this;

    $('#get_deals').click(function(){ that.getDeals(); });

    // When a field is clicked, colour it and untick.
    // Remove colour from previous field clicked.
    $('#product_price, #product_photo, #product_description, #product_quantity, #product_quantity_inc, #product_quantity_dec, #product_buy_link, #product_next_page_link').click(function(event) {

      var doc = that.iframe.contentWindow.document,
        el  = null,
        xp  = '',
        i   = 0;
        
      that.id_of_element_clicked = event.target.id;

      // Untick this list item.
      $('> span',this).css('display','none');

      // Color it red.
      $(this).css('background-color','red');

      // Colour other list items different to this one.
      $(this).siblings("li").css("backgroundColor", "white");

      /*
      * Unselect/remove border from each product photo on the page.
      */

      i = 0;

      that.productsContainer.children().each(function() {

        switch(that.id_of_element_clicked) {
        case "product_description":
          if(that.products[i] !== undefined) {
            xp = that.products[i].xp_title_long;
          }

          break;
        case "product_price":

          if(that.products[i] !== undefined) {
            xp = that.products[i].xp_price_long;
          }

          break;
        case "product_photo":
          if(that.products[i] !== undefined) {
            xp = that.products[i].xp_image_long;
          }

          break;
        case "product_buy_link":
          xp = that.util.getXPathForElement(this, doc) + that.products[i].buylink_xpath;
          break;
        case "product_quantity":
          xp = that.util.getXPathForElement(this, doc) + that.products[i].product_quantity_xpath;
          break;
        case "product_quantity_inc":
        case "product_quantity_dec":
        case "product_next_page_link":
        }

        if(that.products[i] !== undefined) {

          el = document.evaluate( xp, doc, null, XPathResult.ANY_TYPE, null );

          el = el.iterateNext ();

          $(el).css("outline", "none");

        }

        i++;

      });
    });
  }
  
  controllerBase.prototype = {

    getDeals: function() {

      if (this.i < this.siteList.length) {

        $('#app_status_msg').text('Has a price: No');

        $('#tick_description, #tick_price,    #tick_photo,' +
          '#tick_buy_link,    #tick_quantity, #tick_quantity_inc,' +
          '#tick_quantity_dec', '#tick_next_page_link').css("display", "none");

        this.downloadPage(this.siteList[this.i]);

        this.i++;

      } else {

        alert("getDeals(): All sites have been processed.");

      }

    },

    setModel: function (model) { this.model = model; },

    setUtil: function (util) { this.util = util; },

    pageContainsPrice: function() {

      var $pageTextCopy = $( this.doc.body ).clone();
      var priceRegex    =   /(?:\n|\s*)?(US)*(?:\s*)?[$£](?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?((?:\s*)?-(?:\s*)?([$£])?(?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?)?(?:\s*)?(\/)?(?:\s*)?(each|kg|piece|p[cmw]m?)?/igm;
      //var priceRegex    = /(?:\n|\s*)?(US)*(?:\s*)?[$£](?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?/igm;
      var i             = 0;

      //Of course you have to trim duplicated blank spaces.
      $pageTextCopy.each(function( index ) {
         $( this ).append(' ');
      });

      //Of course you have to trim duplicated blank spaces.
      var str = $pageTextCopy.text().replace(/\s\s+/g, ' ');

      $pageTextCopy.text(str);

      var hasAPrice = str.match(priceRegex);

      if(hasAPrice !== null) {

        $('#app_status_msg').text('Has a price: Yes, potentially found ' + hasAPrice.length + ' items.');

        str = '<br>';

        var separator_str = '<br>';

        for (i = 0; i < hasAPrice.length; i++) {

          str += hasAPrice[i] + separator_str;

          if(i%10 === 0){

            separator_str = '<br>';

          }else{

            separator_str  = '&nbsp;';
            
          }
        }

        $('#app_status_msg').html($('#app_status_msg').text() + str);
      
        return true;  
      }

      return false;

    },

    getElementsWithAPrice: function ($container) {


      // Get all leaf nodes containing a currency symbol
      var that          = this;
      var $pageText     = $(this.doc.body).text();
      var priceRegex    = /(?:\n|\s*)?(US)*(?:\s*)?[$£](?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?((?:\s*)?-(?:\s*)?([$£])?(?:\s*)?\d+(,\d{3})*\.?[0-9]?[0-9]?)?(?:\s*)?(\/)?(?:\s*)?(each|kg|piece|p[cmw]m?)?/igm;
      var $priceCandidateNodes;

      //jQuery.expr[":"].containsRegEx = "(a.textContent||a.innerText||'').match(eval('/'+m[3]+'/'))!=null";
      jQuery.extend(jQuery.expr[':'], {  containsRegEx: function (el) {
        return ($(el).text().match(eval('/'+m[3]+'/'))!=null);
      }});

      $priceCandidateNodes = $(':contains(£), :contains($)', $(this.doc)).contents().filter(function() {

        if(this.nodeType === 3){ // Accept text nodes.
          if (!($(this).parent()[0].nodeType === 8)) { // Reject comment nodes.
            if($(this).text().match(priceRegex) !== null){
              $(this).parent().css('outline','green dashed 2px');
              return true;
            }
          }
        }

        return false;
        
      });

      if ($priceCandidateNodes.jquery) {

        $priceCandidateNodes.each(function(i,elem) { 
        });

        return $priceCandidateNodes;

      } // if ($priceCandidateNodes.jquery)
    
      window.console.log("getElementsWithAPrice(): Could not find a currency symbol, returning.");
      return null;

    },

    attach_frame_click_to_field_mapper: function() {

      var that = this;
      var iframe2 = $(this.iframe).contents().find('html');

      // Bubble events to parent
      iframe2.on('click', function(event) {

        var doc                            = that.iframe.contentWindow.document;
        var xp_of_clicked_node_to_scrape   = that.util.getXPathForElement(event.target,doc);
        var xpath_product_interior         = '';
        var tmp                            = [];
        var i                              = 0;
        var xp_products_container          = that.util.getXPathForElement(that.productsContainer[0], doc);
        var el                             = null;

        tmp = xp_of_clicked_node_to_scrape.replace(xp_products_container, "").split("/");

        for(i = 2; i < tmp.length; i++) {
          xpath_product_interior += "/" + tmp[i];
        }

        i = 0;

        el = document.evaluate( xp_products_container, doc, null, XPathResult.ANY_TYPE, null );

        el = el.iterateNext ();

        $(el).children().each(function() {
          var xp = that.util.getXPathForElement(this,doc) + xpath_product_interior;
          var el2 = document.evaluate( xp, doc, null, XPathResult.ANY_TYPE, null );
          el2 = el2.iterateNext ();
          $(el2).css("outline", "red dashed 2px");
        });

        switch(that.id_of_element_clicked) {
        case "product_description":
          break;
        case "product_price":

          for(i = 0; i < that.products.length; i++) {

            that.products[i].xp_price_short = xpath_product_interior;

          }

          break;

        case "product_photo":
          // Set each products 'xp_image_long' to point to
          // the product image using an XPath relative to
          // product container element.

          for(i = 0; i < that.products.length; i++) {

            that.products[i].xp_image_short = xpath_product_interior;

          }

          break;

        case "product_buy_link":

          for(i = 0; i < that.products.length; i++) {

            that.products[i].buylink_xpath = xpath_product_interior;

          }

          //that.productFieldList["product_buy_link_tagname"] = event.target.tagName;
          //that.productFieldList["product_buy_link_type"] = $(event.target).attr('type');
          //that.productFieldList["product_buy_link_id"] = $(event.target).attr('id');

          /*
          window.alert(that.id_of_element_clicked + 
          "\ntagname: " + event.target.tagName +
          "\ntype:   " + $(event.target).attr('type') +
          "\nid:   " + $(event.target).attr('id'));
          */

          break;
        case "product_quantity":

          for(i = 0; i < that.products.length; i++) {

            that.products[i].product_quantity_xpath = xpath_product_interior;

          }

          break;
        case "product_quantity_inc":
          //that.productFieldList["product_quantity_inc"] = $(event.target).attr('id');
          //window.alert(that.id_of_element_clicked + " " + $(event.target).attr('id'));
          break;
        case "product_quantity_dec":
          //that.productFieldList["product_quantity_dec"] = $(event.target).attr('id');
          //window.alert(that.id_of_element_clicked + " " + $(event.target).attr('id'));
        case "product_next_page_link":
          //that.productFieldList["product_next_page_link_tagname"] = event.target.tagName;
          //that.productFieldList["product_next_page_link_type"] = $(event.target).attr('type');
          //that.productFieldList["product_next_page_link_id"] = $(event.target).attr('id');
          //that.productFieldList["product_next_page_link_href"] = $(event.target).attr('data-href');
          //window.alert(that.id_of_element_clicked + " " + $(event.target).attr('data-href'));
        }
    
        // Untick this list item.
        $('#' + that.id_of_element_clicked + ' > span').css('display','inline');
      });     
    },

    disable_frame_click_navigation: function() {

      // Disable click navigation by rewriting href attribute
      // of all links to '#'.
      // Preserve original href values in a new attribute,
      // named 'data-href'.
      var links           = this.iframe.contentDocument.links;
      var links_remaining = links.length;
      var link;

      while (links_remaining--) {
        link = links[links_remaining];
        link.setAttribute("data-href", link.getAttribute("href"));
        link.setAttribute("href", "#");
      }
    },

    downloadPage: function (siteURL) {

      var that = this;

      $.ajax({
        type: "POST",
        url: "http://localhost/index.php/Scraper",
        data: {url: siteURL},
        /* dataType: "json", */
        dataType: "html",
        cache: false,
        /*success: function (jsonFromPHP) {*/
        success: function (contentFromPHP) {

          $('#download_progress_bar').css('width', '20%');
          $('#progress_bar_msg').text('20% Complete');

          $('#target_site').on('load', function() {
            $('#current_URL').text('Current URL: ' + siteURL);

            that.doc               = that.iframe.contentWindow.document;
            
            if(!that.pageContainsPrice()){
              $('#app_status_msg').html('<span>There are no prices on this page.</span>');
              return null;
            }

            that.productsContainer = that.getProductsContainer();

            if(that.productsContainer === null){
              console.log("downloadPage(): I can't read the page or there's nothing interesting on it.");
              $('#download_progress_bar').css('width', '0%');
              $('#progress_bar_msg').text('0% Complete');
              return null;
            }


            $('#download_progress_bar').css('width', '60%');
            $('#progress_bar_msg').text('60% Complete');
            
            $(that.productsContainer).css('outline','red dashed 2px');

            that.scrapePage();
            $('#download_progress_bar').css('width', '80%');
            $('#progress_bar_msg').text('80% Complete');
            that.attach_frame_click_to_field_mapper();
            that.disable_frame_click_navigation();

            $('#download_progress_bar').css('width', '100%');
            $('#progress_bar_msg').text('100% Complete');

          });

          that.iframe.src = "http://localhost/target.html";
          //that.iframe.src = src;
          //that.iframe.contentWindow.document.body.innerHTML = contentFromPHP;
          $('#download_progress_bar').css('width', '40%');
          $('#progress_bar_msg').text('40% Complete');

        }
      });

      $(document).ajaxError( function(e, xhr, settings, exception) {
        //[handle 500 error. xhr.responseText will contain the printed text.]
        alert("AJAX Error: PHP Returned: " + xhr.responseText);
      });

    },

    getGCAList: function () {

      var elementsWithAPriceContained = this.getElementsWithAPrice(),
      msg_shown_count             = 0,
      gcas                        = [],
      price1, price2,
      gca, elem1, elem2   = null;

      var numberOfPrices = elementsWithAPriceContained.length;

      if(elementsWithAPriceContained == null) {window.console.log("getGCAList(): Could not find a currency symbol, returning.");return null;}

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
              gca = this.util.getXPathForElement(this.util.get_common_ancestor(price1, price2)[0], this.doc);
            }
            if(gca == undefined) {
              if(msg_shown_count < 3){
                msg_shown_count++;
              }
              gca = this.util.getXPath(this.util.get_common_ancestor(price1, price2)[0]);
            }
            if(gca == undefined) {
              if(msg_shown_count < 4){
                console.log("getGCAList(): can't find the common ancestor! Returning..." + price2);
                return null;
              }
            }
            gcas.push(gca);
          }
        }
      }
      return gcas;
    },

    getProductsContainer: function () {

      var highestVal                  = 0,
      i                           = 0,
      compressed                  = null,
      currVal                     = null,
      prevVal                     = null,
      xpath                       = null,
      elem                        = null;

      //console.log("getProductsContainer(): calculating the xpath for each common ancestor a pair of elements share...");

      /* Counts the number of occurences of the same array element
       * value within parameter array 'original'.
       *
       * Returns a smaller array of objects with two members: -
       *
       * value: the original array element value
       * count: the number of times it was found in array
       * parameter 'original'.
      */

      compressed = this.util.compressArray(this.getGCAList());

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
        console.log("getProductsContainer(): compressed[]: " + compressed);
        if(compressed[0] == undefined){
          console.log("getProductsContainer(): compressed[0] == undefined.\n" + 
                      "getProductsContainer(): can't continue without a product container!");
          return null;
        }else{
          highestVal = compressed[0].count;
          xpath = compressed[0].value;
        }
      }

      return $(this.doc).xpathEvaluate( xpath );
      
    },

    getForm: function (buyBtn) {
      return $(buyBtn).closest('form').attr('id');
    },

    getBuyLink: function (currentProduct) {

      var that    = this;
      var buyBtn  = $(currentProduct).find("input[type='submit']").map(function() { return that.getForm(this); }).get();
      this.debug && console.log("getBuyLink(): buyBtn: " + buyBtn);
      var buyLink = $(currentProduct).find("a").map(function() { return this.href; }).get();
      
      $(currentProduct).find("input[type='submit']").each(function(){ $(this).css('outline','2px dashed red')});

      return buyBtn;
    },

    logProductStats: function(productsArray) {
      
      var productNum;

      console.log("scrapeProducts(): Found " + productsArray.length + " products.");
      
      for(productNum = 1; productNum <= productsArray.length; productNum++) {
        console.log("product " + productNum + "     title: " + productsArray[productNum-1].title[0]);
        console.log("product " + productNum + "     price: " + productsArray[productNum-1].price);
        console.log("product " + productNum + " images[0]: " + productsArray[productNum-1].images[0]);
        console.log("product " + productNum + "     xpath: " + productsArray[productNum-1].xpath);
        console.log("product " + productNum + "   buylink: " + productsArray[productNum-1].buylink);
      }

    },

    scrapeProducts: function (productsContainer) {

      var $priceCandidateNodes    = null,
          theProduct              = null,
          productNum              = 1,
          that                    = this,
          xpath_product_container = that.util.stripLeadingPathComponents(that.util.getXPathForElement(that.productsContainer[0],document), 3);

      // Process each product on the page.
      productsContainer.children().each(function(){

        var currentProduct = this;

        // Get all leaf nodes of the currently examined product containing a currency symbol
        $priceCandidateNodes = $(':contains(£)', $(currentProduct)).filter(function() {
          return $(this).children().length === 0;
        });

        if ($priceCandidateNodes !== null) {

          $priceCandidateNodes.each(function(n, currentPriceCandidateNode) {


            console.log("Price Candidate " + n + ": " + $(currentPriceCandidateNode).text())

            var thisProductHasAPrice       = $(currentPriceCandidateNode).text().match(/^\s*([$€£]\d{1,3}(,?\d{3})?(\.\d{2})?)\s*$/igm);
            var isStruckOutPrice           = null;
            var xpath_product              = null;
            var theProduct                 = null;
            var xp_price_long              = null;
            var xp_price_short             = null;
            var $descriptionCandidateNodes = null;
            var longestSoFar               = -1;
            var longestItem;
            var el                         = null;

            if( !(thisProductHasAPrice  === null) ){

              isStruckOutPrice = (that.util.getStyle($(currentPriceCandidateNode)[0], document)["text-decoration"] === "line-through");

              if(!isStruckOutPrice) {

                /* So far we have confirmed: -
                 * 1. A genuine price has been found matching a regex.
                 * 2. The price element text is not styled with strike-through.*/

                theProduct                      = new Product();

                theProduct.price                = $(currentPriceCandidateNode).text();
                theProduct.xp_price_long        = that.util.stripLeadingPathComponents(that.util.getXPathForElement($(this)[0], document), 3);
                theProduct.xp_price_short       = theProduct.xp_price_long.replace(xpath_product_container, "");

                theProduct.images               = $(currentProduct).find("img").map(function() { return this.src; }).get();

                if(theProduct.images.length > 0) {

                  theProduct.xp_image_long        = that.util.stripLeadingPathComponents(that.util.getXPathForElement($(currentProduct).find("img")[0], document), 3);
                  theProduct.xp_image_short       = theProduct.xp_image_long.replace(xpath_product_container, "");

                  $('#tick_photo').css('display','inline');

                  $(currentProduct).find('img').each(function(){ $(this).css('outline','red dashed 2px'); });
                }

                $descriptionCandidateNodes = $(currentProduct).find(":not(iframe)").contents().addBack().filter(function() {
                    return this.nodeType == 3;
                });

                $descriptionCandidateNodes.each(function(){
                    var text = $(this).text();

                    if (text.length > longestSoFar) {

                        longestSoFar = text.length;

                        longestItem = this;
                    }       
                });

                theProduct.title = $(longestItem).text();

                if(theProduct.title !== null) {

                  console.log("Product " + productNum + " title: " + theProduct.title);

                  theProduct.xp_title_long  = that.util.stripLeadingPathComponents(that.util.getXPathForElement($(longestItem)[0], document), 3);
                  
                  theProduct.xp_title_long  = that.util.stripTrailingPathComponents(theProduct.xp_title_long, 1);

                  theProduct.xp_title_short = theProduct.xp_price_long.replace(xpath_product_container, "");

                  $('#tick_description').css('display','inline');

                  el = document.evaluate( theProduct.xp_title_long, that.doc, null, XPathResult.ANY_TYPE, null );

                  el = el.iterateNext ();

                  $(el).css("outline", "red dashed 2px");

                }
/*

                theProduct.xpath         = that.util.getXPathForElement($(currentPriceCandidateNode)[0],document);
                  
                theProduct.buylink       = that.getBuyLink(currentProduct);

                if(theProduct.buylink !== null) {
                  $('#tick_buy_link').css('display','inline');
                }
*/
                that.products.push(theProduct);

                productNum++;

                $(currentPriceCandidateNode)[0].style.outline = 'red dashed 2px';

              } // if ( ! isStruckOutPrice )

            }/* else { // thisProductHasAPrice  === null )
              //console.log("scrapeProducts(): $priceCandidateNodes.filter(): Not a price - rejecting - " + $(currentPriceCandidateNode).text());
            }*/

          });

          if ($priceCandidateNodes.length > 0) {
            $('#tick_price').css('display','inline');   
          }

        } else {
          window.console.log("scrapeProducts(): Could not find a currency symbol, returning.");
          return null;
        }
      }); // productsContainer.children().each

      if(this.debug) {
        this.logProductStats(this.products);
      }
    },

    scrapePage: function () {

      window.console.log("scrapePage(): Getting first product...");

      if(this.productsContainer === null){

        console.log("scrapePage(): Can't find product container, returning empty handed...");

        return null;
      }

      this.scrapeProducts(this.productsContainer);

      if(this.products == null) {

        window.console.log("scrapePage(): Could not find any product(s)! returning...");

        return null;

      }

      return true;
    }

  };

  return controllerBase;
});
