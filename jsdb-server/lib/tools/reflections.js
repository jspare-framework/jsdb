const /*--- Declaring imports ---*/

	_ = require('underscore');

module.exports = {

	index : function(obj, is, value) {
		if (typeof is == 'string')
			return this.index(obj, is.split('.'), value);
		else if (is.length == 1 && value !== undefined)
			return obj[is[0]] = value;
		else if (is.length == 0)
			return obj;
		else
			return this.index(obj[is[0]], is.slice(1), value);
	}
};