var /* Declaring imports */

	_options = {
			currentLocale : "ptBR",
			locales : [ "ptBR", "enUS" ]
	},
	_data = {};

module.exports = {
		
	configure : function(options){
		
		_options = options;
	},
	setLocale : function(locale){
		
		_options.currentLocale = locale;
	},
	
	getLocales : function(){
		
		return _options.locales;
	},
		
	load : function(name, module){
		
		_data[name] = {};
		
		for(var i = 0; i < _options.locales.length; i++){
			
			var l = _options.locales[i];
			_data[name][l] = require(module + l + '.json');
		}
		return this;
	},
	
	get : function(name, locale){
		
		locale = locale || _options.currentLocale;
		
		return _data[name][locale];
	}
};