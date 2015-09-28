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
