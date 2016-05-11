const /*--- Declaring imports ---*/

	_install = require('./services/install'),
	_uninstall = require('./services/uninstall'),
	_start = require('./services/start'),
	_stop = require('./services/stop'),
	_server = require('./transport/server');

module.exports = {
		
	install : function(){
		
		_install.execute();
	},
	
	uninstall : function(){
		
		_uninstall.execute();
	},
		
	start : function(){
		
		_start.execute();
	},
	
	stop : function(token){
		
		_stop.execute(token);
	},
	router : function(){
		
		return _server.router();
	}
};