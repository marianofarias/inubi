/**
 * jQuery.forEach
 * generic forEach iterator for jQuery
 * https://github.com/rosamez/jquery.forEach
 * Licensed under the MIT license
 */
(function ($, undefined) {
	var version = "1.1", log = (window.console && window.console.log) || function () {};

	if ($.forEach || $.fn.forEach) {
		log("jQuery has its own forEach now?!");
		return;
	}

	$.forEach = function (obj, func, scope, mirror) {//-{{{
		var type = $.type, i = 0, n = 0, l;
		if (obj === undefined || obj === null) {
			log("$.forEach: undefined or null param passed; please trace.");
		} else if (type(obj.forEach) === "function") {
			// native; core js 1.5 spec; tested with Opera10, FF35, recent
			// Webkits; IE8 is still garbage
			obj.forEach(func, scope);
		} else if (type(obj) === "string") {
			// since FF3.5 hates the while-way and has no native
			// string iterator, it's better to have it this way
			for (i = 0, l = obj.length; i < l; i++) {
				func.call(scope, obj.charAt(i), i);
			}
		} else if ($.isArray(obj)) {
			// since FF has native forEach, the while speedup is useful here
			// though the common while(l--) would do reverse iteration
			l = obj.length;
			while (i !== l) {
				func.call(scope, obj[i], i++);
			}
		} else if (type(obj) === "object") {
			if (obj instanceof $) {
				// proxy for the jQuery internal "each"
				obj.each(function (index, item) {
					func.call(scope, item, index);
				});
			} else {
				// plain object
				for (i in obj) {
					if (obj.hasOwnProperty(i)) {
						func.call(scope, obj[i], i, n++);
					}
				}
			}
		}
		return mirror;
	};//}}}

	$.fn.forEach = function (func, scope) {
		return $.forEach(this.toArray(), func, scope, this);
	};

	$.forEach.version = version;

}(jQuery));
// :wrap=none:collapseFolds=0:mode=javascript:tabSize=4:indentSize=4:folding=explicit: