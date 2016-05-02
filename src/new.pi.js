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




/* -- for test jest -- */
function sum(a, b) {
  return a + b;
}

module.exports = sum;
