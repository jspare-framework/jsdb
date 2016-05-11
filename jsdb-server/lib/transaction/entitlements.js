const /* Declaring imports */
	
	_ = require('underscore'),
	_error = require('./../application/error'),
	_config = require('./../application/config'),
	_holder = require('./../storage/holder'),
	_path = require('./../storage/path'),
	_identity = require('./../storage/identity'),
	_fn = {
		
		buildRoles : function(transaction, roles){
		
			var instance = transaction.getData().instance;
			var domain = transaction.getData().domain;
			
			var buildRoles = [];
			_.each(roles, function(r){
				var role = r;
				if(instance) role = role.replace(":instance", instance);
				if(domain) role = role.replace(":domain", domain);
				buildRoles.push(role);
			});
			
			return buildRoles;
		}
	};

module.exports = {

	validate : function(transaction, executor, callback) {
		
		var entitlementsConfig = _config.get('entitlements');
		
		
		_holder.readObject(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), (err, credentials)=> {
			
			if(!credentials[transaction.getUserToken()]){
				
				callback(new _error.NotAuthorizedError());
				return;
			}
			
			var user = credentials[transaction.getUserToken()];
			var operationRoles = _fn.buildRoles(transaction, executor.roles);

			if(!_.intersection(operationRoles, user.roles).length){
				
				callback(new _error.ForbiddenError());
			}
			if(!entitlementsConfig.allowRoot && user.name === 'root'){
				
				callback(new _error.NotAuthorizedError('Root not authorized'));
				return;
			}
			
			callback();
		});
	}
};