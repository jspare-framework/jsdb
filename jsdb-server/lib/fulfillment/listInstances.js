const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_context = require('./../application/context')
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_cipher = require('./../tools/cipher');

module.exports = {

	roles : [ 'grantAll', 'grantMngInstance', 'grantListInstances' ],
	execute : function(transaction, callback) {
		
		var list = _io.list(_path.buildStorageDir());
		var masterKey = _context.getAttribute('masterKey').key;
		var translatedList = [];
		_.each(list, function(d){
			translatedList.push(_cipher.decryptText(d, masterKey));
		});

		callback(_.noop(), { 'instances' : translatedList });
	},
	rollback : function(transaction, error) {
	}
}