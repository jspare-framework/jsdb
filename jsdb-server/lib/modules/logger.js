const /*--- Declaring imports ---*/
	
	_ = require('underscore'),
	_scribe = require('scribe-js')();
	_config = require('./../application/config'),
	_server = require('./../transport/server'),
	_entitlements = require('./../transaction/entitlements');

module.exports = {
	
	load : function(){
		
		var loggerConfig = _config.get('logger');

		if(loggerConfig.webpanel){
			
			var auth = function(req, res, next) {
			
		      if (!req.query.token) {
		    	  res.writeHead(401);
		    	  res.end('Not authorized');
		    	  return;
		      }
		      //XXX Validate crendetials
		      if(!_entitlements.validateUser(req.query.token)){
		    	  res.writeHead(403);
		    	  res.end('Forbidden');
		    	  return;
		      }
		      next();
		    };
			
		    //TODO fix middleware auth
			_server.addResource(new _server.Resource('webpanel', '/audit', _scribe.webPanel));
		}
		
		process.console.addLogger('info');
		process.console.addLogger('log');
		process.console.addLogger('warn', 'yellow');
		process.console.addLogger('error', 'red');
		process.console.addLogger('audit', 'gray', {
			logInConsole: false,
			defaultTags : ['audit']	
		});
		process.console.addLogger('monitoring', 'inverse', {
			logInConsole: false,
			defaultTags : ['monitoring']	
		});
		
		process.console.addLogger('debug', 'green', {
	        logInConsole: loggerConfig.debug
		});
	}
};