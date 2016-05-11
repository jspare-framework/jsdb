const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path');

module.exports = {

	roles : [ 'grantAll', 'grantMngDomain', 'grantRemoveDomain', 'grantRemoveDomain::instance' ],
	validateRequest : function(data){
		
		return !_.isEmpty(data);
	},
	
	execute : function(transaction, callback) {
		
		var data = transaction.getData();
		
		if(!_io.exist(_path.buildInstanceDomainsDir(data.instance))){
			
			callback(new _error.BusinessError('INSTNFD'));
			return;
		}
		if(!_io.exist(_path.buildDomainDataDir(data.instance, data.domain))){
			
			callback(new _error.BusinessError('DMNNFD'));
			return;
		}
		
		_io.removeDir(_path.buildDomainDir(data.instance, data.domain));

		callback();
	},
	rollback : function(transaction, error) {
	}
}