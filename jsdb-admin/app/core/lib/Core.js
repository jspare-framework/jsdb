const /* Imports */
	_ = require('underscore'),
	_modulesList = require('./../../modules/modules'),
	_pluginsList = require('./../../../plugins/plugins');

var _modules, _plugins;

module.exports = {

	loadModules : function() {

		_modules = [];
		_.each(_modulesList.modules, function(m){
			
			_modules.push(require('./../../modules/' + m));
		});
	},
	
	getModules : function(){
		
		return _modules;
	},

	importPlugins : function() {
		_plugins = [];
		_.each(_pluginsList.modules, function(p){
			
			_plugins.push(require('./../../../plugins' + p));
		});
	},
	
	getPlugins : function(){
		
		return _plugins;
	}
};