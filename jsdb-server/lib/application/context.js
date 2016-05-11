const /*--- Declaring imports ---*/
	
	_ = require('underscore'),
	_moment = require('moment'),
	_utils = require('./../tools/utils'),
	_reflections = require('./../tools/reflections');
	
var _context = {
	
	'status' : {
		'state' : 'STOPED',
		'started' : null
	}
};

module.exports = {

	setContext : function(context) {
		
		if(context){
			
			_.extend(_context, context);
		}
		return this;
	},

	getContext : function() {

		return _context;
	},

	getAttribute : function(key) {
		
		var value = _context[key];
		if(_.isEmpty(value)){
			
			return false;
		}
		
		return _context[key];
	},

	setAttribute : function(key, value) {

		_reflections.index(_context, key, value);
		return this;
	}
};