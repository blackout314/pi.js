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
