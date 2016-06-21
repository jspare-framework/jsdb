var /* Declaring Imports */

	_ = require('underscore'), 
	_request = require('request'),

	//TODO add options
	DEFAULT_TIMEOUT = 1 * 60 * 1000;

module.exports = {

	request : function(credentials,options, address, method, data, callback) {
		
		var start = new Date().getTime();

		var headers = {
			'User-Agent' : 'JSDB-NC/1.0.0',
			'Content-Type' : 'application/json',
			'x-auth-token' : credentials
		};
		
		var request = {
				'url' : address,
				'method' : method,
				'headers' : headers,
				'json' : data,
				'timeout' : options.timeout || DEFAULT_TIMEOUT
		};
		_.extend(request, options);
		_request(request, function(err, response, body) {

			if(process.env.NODE_ENV !== 'production'){
				var end = new Date().getTime();
				console.info('[jsdb-nc] - status [%s] - resp. time [%s ms]',err ? 'ERROR' : response.statusCode, (end - start));
			}
			
			if(callback){
				
				try {
					body = JSON.parse(body)
				} catch (e) {
					
					body = body || '{}';
				}
				callback((err || _.noop()), body);
			}
		});
	}
};
