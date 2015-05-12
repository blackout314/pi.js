/*! -- carlo 'blackout' denaro -- */

/*global window,document,Element,NodeList,alert,console,XMLHttpRequest,localStorage,Exception,setTimeout,clearTimeout */
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
 * @example pii('.class').on('click', callback)
 */
NodeList.prototype.on = function (event, fn) {
	"use strict";
	var i = 0,
		a;
	for (i = 0; i < this.length; i++) {
		this.item(i).addEventListener(event, fn, false);
	}
	/* while ((a = this[i++]) !== undefined) { a.addEventListener(event, fn, false); } */
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
	/* while ((a = this[i++]) !== undefined) { a.removeEventListener(event, fn, false); } */
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
        "srcSetSupported" : typeof(new Image().srcset)!=='undefined',     // srcset supported?
		"addEventListener" : !!window.addEventListener,                   // eventListener
		"querySelectorAll" : !!document.querySelectorAll,                 // querySelector
		"classList" : !!document.documentElement.classList                // classList
	}
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

// -------- Html

pi.H = {};

/**
 * @name pi.H.append
 * @param {String} elm elm to append
 * @param {String} target target to append
 * @param {String} pos top|down|append
 */
pi.H.append = function (elm, target, pos) {
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
 * @name pi.H.remove
 * @param {String} target elm to remove
 * @param [String] elm container of target
 */
pi.H.remove = function (target, elm) {
	"use strict";
	if(!elm) elm = 'body';
	pi(elm).removeChild( pi(target) );
};

// -------- Event

/**
 * @name event
 */
pi.E = (function () {
	"use strict";
	return {
		eventsArray: {},
		fnArray: {},
		on: function (object, event, callback) {
			var elm = pi(object);

			if (typeof (this.eventsArray[object]) === "undefined") {
				this.eventsArray[object] = {};
				this.fnArray[object] = {};
			}
			if (typeof (this.eventsArray[object][event]) === "undefined") {
				this.eventsArray[object][event] = [];
				this.fnArray[object][event] = [];
			}
			this.eventsArray[object][event].push(callback.toString());
			this.fnArray[object][event].push(callback);
			elm.on(event, callback);
		},
		rm: function (object, event, callback) {
			var elm = pi(object),
				io = this.eventsArray[object][event].indexOf(callback.toString());
			if (io !== -1) {
				this.eventsArray[object][event].splice(io, 1);
				this.fnArray[object][event].splice(io, 1);
				elm.rm(event, callback);
			}
		},
		purge: function (object, event) {
			var callback,
				i,
				l = this.eventsArray[object][event].length,
				elm = pi(object);
			for (i = 0; i < l; i++) {
				callback = this.fnArray[object][event][i];
				elm.rm(event, callback);
			}
			this.eventsArray[object][event] = [];
			this.fnArray[object][event] = [];
		}
	};
}());


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
	if ((typeof (elms) !== 'Object' && elms.length <= 0) || typeof (operation) !== 'string') {
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


// --------- Storage

/**
 * @name pi.S
 */
pi.S = (function () {
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
				pi.D.debug('AGE', age + ' key: ' + key);
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
				set: function (key, value) {
					pi.S.set(this.namespace + key, value);
				},
				get: function (key) {
					return pi.S.get(this.namespace + key);
				},
				del: function (key) {
					pi.S.del(this.namespace + key);
				}
			};
		}
	};
}());

// ---------- Ajax

/**
 * @name pi.A
 * @param {Object}
 * @param {String} params.type
 * @param {String} params.url
 * @param {Function} params.success
 * @param {Function} params.error
 * @param {String} [params.params]
 * @param {Number} [params.ttl] time to live for caching
 */
pi.A = function (params) {
	"use strict";
	var r = new XMLHttpRequest(),
		cache = pi.S.cache(params.type + params.url);
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
		pi.S.cache(params.type + params.url, r.responseText, (params.ttl || 1000 * 60));
		params.success(r.responseText);
	};
	r.send(params.params || "");
};



//
//
// -- utils --
// pub/sub/unsub, lazyload, route
//
//



/*!
 *
 *
 * simple pub sub
 *
 *
 */

pi.T = (function () {
	var topics = {};
	return {
		/**
		 * @name pi.T.pub
		 * @param {String} topic
		 * @param {Array} args arguments
		 */
		pub: function (topic, args) {
			"use strict";
			if (topics[topic]) {
				var thisTopic = topics[topic],
					thisArgs = args || [],
					k,
					j;
				for (k = 0, j = thisTopic.length; k < j; k++) {
					pi.D.debug('PUB', topic);
					thisTopic[k].apply(pi, thisArgs);
				}
			}
		},
		/**
		 * @name pi.T.sub
		 * @param {String} topic
		 * @param {Object} callback
		 */
		sub: function (topic, callback) {
			"use strict";
			if (!topics[topic]) {
				topics[topic] = [];
			}
			pi.D.debug('SUB', topic);
			topics[topic].push(callback);
			return {
				topic: topic,
				callback: callback
			};
		},
		/**
		 * @name pi.T.unsub
		 * @param {String} handle.topic
		 * @param {Object} handle.callback
		 */
		unsub: function (handle) {
			"use strict";
			var topic = handle.topic,
				thisTopic = [],
				y,
				w;
			if (topics[topic]) {
				thisTopic = topics[topic];
				for (y = 0, w = thisTopic.length; y < w; y++) {
					if (thisTopic[y] === handle.callback) {
						pi.D.debug('DEL', topic);
						thisTopic.splice(y, 1);
					}
				}
			}
		}
	};
}());

/*!
 *
 *
 * route
 *
 *
 */

/**
 * @name pi.R
 * @desc simple route ( #/action/arg1/arg2
 *
 * @example pi.R.add('news', theCallback)
 */
pi.R = (function () {
	"use strict";
	var routes = [];
	function process(action) {
		var hash = location.hash.substr(3).split('/'),	//remove #!/
			i = 0,
			r = {};
		if (typeof (action) === 'string' && hash[0] === '') {
            hash = action.split('/');
		}
		for (i = 0; i < routes.length; i++) {
			r = routes[i];
			if (r.r === hash[0]) {
				r.c.apply(pi, hash);
			}
		}
	}
	window.addEventListener("hashchange", process, false);
	// start
	return {
		/**
		 * @name add
		 * @param {String} route
		 * @param {Function} callback
		 */
		add: function (route, callback) {
			var rotta = { r : route, c : callback };
			routes.push(rotta);
		},
		bundle: function (routes) {
			var j = 0,
				r = {};
			for (j = 0; j < routes.length; j++) {
				r = routes[j];
				this.add(r.route, r.callback);
			}
		},
		start: function (action) {
			process(action);
		}
	};
}());

// -- eof
