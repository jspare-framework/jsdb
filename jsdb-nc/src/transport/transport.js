var /* Declaring Imports */

	_ = require('underscore'),
	_xService = require('./xService'),
	_mappings = require('./mapping.json'),

	_fn = {
	
		prepareUrl : function(dataSource, name, parameters){
			var address = dataSource.host;
			address += ":";
			address += dataSource.port;
			address += _mappings[name].url;
			for(k in parameters){
				address = address.replace(new RegExp((':' + k).replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), parameters[k]);
			}
			return address;
		}
};

module.exports = {
	
	execute : function(dataSource, credential, options, name, parameters, data, callback){
		
		var address = _fn.prepareUrl(dataSource, name, parameters),
			method  = _mappings[name].method;
		
		_xService.request(credential.token, options, address, method, data, function(err, result) {
			
			if(callback && _.isFunction(callback)){
				
				callback((err || _.noop()), result);
			}
		});
	}
};