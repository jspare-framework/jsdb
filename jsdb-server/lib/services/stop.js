const /*--- Declaring imports ---*/

	_ = require('underscore'), 
	_config = require('./../application/config'),
	_logger = require('./../application/logger'),
	_request = require('request');

module.exports = {

	execute : function(token) {
		
		if(_.isUndefined(token) || _.isNull(token)){
			
			throw 'Token need be informed for stop JSDB instance';
		}

		_logger.log('Stopping JSDB');
		
		var url = 'http://127.0.0.1:' + _config.get('server').port + '/stop';
		
		_request(
				{
					headers : { 'x-auth-token' : token },
					method : 'POST',
					uri : url
				},
				function(error, response, body) {
					
					if(_.isUndefined(response)){
						_logger.log('JSDB is not running on port: %s', context.port);
						return;
					}
					
					if (response.statusCode == 200) {
						_logger.log('JSDB will be stopped');
					} else {
						_logger.log('error: ' + response.statusCode)
						_logger.log(body)
					}
				})
	}
};