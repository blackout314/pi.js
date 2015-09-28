/**
 * @name pi.A
 * @param {Object}
 * @param {String} params.type
 * @param {String} params.url
 * @param {Boolean} params.withCredentials activate XMLHR.withCredentials
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
    if (params.withCredentials) {
        r.withCredentials = true;
        delete (params.withCredentials);
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
