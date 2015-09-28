/*!
 *
 *
 * simple pub sub
 *
 *
 */

pi.T = (function () {
    "use strict";
	var topics = {};
	return {
		/**
		 * @name pi.T.pub
		 * @param {String} topic
		 * @param {Array} args arguments
		 */
		pub: function (topic, args) {
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
