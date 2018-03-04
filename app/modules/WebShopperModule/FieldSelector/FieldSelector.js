define(function(require) {


/**
 * ScraperPageManager.push
 * ScraperDownloader.download
 * ScraperPageManager.listen("SCRAPER_PAGE_DOWNLOADED_ACTIVITY")
 * new Scraper(moduleContext, that, data);
 * target_site_frame.src = 'http://localhost/target.html';
 * target_site_frame.onload
 * highlight_selected_elements
 * scrape_elements
 * SPM.push
 */


/**
 * set up manage_user_click to handle clicks.
 * calls highlight_selected_elements once.
 * calls highlight_selected_elements in a loop.
 * highlight_selected_elements calls getNextPageInfo.
 * @constructor
 * @param {Object} moduleContext
 *
 */

var Downloader = require('Downloader'),
    Util       = require('Util'),
    ScraperPageManager = require('ScraperPageManager');

function FieldSelector(moduleContext, data) {

    var target_site_frame           = document.getElementById('target_site'),
        target_site_frame_element   = target_site_frame.contentWindow || target_site_frame.contentDocument,
        activeObj                   = null,
        lastObj                     = [],
        classname                   = '',
        prev_classname,
        pageManager                 = new ScraperPageManager(moduleContext, this);

    this.downloader                   = new Downloader(moduleContext);
    this.Util                         = Util;
    var fieldSelector                 = this;

    /*  Functions Start */

    function highlight_selected_elements(newobj, undo) {

        if (newobj) {

            if($(newobj).attr('class') !== undefined) {

                alert("classname: " + newobj.classname);

                // An element with a classname has been clicked.

                // Get the first classname.
                classname = '.' + $(newobj).attr('class').split(' ')[0];

                outline_elements(classname, target_site_frame_element.document);

                if(!(prev_classname === undefined)) {
                    unoutline_elements(prev_classname, target_site_frame_element.document);                  
                }

                console.log('Classname(s): ' + $(newobj).attr('class').split(' ') + '\nClassname we will use: ' + classname);

                prev_classname = classname;

                activeObj = newobj;

            }


        } // if an element was clicked

    } // highlight_selected_elements()

    function outline_element(elem, doc) {
        $(elem, doc).css('outline', '5px solid blue');
    }

    function outline_elements(elem, doc) {
        $(elem, doc).each(function() {
            outline_element(this, doc);
        });
    }

    function unoutline_element(elem) {
        $(elem).css('outline', '');
    }

    function unoutline_elements(elem, doc) {
        $(elem, doc).each(function() {
            unoutline_element(this);
        });
    }

    function scrape_elements(elem, doc) {
        $(elem, doc).each(function() {
            Util.scrape(this.parentNode);
        });
    }

    target_site_frame.onload = function() {

        var cntrlIsPressed  = false;

        console.log('Frame Loaded.');

        function manage_user_click(event) {

            event.preventDefault();
            var node            = event.target;
            var nextPageInfo    = {};

            highlight_selected_elements(node);

            if(cntrlIsPressed !== undefined) {
                if (cntrlIsPressed) {

                    scrape_elements(classname, target_site_frame_element.document);

                    nextPageInfo = Util.getNextPageInfo(node, target_site_frame_element.document);

                    if(!Util.isEmpty(nextPageInfo)){

                        pageManager.push(nextPageInfo.href, node);

                    }
                }
            }

        } // manage_user_click

        target_site_frame_element.addEventListener('click', manage_user_click, false);

        $(target_site_frame_element).keydown(function(event){
            if(event.which=="17")
                cntrlIsPressed = true;
        });

        $(target_site_frame_element).keyup(function(){
            cntrlIsPressed = false;
        });

    }; // target_site_frame.onload


    /*  Functions End */

    target_site_frame.src = 'http://localhost/target.html';

} // FieldSelector(moduleContext, data)

FieldSelector.prototype = {
};

return FieldSelector;

});

