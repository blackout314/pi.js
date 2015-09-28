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
