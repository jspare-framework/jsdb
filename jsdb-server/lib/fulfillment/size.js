const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity');

module.exports = {

	roles : [ 'grantAll', 'grantMngDomain', 'grantQuery',
				'grantQuery::instance', 'grantQuery::instance::domain' ],
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
		
		_holder.readObject(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMapFileDir(data.instance, data.domain), (err, domainMap) => {
			
			callback(_.noop(), {
				'size' : Object.keys(domainMap).length
			});
		});
	},
	rollback : function(transaction, error){
	}
}