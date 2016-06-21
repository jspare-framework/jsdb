const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_context = require('./../application/context'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_cipher = require('./../tools/cipher');

module.exports = {

	roles : [ 'grantAll', 'grantMngInstance', 'grantListDomains',
				'grantListDomains::instance' ],
	execute : function(transaction, callback) {
		
		var instance = transaction.getData();

		if(!_io.exist(_path.buildInstanceDomainsDir(instance))){
			
			callback(new _error.BusinessError('INSTNFD'));
			return;
		}
		var list = _io.list(_path.buildInstanceDomainsDir(instance));
		
		var masterKey = _context.getAttribute('masterKey').key;
		var translatedList = [];
		
		_.each(list, function(d){
			translatedList.push(_cipher.decryptText(d, masterKey));
		});

		callback(_.noop(), { 'domains' : translatedList });
	},
	rollback : function(transaction, error) {
	}
}