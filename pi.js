/* carlo 'blackout' denaro */

/*global window,document,Element,alert,console,XMLHttpRequest */

var feature = {
	"addEventListener" : !!window.addEventListener,			// eventListener
	"querySelectorAll" : !!document.querySelectorAll,		// querySelector
	"classList" : !!document.documentElement.classList		// classList
};

/**
 * @example pi('#id')
 */
var pi = document.querySelector.bind(document);

/**
 * @example pii('.class')
 */
var pii = document.querySelectorAll.bind(document);

/**
 * listener example
 *
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

if (feature.classList) {
	/**
	 * @example pi.classAdd( pi('#id'), 'class' )
	 */
	pi.classAdd = function (elm, c) {
		"use strict";
		elm.classList.add(c);
	};
	/**
	 * @example pi.classDel( pi('#id'), 'class' )
	 */
	pi.classDel = function (elm, c) {
		"use strict";
		elm.classList.remove(c);
	};
	/**
	 * @example pi.classHas( pi('#id'), 'class' )
	 */
	pi.classHas = function (elm, c) {
		"use strict";
		elm.classList.contains(c);
	};
	/**
	 * @example pi.classToggle( pi('#id'), 'class' )
	 */
	pi.classToggle = function (elm, c) {
		"use strict";
		elm.classList.toggle(c);
	};
}

/**
 * @example pi.ready( callback );
 */
pi.ready = function (callback) {
	"use strict";
	document.addEventListener("DOMContentLoaded", callback(), false);
};

/**
 * @param {Object} 
 * @param {String} params.type
 * @param {String} params.url
 * @param {String} params.params
 * @param {Function} params.success
 * @param {Function} params.error
 */
pi.ajax = function (params) {
	"use strict";
	var r = new XMLHttpRequest();
	r.open(params.type, params.url, true);
	r.onreadystatechange = function () {
		if (r.readyState !== 4 || r.status !== 200) {
			params.error();
			return;
		}
		params.success();
	};
	r.send(params.params);
};

/**
 * dataset use
 *
 * pii('#try .sub')[0].dataset
 *
 */

// -- eof
