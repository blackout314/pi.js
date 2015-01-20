/*!
 *
 *
 * lazy load
 *
 *
 */

/**
 * @name pii.lazyload
 */

/*jslint nomen: true */
pii.lazyload = (function (global, document) {
	'use strict';
	/**
	 * store
	 * @type {Array}
	 */
	var store = [],
	/**
	 * callback - initialized to a no-op so that no validations on it's presence need to be made
	 * @type {Function}
	 */
		callback = function () {},
	/**
	 * offset, throttle, poll, vars
	 */
		offset,
		throttle,
		poll,
	/**
	 * _inView
	 * @private
	 * @param {Element} element Image element
	 * @returns {Boolean} Is element in viewport
	 */
		_inView = function (element) {
			var coords = element.getBoundingClientRect();
			return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (window.innerHeight || document.documentElement.clientHeight) + offset);
		},
	/**
	 * _pollImages Loop through the images if present
	 * or remove all event listeners
	 * @private
	 */
		_pollImages = function () {
			var length = store.length,
				i = 0,
				self;
			if (length > 0) {
				for (i = 0; i < length; i++) {
					self = store[i];
					if (self && _inView(self)) {
						if (self.tagName.toLowerCase() !== 'img') {
							self.style.cssText += "background-image: url('" + self.getAttribute('data-echo') + "');";
						} else {
							self.src = self.getAttribute('data-echo');
						}
						callback(self);
						store.splice(i, 1);
						length = store.length;
						i--;
					}
				}
			} else {
				global.removeEventListener('scroll', _throttle);
				clearTimeout(poll);
			}
		},
	/**
	 * _throttle Sensible event firing
	 * @private
	 */
		_throttle = function () {
			clearTimeout(poll);
			poll = setTimeout(_pollImages, throttle);
		},
	/**
	 * init Module init function
	 * @param {Object} [obj] Passed in Object with options
	 * @param {Number|String} [obj.throttle]
	 * @param {Number|String} [obj.offset]
	 * @param {Function} [obj.callback]
	 */
		init = function (obj) {

			var nodes = pii('[data-echo]'),
				opts = obj || {},
				i = 0;
			offset = parseInt(opts.offset || 0, 10);
			throttle = parseInt(opts.throttle || 250, 10);
			callback = opts.callback || callback;

			for (i = 0; i < nodes.length; i++) {
				store.push(nodes[i]);
			}

			_pollImages();

			global.addEventListener('scroll', _throttle, false);
			global.addEventListener('load', _throttle, false);
		};
	/**
	 * return Public methods
	 * @returns {Object}
	 */
	return {
		init: init,
		render: _pollImages
	};
})(this, document);
/*jslint nomen: false */
