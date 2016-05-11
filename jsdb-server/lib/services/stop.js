const /*--- Declaring imports ---*/

	_ = require('underscore'), 
	_config = require('./../application/config'),
	_request = require('request');

var console = process.console || global.console;

module.exports = {

	execute : function(token) {
		
		if(_.isUndefined(token) || _.isNull(token)){
			
			throw 'Token need be informed for stop JSDB instance';
		}

		console.log('Stopping JSDB');
		
		var url = 'http://127.0.0.1:' + _config.get('server').port + '/stop';
		
		_request(
				{
					headers : { 'scy-tkn-auth' : token },
					method : 'POST',
					uri : url
				},
				function(error, response, body) {
					
					if(_.isUndefined(response)){
						console.log('JSDB is not running on port: %s', context.port);
						return;
					}
					
					if (response.statusCode == 200) {
						console.log('JSDB will be stopped');
					} else {
						console.log('error: ' + response.statusCode)
						console.log(body)
					}
				})
	}
};