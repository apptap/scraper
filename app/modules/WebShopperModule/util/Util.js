define(function() {
    function Util() {
        this.that = this;
    }

    /* Counts the number of occurences of the same array element
     * value within parameter array 'original'.
     *
     * Returns a smaller array of objects with two members: -
     *
     * value: the original array element value
     * count: the number of times it was found in array
     * parameter 'original'.
    */
    Util.prototype = {

        isEmpty: function (obj) {
            for(var prop in obj) {
                if(obj.hasOwnProperty(prop))
                    return false;
            }

            return JSON.stringify(obj) === JSON.stringify({});
        },

        /**
         * Returns the XPath as a string for the first parameter, el.
         * @function Util.getXPathForElement.
         * @param el HTML element.
         * @param xml Document
         */
        getXPathForElement: function(el, xml) {
            var xpath = '';
            var pos, tempitem2;

            while(el !== xml.documentElement) {   
                pos = 0;
                tempitem2 = el;
                while(tempitem2) {
                    if (tempitem2.nodeType === 1 && tempitem2.nodeName === el.nodeName) { // If it is ELEMENT_NODE of the same name
                        pos += 1;
                    }
                    tempitem2 = tempitem2.previousSibling;
                }

                if(el !== null) {
                    xpath = el.nodeName+"["+pos+']'+'/'+xpath;
                    el = el.parentNode;
                } else {
                    break;
                }
            }

            xpath = '/'+xml.documentElement.nodeName+'/'+xpath;
            xpath = xpath.replace(/\/$/, '');
            return xpath;
        },

        scrape: function(item) {

            function walkTheDOM(node, func) {
                func(node);
                node = node.firstChild;
                while (node) {
                    walkTheDOM(node, func);
                    node = node.nextSibling;
                }
            }

            // Takes an id string or HTML element.
            function textNodeValuesToArray(node) {
                if (typeof node === "string") {
                    node = document.getElementById(node);
                }

                var arrayOfText = [];

                function pushText(currentNode) {
                    if (currentNode.nodeType === 3) {
                        arrayOfText.push("Nodename: " + currentNode.parentNode.nodeName + " Value: " + currentNode.nodeValue);
                    }
                }

                walkTheDOM(node, pushText);

                return arrayOfText;
            }

            console.log(textNodeValuesToArray(item));

        },

        /**
         * Puts an outline around element passed as first parameter.
         * returns an object with properties of the element.
         * @function getNextPageInfo
         * @param el HTML element.
         * @param doc HTML document.
         */
        getNextPageInfo: function(el, doc) {
            var nextPageInfo  = {
                innerHTML: el.innerHTML,
                href: el.dataset.href,
                xpath: this.getXPathForElement($(el).closest('a')[0], doc)
            };

            $(el, doc).css('outline', '5px solid green');

            console.log('============= next page start ============' + '\n' + "Next Page InnerHTML: " + el.innerHTML + '\n' + "Next Page InnerText: " + el.innerText);

            console.log('Next Page: ' + $(el).closest('a')[0].dataset.href);

            console.log('Next Page XPath: ' + this.getXPathForElement($(el).closest('a')[0], doc) + '\n' + '============= next page end ============');

            return nextPageInfo;
        },

        so_showParentObj: function(activeObj) {
            if(activeObj.parentNode && activeObj.tagName != "HTML") {
                set_active(activeObj.parentNode);
            }
        },

        calc_element_offset: function() {
            if(newobj.nodeName === "a") {

                // The user has clicked on an element inside
                // the a tag.

                // For people using JQuery:

                // Sometimes, when you have nested elements, one of them with the event attached to it, it can be confusing to understand what your browser sees as the parent. Here, you can specify which parent.

                // You take the mouse position, and then subtract it from the parent element's offset position.

                var x = evt.pageX - $(newobj).offset().left;
                var y = evt.pageY - $(newobj).offset().top;
                // If you're trying to get the mouse position on a page inside a scrolling pane:

                console.log("Offset 1 x: " + x);
                console.log("Offset 1 y: " + y);

                var x = (evt.pageX - $(newobj).offset().left) + fieldSelector.frame.scrollLeft();
                var y = (evt.pageY - $(newobj).offset().top) + fieldSelector.frame.scrollTop();
                // Or the position relative to the page:

                console.log("Offset 2 x: " + x);
                console.log("Offset 2 y: " + y);

                var x = (evt.pageX - $(newobj).offset().left) + $(window).scrollLeft();
                var y = (evt.pageY - $(newobj).offset().top) + $(window).scrollTop();
                // Note the following performance optimisation:

                console.log("Offset 3 x: " + x);
                console.log("Offset 3 y: " + y);

                var offset = $(newobj).offset();
                // Then refer to 
                var x = evt.pageX - offset.left;
                console.log("Offset 4 x: " + x);

            }
        },

        compressArray: function (original) {

            var compressed = [],
                myCount,
                copy,
                w;

            if(original === null) {
               return null;
            }

            copy = original.slice(0);

            for (var i = 0; i < original.length; i++) {

                myCount = 0;

                for (w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        myCount++;
                        delete copy[w];
                    }
                }

                if (myCount > 0) {
                    var a = new Object();
                    a.value = original[i];
                    a.count = myCount;
                    compressed.push(a);
                }
            }

            return compressed;
        },

        get_common_ancestor: function(a, b) {
            var c = $(a),
                d = $(b),
                closestCommonAncestor = c.parents().has(d).first();
            return closestCommonAncestor;
        },

        getXPath: function(node) {
            var comp, 
                comps = [],
                parent = null,
                xpath = '';

            var getPos = function(node) {
                var position = 1, curNode;

                if (node.nodeType == Node.ATTRIBUTE_NODE) {
                    return null;
                }

                for (curNode = node.previousSibling; curNode; curNode = curNode.previousSibling) {
                    if (curNode.nodeName == node.nodeName) {
                        ++position;
                    }
                }
                return position;
            }

            if (node instanceof Document) {
                return '/';
            }

            for (; node && !(node instanceof Document); node = node.nodeType == Node.ATTRIBUTE_NODE ? node.ownerElement : node.parentNode) {

                comp = comps[comps.length] = {};

                switch (node.nodeType) {
                case Node.TEXT_NODE:
                    comp.name = 'text()';
                    break;
                case Node.ATTRIBUTE_NODE:
                    comp.name = '@' + node.nodeName;
                    break;
                case Node.PROCESSING_INSTRUCTION_NODE:
                    comp.name = 'processing-instruction()';
                    break;
                case Node.COMMENT_NODE:
                    comp.name = 'comment()';
                    break;
                case Node.ELEMENT_NODE:
                    comp.name = node.nodeName;
                    break;
                }

                comp.position = getPos(node);
            }

            for (var i = comps.length - 1; i >= 0; i--) {
                comp = comps[i];
                xpath += '/' + comp.name;
                if (comp.position != null) {
                    xpath += '[' + comp.position + ']';
                }
            }

            return xpath;

        },

        getXPath2: function(node){
            var iframe = document.getElementsByTagName('iframe')[0], 
                doc    = iframe.contentWindow.document;

            if(node.hasAttribute("id")){
                return '//' + node.tagName + '[@id="' + node.id + '"]';
            }

            if(node.hasAttribute("class")){
                return '//' + node.tagName + '[@class="' + node.getAttribute("class") + '"]';
            }

            //var old = '/' + node.tagName;
            //var new_path = this.xpath(node.parentNode) + old;

            //return new_path;

            //return $(doc).xpathEvaluate(node);
        },

        getView: function (node, doc) {
            if (node && node.nodeType==1) {
                var view = doc.defaultView ? doc.defaultView.getComputedStyle(node, null):node.currentStyle;
            }
            else {
                var view = null;
            }
            return view;
        },

        getStyle: function (node, doc) {
            // return all the style attributes of a node
            var result = {};
            var ncs = this.getView(node, doc);
            if (!ncs) return result;

            for (var i=0; i<ncs.length; ++i) {
                var e = ncs.item(i); // style name
                if (e==undefined) continue;
                if (e.startsWith('-moz-')) continue;
                var v = ncs.getPropertyValue(e); // style value
                result[e] = v;
            }
            return result;
        },
    
        escapeRegExp: function(str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },

        stripLeadingPathComponents: function(xpath_product,components_to_strip) {

            var tmp         = [],
            xpath_short = '',
            i;

            tmp     = xpath_product.split("/");

            for(i = components_to_strip; i < tmp.length; i++) {
                xpath_short += "/" + tmp[i];
            }

            return xpath_short;
        },

        stripTrailingPathComponents: function(xpath_product,components_to_strip) {

            var tmp         = [],
                xpath_short = '',
                i;

            tmp     = xpath_product.split("/");

            for(i = 0; i < (tmp.length - components_to_strip); i++) {
                xpath_short += "/" + tmp[i];
            }

	        return xpath_short;

        },

        displayXPath: function(target_site_frame_element) {
            var tempNode = document.createElement('div');
            tempNode.setAttribute('id', 'flo-xpath');
            tempNode.style.cssText='background-color:yellow;font-size:10px;top:0px;left:0px;position:absolute;';
            tempNode.innerHTML = Util.getXPathForElement(activeObj, target_site_frame_element.document);
            target_site_frame_element.document.documentElement.appendChild(tempNode);
        },

        clean_active: function() {

            if (activeObj) activeObj.style.outline = '';

            el = target_site_frame_element.document.getElementById('flo-xpath');

            if (el) el.parentNode.removeChild(el);
            //activeObj.removeChild(activeObj.getElementById('xpath'));
        }
    }

    return new Util();
});
