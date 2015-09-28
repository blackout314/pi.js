/*! -- carlo 'blackout' denaro -- */


/*global window,document,Element,NodeList,console,XMLHttpRequest,localStorage,Exception */
/*jslint plusplus: true */

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
	"DEBUG" : true,
	feature : {
        "srcSetSupported" : typeof (new Image().srcset) !== 'undefined',     // srcset supported?
		"addEventListener" : !!window.addEventListener,                   // eventListener
		"querySelectorAll" : !!document.querySelectorAll,                 // querySelector
		"classList" : !!document.documentElement.classList                // classList
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
	args = [ elms[0] ].concat(args);
	while ((a = elms[i++]) !== undefined) {
		args[0] = a;
		pi[operation].apply(pi, args);
	}
};

if (pi.C.feature.classList) {
	/**
	 * @name pi.classAdd
	 * @example pi.classAdd( pi('#id'), 'class' )
	 */
	pi.classAdd = function (elm, c) {
		"use strict";
		if (typeof (elm) === 'string') {
			elm = pi(elm);
		}
		elm.classList.add(c);
	};
	/**
	 * @name pi.classDel
	 * @example pi.classDel( pi('#id'), 'class' )
	 */
	pi.classDel = function (elm, c) {
		"use strict";
		if (typeof (elm) === 'string') {
			elm = pi(elm);
		}
		elm.classList.remove(c);
	};
	/**
	 * @name pi.classHas
	 * @example pi.classHas( pi('#id'), 'class' )
	 */
	pi.classHas = function (elm, c) {
		"use strict";
		if (typeof (elm) === 'string') {
			elm = pi(elm);
		}
		return elm.classList.contains(c);
	};
	/**
	 * @name pi.classToggle
	 * @example pi.classToggle( pi('#id'), 'class' )
	 */
	pi.classToggle = function (elm, c) {
		"use strict";
		if (typeof (elm) === 'string') {
			elm = pi(elm);
		}
		elm.classList.toggle(c);
	};

	/**
	 * @name pii.classAdd
	 */
	pii.classAdd = function (elms, c) {
		"use strict";
		pii.forEach(elms, 'classAdd', c);
	};
	/**
	 * @name pii.classDel
	 */
	pii.classDel = function (elms, c) {
		"use strict";
		pii.forEach(elms, 'classDel', c);
	};
	/**
	 * @name pii.classToggle
	 */
	pii.classToggle = function (elms, c) {
		"use strict";
		pii.forEach(elms, 'classToggle', c);
	};
}

// -- eof
