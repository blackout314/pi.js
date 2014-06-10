/*! -- carlo 'blackout' denaro -- */

/*global window,document,Element,NodeList,alert,console,XMLHttpRequest,localStorage,Exception,setTimeout,clearTimeout */
/*jslint plusplus: true */

var feature = {
	"version" : "@@VERSION_NUMBER",
	"DEBUG" : true,
	"addEventListener" : !!window.addEventListener,			// eventListener
	"querySelectorAll" : !!document.querySelectorAll,		// querySelector
	"classList" : !!document.documentElement.classList		// classList
},
	pi = document.querySelector.bind(document),
	pii = document.querySelectorAll.bind(document);
/**
 * @name pi
 * @example pi('#id')
 */
/**
 * @name pii
 * @example pii('.class')
 */

pi.debug = function (action, message) {
	"use strict";
	if (feature.DEBUG) {
		console.debug('[' + action + '] ' + message);
	}
};

/*!
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

/**
 * @example pii('.class').on('click', callback)
 */
NodeList.prototype.on = function (event, fn) {
	"use strict";
	var i = 0,
		a;
	for (i = 0; i < this.length; i++) {
		this.item(i).addEventListener(event, fn, false);
	}
	/*
	while ((a = this[i++]) !== undefined) {
		a.addEventListener(event, fn, false);
	}
	*/
};
/**
 * @example pii('.class').rm('click', callback)
 */
NodeList.prototype.rm = function (event, fn) {
	"use strict";
	var i = 0,
		a;
	for (i = 0; i < this.length; i++) {
		this.item(i).removeEventListener(event, fn, false);
	}
	/*
	while ((a = this[i++]) !== undefined) {
		a.removeEventListener(event, fn, false);
	}
	*/
};

// -- html utils

if (feature.classList) {
	/**
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
	 * @example pi.classHas( pi('#id'), 'class' )
	 */
	pi.classHas = function (elm, c) {
		"use strict";
		if (typeof (elm) === 'string') {
			elm = pi(elm);
		}
		elm.classList.contains(c);
	};
	/**
	 * @example pi.classToggle( pi('#id'), 'class' )
	 */
	pi.classToggle = function (elm, c) {
		"use strict";
		if (typeof (elm) === 'string') {
			elm = pi(elm);
		}
		elm.classList.toggle(c);
	};
}
/**
 *
 */
pii.forEach = function (elms, operation) {
	"use strict";
	var args = Array.prototype.slice.call(arguments, 2),
		i = 0,
		a;
	if (typeof (elms) === 'string') {
		elms = pii(elms);
	}
	if ((typeof (elms) !== 'Object' && elms.length <= 0) || typeof (operation) !== 'string') {
		return false;
	}
	args = [ elms[0] ].concat(args);
	while ((a = elms[i++]) !== undefined) {
		args[0] = a;
		pi[operation].apply(pi, args);
	}
};

/**
 * alias
 */
pii.classAdd = function (elms, c) {
	"use strict";
	pii.forEach(elms, 'classAdd', c);
};
/**
 * alias
 */
pii.classDel = function (elms, c) {
	"use strict";
	pii.forEach(elms, 'classDel', c);
};
/**
 * alias
 */
pii.classToggle = function (elms, c) {
	"use strict";
	pii.forEach(elms, 'classToggle', c);
};

/**
 * @param {String} elm elm to append
 * @param {String} target target to append
 * @param {String} pos top|down|append
 */
pi.append = function (elm, target, pos) {
	"use strict";
	elm = pi(elm);
	target = pi(target);
	switch (pos) {
	case 'top':
		target.parentNode.insertBefore(elm, target);
		break;
	case 'down':
		target.parentNode.insertBefore(elm, target.nextSibling);
		break;
	default:
		target.appendChild(elm);
		break;
	}
};

/**
 * @example pi.ready( callback );
 */
pi.ready = function (callback) {
	"use strict";
	document.addEventListener("DOMContentLoaded", callback(), false);
};

/**
 * dataset use
 *
 * pii('#try .sub')[0].dataset
 *
 */

// -- pub/sub notifier

/**
 * simple pub sub
 */
var topics = {};
/**
 * @param {String} topic
 * @param {Array} args arguments
 */
pi.pub = function (topic, args) {
	"use strict";
	if (topics[topic]) {
		var thisTopic = topics[topic],
			thisArgs = args || [],
			k,
			j;
		for (k = 0, j = thisTopic.length; k < j; k++) {
			pi.debug('PUB', topic);
			thisTopic[k].apply(pi, thisArgs);
		}
	}
};
/**
 * @param {String} topic
 * @param {Object} callback
 */
pi.sub = function (topic, callback) {
	"use strict";
	if (!topics[topic]) {
		topics[topic] = [];
	}
	pi.debug('SUB', topic);
	topics[topic].push(callback);
	return {
		topic: topic,
		callback: callback
	};
};
/**
 * @param {String} handle.topic
 * @param {Object} handle.callback
 */
pi.unsub = function (handle) {
	"use strict";
	var topic = handle.topic,
		thisTopic = [],
		y,
		w;
	if (topics[topic]) {
		thisTopic = topics[topic];
		for (y = 0, w = thisTopic.length; y < w; y++) {
			if (thisTopic[y] === handle.callback) {
				pi.debug('DEL', topic);
				thisTopic.splice(y, 1);
			}
		}
	}
};

// -- storage

/**
 * local storage
 */
pi.storage = (function () {
	"use strict";
	return {
		set: function (key, value) {
			try {
				localStorage.setItem(key, value);
			} catch (error) {
				if (error.name === 'QUOTA_EXCEEDED_ERR') {
					throw new Exception(error.name);
				}
			}
		},
		get: function (key) {
			return localStorage.getItem(key);
		},
		del: function (key) {
			if (typeof (key) === 'undefined') {
				localStorage.clear();
			} else {
				localStorage.removeItem(key);
			}
		},
		cache: function (key, value, ttl) {
			var now = new Date().valueOf(),
				prefix = 'pic',
				age = 0,
				elm = {};
			elm = JSON.parse(this.get(prefix) || "{}");
			if (typeof (value) !== 'undefined') {
				// write
				elm[key] = {
					d: value,
					ttl: now + ttl
				};
				this.set(prefix, JSON.stringify(elm));
			} else {
				// read || del
				age = (now - (typeof (elm[key]) !== 'undefined' ? elm[key].ttl : 0));
				pi.debug('AGE', age + ' key: ' + key);
				if (!elm[key] || elm === null || age > 1) {
					this.del(elm[key]);
					return false;
				} else {
					return elm[key].d;
				}
			}
		},
		namespace: function (namespace) {
			return {
				namespace: namespace + '_',
				set: function (key,value) {
					pi.storage.set(this.namespace + key, value);
				},
				get: function (key) {
					return pi.storage.get(this.namespace + key);
				},
				del: function (key) {
					pi.storage.del(this.namespace + key);
				}
			}
		}
	};
}());

// -- ajax

/**
 * @param {Object} 
 * @param {String} params.type
 * @param {String} params.url
 * @param {Function} params.success
 * @param {Function} params.error
 * @param {String} [params.params]
 * @param {Number} [params.ttl] time to live for caching
 */
pi.ajax = function (params) {
	"use strict";
	var r = new XMLHttpRequest(),
		cache = pi.storage.cache(params.type + params.url);
	// hit cache
	if (cache) {
		params.success(cache);
		return;
	}
	r.open(params.type, params.url, true);
	r.onreadystatechange = function () {
		if (r.readyState !== 4 || r.status !== 200) {
			if (typeof (params.error) !== 'undefined') {
				params.error(r.responseText);
			}
			return;
		}
		// fill cache
		pi.storage.cache(params.type + params.url, r.responseText, (params.ttl || 1000 * 60));
		params.success(r.responseText);
	};
	r.send(params.params || "");
};


// -- lazy from echo

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
			offset = parseInt(opts.offset || 0);
			throttle = parseInt(opts.throttle || 250);
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


// -- eof
