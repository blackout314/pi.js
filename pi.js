/*! -- carlo 'blackout' denaro -- */

/*global window,document,Element,NodeList,alert,console,XMLHttpRequest,localStorage,Exception */
/*jslint plusplus: true */

var feature = {
	"version" : "@@VERSION_NUMBER",
	"DEBUG" : false,
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

// -- eof
