const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_reduceFuture = require('reduce-future'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity');

module.exports = {

	roles : [ 'grantAll', 'grantMngDomain', 'grantRemove',
				'grantRemove::instance', 'grantRemove::instance::domain' ],
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

			if(!domainMap[data.key]){
				
				callback(new _error.BusinessError("KEYNF"));
				return;
			}
			
			var fileReference = domainMap[data.key];
			var filePath = _path.buildDomainDataFileDir(data.instance, data.domain, fileReference);
			
			_holder.readObject(_identity.DATA_HOLDER_IDENTITY, filePath, (err, storage) => {
				
				delete domainMap[data.key];
				delete storage[data.key];
				
				_holder.store(_identity.MAP_HOLDER_IDENTITY, filePath, storage);
				_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMapFileDir(data.instance, data.domain), domainMap);
				
				callback();
			});
		});
	},
	rollback : function(transaction, error){
	}
}