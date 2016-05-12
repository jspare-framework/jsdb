'use strict';

var /* Declaring Imports */
	
	_ = require('underscore'),
	_jsonfile = require('jsonfile'),
	_osenv = require('osenv'),
	_keyPath = '/.jsdb/credentials',
	
	DEFAULT_REFERENCE = 'DEFAULT',
	
	_fn = {
	
		loadDiskCredentials : function(dataSource){
		
			var path = _osenv.home();
			path += _keyPath;
		
			var credentials = null;
			try {
				credentials = _jsonfile.readFileSync(path, "utf8")
			} catch (e) {
				if (e.code !== 'ENOENT') {
					throw e;
				}
				throw 'Cannot find authentication key on ' + path;
			}
			
			var credentialKey = credentials[dataSource.instance];
			if(_.isEmpty(credentialKey)){
				
				credentialKey = credentials[DEFAULT_REFERENCE];
				if(!_.isEmpty(credentialKey)){
					
					console.warn('Using default user on credentials file, consider set one user for your instance.');
					return credentials[DEFAULT_REFERENCE];
				} 
				
				throw 'Cannot find authentication for instance ' + dataSource.instance;
			}
	
			return credentialKey;
		}
	};

function Credential(dataSource, token) {
	
	if(_.isEmpty(token) && _.isEmpty(dataSource)){
		
		throw 'DataSource cannot be null';
	}
	
	this.token = token || _fn.loadDiskCredentials(dataSource);
}

module.exports = Credential;