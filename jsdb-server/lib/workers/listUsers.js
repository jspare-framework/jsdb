const /* Declaring imports */
	_ = require('underscore'),
	_holder = require('./../storage/holder'),
	_path = require('./../storage/path'),
	_identity = require('./../storage/identity');

module.exports = {

	roles : [ 'grantAll', 'grantAddInstance' ],
	execute : function(transaction, callback) {

		_holder.readObject(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), (err, users) => {
			
			if(err){
				
				callback(err);
				return;
			}
			
			callback(_.noop(), users);
		});
	}
}