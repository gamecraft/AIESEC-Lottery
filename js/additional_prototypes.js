/**
 * Format function that replace placeholders in strings with values
 * Usage : "This is {0} formatted {1}".format("a", "string");
 **/
String.prototype.format = function() {
	var formatted = this, len = arguments.length, i = 0, regexp = null;
	for(i; i < len; i++) {
		regexp = new RegExp('\\{' + i + '\\}', 'gi');
		formatted = formatted.replace(regexp, arguments[i]);
	}
	return formatted;
};

String.prototype.removeWhiteSpace = function() {
	return this.replace(/\s/g, "");
};

Number.prototype.times = function(f) {
	var i = 0;
	for(i; i < this; i++) {
		(function(num, that) {
			f.apply(num, [that]);
		})(i, this);
	}
};
