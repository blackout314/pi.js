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
	if (!elm) {
        elm = 'body';
    }
	pi(elm).removeChild(pi(target));
};
