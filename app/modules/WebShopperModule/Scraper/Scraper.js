define(function(require) {

/**
 * set up manage_user_click to handle clicks.
 * calls highlight_selected_elements once.
 * calls highlight_selected_elements in a loop.
 * highlight_selected_elements calls getNextPageInfo.
 * @constructor
 * @param {Object} moduleContext
 *
 */

var Downloader = require('ScraperDownloader'),
    Util       = require('Util');

function Scraper(moduleContext, SPM, data) {

    var target_site_frame            = document.getElementById('target_site'),
        target_site_frame_element   = target_site_frame.contentWindow || target_site_frame.contentDocument,
        activeObj                   = null,
        lastObj                     = [],
        classname                   = '',
        prev_classname;

    this.downloader                   = new Downloader(moduleContext);
    this.Util                         = Util;
    this.node                         = SPM.node;
    var Scraper                       = this;

    /*  Functions Start */

    function so_captureKeyDownEvent(e) {

        var keyCode = target_site_frame_element.all?window.event.keyCode:e.keyCode;

        switch(keyCode) {
        case 81: // Q
            highlight_selected_elements(lastObj.pop(), true);
            break;
        case 87: // W
            //so_showParentObj(activeObj);
            unoutline_elements(classname, target_site_frame_element.document);
            classname = '.' + $(activeObj.parentNode, target_site_frame_element.document).attr('class').split(' ')[0];
            outline_elements(classname, target_site_frame_element.document);
            break;
        case 88: // x
            so_exit();
            break;
        }
    }

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

    // Called: When the website we want to scrape is loaded into the frame.
    target_site_frame.onload = function() {

        console.log('Frame Loaded.');

        highlight_selected_elements(SPM.node);

        //classname = '.' + $(activeObj, target_site_frame_element.document).attr('class').split(' ')[0];

        scrape_elements(classname, target_site_frame_element.document);

        SPM.push(Util.getNextPageInfo(SPM.node, target_site_frame_element.document));

        //moduleContext.notify("NEXT_PAGE_ACTIVITY", Util.getNextPageInfo(node, target_site_frame_element.document))

    }; // target_site_frame.onload

    target_site_frame.src = 'http://localhost/target.html';

} // Scraper(moduleContext, data)

Scraper.prototype = {
};

return Scraper;

});

