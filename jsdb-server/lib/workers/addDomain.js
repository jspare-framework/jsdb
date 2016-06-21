const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity');

module.exports = {

	roles : [ 'grantAll', 'grantMngDomain', 'grantAddDomain::instance' ],
	
	validateRequest : function(data){
		
		return !_.isEmpty(data);
	},
	
	execute : function(transaction, callback) {
		
		var data = transaction.getData();
		
		if(!_io.exist(_path.buildInstanceDir(data.instance))){
			
			callback(new _error.BusinessError('INSTNFD'));
			return;
		}
		
		if(_io.exist(_path.buildDomainDataDir(data.instance, data.domain))){
			
			callback(new _error.BusinessError('DMNALR'));
			return;
		}
		
		var result = _io.load(_path.buildDomainDataDir(data.instance, data.domain));
		if(!result){

			callback(new _error.BusinessError('DMNFAL'));
			return;
		}
		
		//TODO LIST DOMAIN Structure
		var defaultMeta = {
			strucuture : 'TODO'
		};
		
		_io.load(_path.buildDomainMetaDir(data.instance, data.domain));
		_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMetaFileDir(data.instance, data.domain), defaultMeta);
		
		_io.load(_path.buildDomainMapDir(data.instance, data.domain));
		_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMapFileDir(data.instance, data.domain), {});
		
		callback();
	},
	rollback : function(transaction, error){
	}
}