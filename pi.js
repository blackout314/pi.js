/* carlo 'blackout' denaro */

/*global window,document,Element,alert,console,XMLHttpRequest,localStorage,Exception */
/*jslint plusplus: true */

var feature = {
	"addEventListener" : !!window.addEventListener,			// eventListener
	"querySelectorAll" : !!document.querySelectorAll,		// querySelector
	"classList" : !!document.documentElement.classList,		// classList
	"DEBUG" : true											// debug
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
 *
 */
pii.classAdd = function (elms, c) {
	"use strict";
	var i;
	if (typeof (elms) !== 'Object' && elms.length <= 0) {
		return false;
	}
	for (i = 0; i < elms.length; i++) {
		pi.classAdd(elms[i], c);
	}
};
/**
 *
 */
pii.classDel = function (elms, c) {
	"use strict";
	var i;
	if (typeof (elms) !== 'Object' && elms.length <= 0) {
		return false;
	}
	for (i = 0; i < elms.length; i++) {
		pi.classDel(elms[i], c);
	}
};
/**
 *
 */
pii.classToggle = function (elms, c) {
	"use strict";
	var i;
	if (typeof (elms) !== 'Object' && elms.length <= 0) {
		return false;
	}
	for (i = 0; i < elms.length; i++) {
		pi.classToggle(elms[i], c);
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
			if (typeof (params.error) !== 'undefined') {
				params.error(r.responseText);
			}
			return;
		}
		params.success(r.responseText);
	};
	r.send(params.params || "");
};

/**
 * dataset use
 *
 * pii('#try .sub')[0].dataset
 *
 */

pi.debug = function (action, message) {
	"use strict";
	console.debug('[' + action + '] ' + message);
};

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
			if (feature.DEBUG) {
				pi.debug('PUB', topic);
			}
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
	if (feature.DEBUG) {
		pi.debug('SUB', topic);
	}
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
	var topic = handle.topic;
	if (topics[topic]) {
		var thisTopic = topics[topic],
			y,
			w;
		for (y = 0, w = thisTopic.length; y < w; y++) {
			if (thisTopic[y] === handle.callback) {
				if (feature.DEBUG) {
					pi.debug('DEL', topic);
				}
				thisTopic.splice(y, 1);
			}
		}
	}
};

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
				age = (now - elm[key].ttl);
				if (feature.DEBUG) {
					pi.debug('AGE', age + ' key: ' + key);
				}
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

// -- eof
