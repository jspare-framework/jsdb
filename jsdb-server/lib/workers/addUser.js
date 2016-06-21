const /* Declaring imports */

	User = require('./model/user'),

	_ = require('underscore'),
	_error = require('./../application/error'),
	_holder = require('./../storage/holder'),
	_path = require('./../storage/path'),
	_token = require('./../tools/token'),
	_utils = require('./../tools/utils'),
	_identity = require('./../storage/identity');

module.exports = {

	roles : [ 'grantAll', 'grantMngSecurity', 'grantAddUser' ],
	
	validateRequest : function(data){
		
		if(!data.name){
			
			return false;
		}
		if(!data.roles){
					
			return false;
		}
		
		return true;
	},
	
	execute : function(transaction, callback) {
		
		var user = transaction.getData();
		
		var entity = new User(_token.generateToken(), user.name, user.mail, user.roles, _utils.now());

		_holder.readObject(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), (err, data) =>{
			
			var contains = _.filter(data, function(u, i) {
				return u.name === entity.name;
			});

			if (!_.isEmpty(contains)) {

				if (entity.name === 'root') {

					onError(new _error.EnvironmentError('SCYROT'));
					return;
				}
				entity.token = _.first(contains).token;
			}

			data[entity.token] = entity;

			_holder.store(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), data);
				
			callback( _.noop(), {
				'token' : entity.token
			});
		});
	},
	rollback : function(transaction, error) {
		
		//TODO operation need transaction copy state
	}
}