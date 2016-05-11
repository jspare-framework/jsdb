const /*--- Declaring imports ---*/

	_zlib = require('zlib'),
	_defaultOptions = { 
		windowBits: 15, 
		memLevel: 16 >> 1 
	};

module.exports = {
		
	deflate : function(data, options) {
		
		if(!options){
			
			options = _defaultOptions;
		} 
	
		return _zlib.deflateSync(data, options);;
	},

	inflate : function(data, options) {
		
		if(!options){
			
			options = _defaultOptions;
		} 
		
		return _zlib.inflateSync(data, options);;
	}
};