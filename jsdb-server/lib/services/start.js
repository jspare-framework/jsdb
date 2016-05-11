const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_env = require('./../application/environment'),
	_application = require('./../application/context'),
	_definitions = require('./../application/definitions'),
	_server = require('./../transport/server'),
	_utils = require('./../tools/utils'),
	_start = {
		
		loader : function(){
			
			_env.load();
		}
};

module.exports = {

		
	execute : function(){

		_start.loader();
		
		_server.start();
		
		_application.setAttribute('status.state', _definitions.statusState.STARTED);
		_application.setAttribute('status.started', _utils.now());
	}
};