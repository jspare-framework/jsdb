(function() {
	var regMetaChars = /[-\\^$*+?.()|[\]{}]/g;
	String.prototype.replaceAll = function(needle, replacement) {
		return this.replace(new RegExp(needle.replace(regMetaChars, '\\$&'),
				'g'), replacement);
	};

	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] !== 'undefined' ? args[number] : match;
		});
	};
}());