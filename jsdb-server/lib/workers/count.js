const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_rf = require('reduce-future'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_holder = require('./../storage/holder'),
	_dataQuery = require('./database/data.query'),
	_identity = require('./../storage/identity');

module.exports = {

	roles : [ 'grantAll', 'grantMngDomain', 'grantQuery',
				'grantQuery::instance', 'grantQuery::instance::domain' ],
	execute : function(transaction, callback) {

		var data = transaction.getData();
		var domainPhysicalFiles = _io.listFiles(_path.buildDomainDataDir(data.instance, data.domain));
		
		_rf.reduce({})
			.addAll(domainPhysicalFiles)
			.next(function(fileReference, context, next, fail){
				
				var filePath = _path.buildDomainDataDir(data.instance, data.domain);
				filePath += _path.SEPARATOR;
				filePath += fileReference;
				
				_holder.readObject(_identity.MAP_HOLDER_IDENTITY, filePath, (err, domainData) => {
					
					var domainDataFiltered = _dataQuery.apply(domainData, data.filter);
					
					_.extend(context, domainDataFiltered);
					next(context);
				});
			})
			.error(function(error){
				
				callback(new _error.BusinessError(error));
			})
			.done(function(context){
				
				callback(_.noop(), Object.keys(context).length);
			});
	},
	rollback : function(transaction, error){
	}
}