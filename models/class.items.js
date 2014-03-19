function Class() { "use strict"; }
Class.prototype.construct = function () { "use strict"; };
Class.__asMethod__ = function (func, superClass) {
	"use strict";
	return function () {
		var currentSuperClass = this.$,
			ret = {};
		this.$ = superClass;
		ret = func.apply(this, arguments);
		this.$ = currentSuperClass;
		return ret;
	};
};
Class.extend = function (def) {
	"use strict";
	var classDef = function () {
			if (arguments[0] !== Class) {
				this.construct.apply(this, arguments);
			}
		},
		proto = new this(Class),
		superClass = this.prototype,
		n = '',
		item = '';
	for (n in def) {
		item = def[n];
		if (item instanceof Function) {
			item = Class.__asMethod__(item, superClass);
		}
		proto[n] = item;
	}
	proto.$ = superClass;
	classDef.prototype = proto;
	classDef.extend = this.extend;
	return classDef;
};

var basePath = {
	Base : "../playground/example.json"
};

var Base = Class.extend({
	returned: {},
	construct: function (data) {
		"use strict";

		pi.debug('WHO', this.getId());

		var ok = function (returned) {
			pi.debug('AJAX', returned);
		};
		pi.ajax({
			type: 'GET',
			url: basePath.Base,
			success: ok
		});
	},
	getId: function () {
		"use strict";
		return 'b';
	},
	getVersion: function () {
		"use strict";
		return '0.0.1';
	}
});
