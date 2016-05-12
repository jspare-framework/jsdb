const /* Declaring imports */ 
	_ = require('underscore'),
	_appRoot = require('app-root-path').path,
	_io = require('./../storage/io')
	_configFile = '/config.json',
	_fn = {
		
		load : function(){

			if(!_.isEmpty(_config)){
				
				return;
			} 

			_config = _defaultConfig;
				
			//Read config.json from root path
			var dir = _appRoot + _configFile;
			var content = _io.readSync(dir, false);
			
			try {
				
				content = JSON.parse(content);
			} catch (e) {

				console.warn('config: founded config.json, but are invalid format, using default config.');
				content = {};
			}
			
			if(!_.isEmpty(content)){
				
				_.extend(_config, content);
			}
		},
		get : function(key, def){
			
			this.load();
			return _config[key] === false ?  false : _config[key] || def;
		},
		setConfigFile : function(file){
			
			_configFile = file;
		}
	},
	_defaultConfig = {
	
			"name": "JSDB",
			"logger": 
			{
				"debug": false,
				"webpanel": true
			},
			"server": 
			{
				"port": 5732,
				"security": 
				{
					"enable": false,
					"privateKey": "",
					"certificate": ""
				},

				"cluster": 
				{
					"enable": false
				}
			},
			"entitlements": 
			{
				"allowRoot": true
			},
			"persistance": 
			{
				"maxPersistSize": "512mb"
			},
			"monitoring": true
		};

var _config;

var console = process.console || global.console;

module.exports = {

	load : _fn.load,
	get : _fn.get,
	setConfigFile : _fn.setConfigFile
};