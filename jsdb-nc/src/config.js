var
	_jsonfile = require('jsonfile'),
	_osenv = require('osenv'),
	_keyPath = '/.jsdb/credentials',
	_superUserKey = 'super';
	_connection = {
		"host" : "http://127.0.0.1",
		"port" : 5732,
		"instance" : "public"
	},
	_auth = {
		"token" : null,
	},
	

module.exports = {
		
	connection : function(connection){
		
		_connection = connection;

		return this;
	},
	
	auth : function(auth){
		
		if(auth === null){
			auth = loadDiskCredentials();
		}
		
		_auth = auth;
		
		return this;
	},
	
	getConection : function(){
		
		return _connection;
	},
	
	getAuth : function(){
		
		return _auth;
	}
};