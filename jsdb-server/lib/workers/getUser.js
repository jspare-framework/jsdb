const /* Declaring imports */
	_ = require('underscore'),
	_error = require('./../application/error'),
	_holder = require('./../storage/holder'),
	_path = require('./../storage/path'),
	_identity = require('./../storage/identity');
	

module.exports = {

	roles : [ 'grantAll', 'grantMngSecurity', 'grantGetUser' ],
	execute : function(transaction, callback) {

		//XXX Add byName and byMail
		var userFilter = transaction.getData();

		_holder.readObject(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), (err, credentials)=>{
			
			if(err){
				
				callback(err);
				return;
			}
			
			var user = credentials[userFilter.key];
			if(!user){
				
				callback(new _error.BusinessError('SCYUNF'));
				return;
			}
			
			callback(_.noop(), user);
		});
	}
}