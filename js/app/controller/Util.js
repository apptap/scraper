define(['jquery','bootstrap'], function($) {
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

	}
  }

  return Util;
});

