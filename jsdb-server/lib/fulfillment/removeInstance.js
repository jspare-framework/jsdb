const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path');

module.exports = {

	roles : [ 'grantAll', 'grantMngInstance', 'grantRemoveInstance',
			'grantRemoveInstanc::instance' ],
	validateRequest : function(data){
		
		return !_.isEmpty(data);
	},
	
	execute : function(transaction, callback) {
		
		var instance = transaction.getData();

		if (!_io.exist(_path.buildInstanceDir(instance))) {

			callback(new _error.BusinessError('INSTNFD'));
			return;
		}

		//TODO check result
		_io.removeDir(_path.buildInstanceDir(instance));

		callback();
	},
	rollback : function(transaction, error) {
	}
}