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

	roles : [ 'grantAll', 'grantMngSecurity', 'grantRemoveUser' ],
	execute : function(transaction, callback) {
		
		var key = transaction.getData();

		 _holder.readObject(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), (err, data) => {
			 
			 if(err){
				 
				 callback(err);
				 return;
			 }
			
			 var user = data[key];
				
			if(_.isEmpty(user)){
				
				callback(new _error.EnvironmentError('SCYUNF'));
				return;
			}
			if(user.name === 'root'){
				
				callback(new _error.EnvironmentError('SCYRDEL'));
				return;
			}
			
			delete data[key];
			_holder.store(HOLDER_IDENTITY, _path.buildCredentialsFileDir(), data);
			
			callback(_.noop(), _.noop());
		});
	}
}