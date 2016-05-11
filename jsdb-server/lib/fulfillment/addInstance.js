const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity');

module.exports = {

	roles : [ 'grantAll', 'grantAddInstance' ],
	
	validateRequest : function(data){
		
		return !_.isEmpty(data);
	},
	
	execute : function(transaction, callback) {
		
		var instance = transaction.getData();
		
		if(_io.exist(_path.buildInstanceDir(instance))){
			
			callback(new _error.BusinessError('INSTALR'));
			return;
		}
		
		var result = _io.load(_path.buildInstanceDir(instance));
		if(!result){

			callback(new _error.BusinessError('INSTFAL'));
			return;
		}
		
		var defaultMeta = {
			maxSize : Infinity
		};
		_io.load(_path.buildInstanceMetaDir(instance));
		_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildInstanceMetaFileDir(instance), defaultMeta);
		
		callback();
	},
	rollback : function(transaction, error){
	}
}