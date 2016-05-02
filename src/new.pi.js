/*! -- carlo 'blackout' denaro -- */

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

Element.prototype.addClass = function (c) {
  "use strict";
	this.classList.add(c);
}

Element.prototype.delClass = function (c) {
  "use strict";
	this.classList.remove(c);
}

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



/* -- for test jest -- */
function sum(a, b) {
  return a + b;
}

module.exports = sum;
