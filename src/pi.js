/*! -- carlo 'blackout' denaro -- */


/*global window,document,Element,NodeList,console,XMLHttpRequest,localStorage,Exception */
/*jslint plusplus: true */

(function(g) {
  g.ns = function(names) {
    var d = names.split('.'),
      o = g,
      i;
    for(i = 0; i < d.length; i += 1) {
      o[d[i]] = o[d[i]] || {};
      o = o[d[i]];
    }
    return o;
  };
})(window);

var pi = document.querySelector.bind(document),
	pii = document.querySelectorAll.bind(document);

/**
 * @name pi
 * @example pi('#id')
 */
/**
 * @name pii
 * @example pii('.class')
 */
/**
 * dataset use
 *
 * @example pii('#try .sub')[0].dataset
 */

/*!
 * listener example
 *
 * @example
 * var listener = function(e) { console.log(e); };
 * pi('#try').on('click',listener);
 * pi('#try').rm('click',listener);
 *
 */

/**
 * @example pi('#id').on('click', callback)
 */
Element.prototype.on = Element.prototype.addEventListener;
/**
 * @example pi('#id').rm('click', callback)
 */
Element.prototype.rm = Element.prototype.removeEventListener;
/**
 *
 */
Element.prototype.getPos = function () {
    "use strict";
    var box = this.getBoundingClientRect(),
        body = document.body,
        docElem = document.documentElement,
        scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop,
        scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft,
        clientTop = docElem.clientTop || body.clientTop || 0,
        clientLeft = docElem.clientLeft || body.clientLeft || 0,
        top  = box.top +  scrollTop - clientTop,
        left = box.left + scrollLeft - clientLeft;

    return {
        top: Math.round(top),
        left: Math.round(left)
    };
};
/**
 *
 */
Element.prototype.scrollTo = function () {
    "use strict";
    var coords = this.getPos();
    window.scrollTo(coords.left, coords.top);
};

NodeList.prototype.cycle = function (event, fn, action) {
    "use strict";
	var i = 0;
	for (i = 0; i < this.length; i++) {
		this.item(i)[action](event, fn, false);
	}
};
/**
 * @example pii('.class').on('click', callback)
 */
NodeList.prototype.on = function (event, fn) {
    "use strict";
	NodeList.prototype.cycle.call(this, event, fn, 'addEventListener');
};
/**
 * @example pii('.class').rm('click', callback)
 */
NodeList.prototype.rm = function (event, fn) {
	"use strict";
    NodeList.prototype.cycle.call(this, event, fn, 'removeEventListener');
};

/**
 * @name pi.ready
 * @example pi.ready( callback );
 */
pi.ready = function (callback) {
	"use strict";
	document.addEventListener("DOMContentLoaded", callback(), false);
};

// -------- Config

pi.C = {
	"version" : "@@VERSION_NUMBER",
	"DEBUG" : false,
	feature : {
    "srcSet" : typeof (new Image().srcset) !== 'undefined',
		"eventListener" : !!window.addEventListener,
		"querySelector" : !!document.querySelectorAll,
		"classList" : !!document.documentElement.classList
	},
  "UA" : "XXXXX"
};

// --------- Tracking Function

pi.track = function () {
    "use strict";
    /*
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', pi.C.UA, 'auto');
    ga('send', 'pageview');
    */
    return true;
};

// -------- Debug

pi.D = {
	debug : function (action, message) {
		"use strict";
		if (pi.C.DEBUG) {
			console.debug('[' + action + '] ' + message);
		}
	}
};

/**
 * @name pii.forEach
 * @example pii.forEach(elms, 'classAdd', 'class');
 */
pii.forEach = function (elms, operation) {
	"use strict";
	var args = Array.prototype.slice.call(arguments, 2),
		i = 0,
		a;
	if (typeof (elms) === 'string') {
		elms = pii(elms);
	}
	if (typeof (elms) !== 'object' || elms.length <= 0 || typeof (operation) !== 'string') {
		return false;
	}
	while ((a = elms[i++]) !== undefined) {
		a[operation](args);
	}
};

if (pi.C.feature.classList) {
  Element.prototype.addClass = function (c) {
    "use strict";
    this.classList.add(c);
  };

  Element.prototype.delClass = function (c) {
    "use strict";
    this.classList.remove(c);
  };

  Element.prototype.hasClass = function (c) {
		"use strict";
		return this.classList.contains(c);
	};

	Element.prototype.toggleClass = function (c) {
		"use strict";
		this.classList.toggle(c);
	};

  NodeList.prototype.addClass = function (c) {
		"use strict";
		pii.forEach(this, 'addClass', c);
	};

  NodeList.prototype.delClass = function (c) {
		"use strict";
		pii.forEach(this, 'delClass', c);
	};

  NodeList.prototype.toggleClass = function (c) {
		"use strict";
		pii.forEach(this, 'toggleClass', c);
	};
}

// -- eof
