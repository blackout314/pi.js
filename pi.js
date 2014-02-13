/* carlo 'blackout' denaro */

/*global window,document,Element,alert,console */
var feature = {
	"addEventListener" : !!window.addEventListener,			// eventListener
	"querySelectorAll" : !!document.querySelectorAll,		// querySelector
	"classList" : !!document.documentElement.classList		// classList
};

/**
 *
 */
var pi = document.querySelector.bind(document);
/**
 *
 */
var pii = document.querySelectorAll.bind(document);
Element.prototype.on = Element.prototype.addEventListener;

if (feature.classList) {
	/**
	 *
	 */
	pi.classAdd = function (elm, c) {
		"use strict";
		elm.classList.add(c);
	};
	/**
	 *
	 */
	pi.classDel = function (elm, c) {
		"use strict";
		elm.classList.remove(c);
	};
	/**
	 *
	 */
	pi.classHas = function (elm, c) {
		"use strict";
		elm.classList.contains(c);
	};
	/**
	 *
	 */
	pi.classToggle = function (elm, c) {
		"use strict";
		elm.classList.toggle(c);
	};
}

/*
if (feature.addEventListener) {
	document.addEventListener("DOMContentLoaded", function () {
		"use strict";
		console.log('loaded');
	}, false);
}
*/

// -- eof
