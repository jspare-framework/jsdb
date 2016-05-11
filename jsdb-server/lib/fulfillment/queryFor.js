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
		
		if(!_io.exist(_path.buildInstanceDomainsDir(data.instance))){
			
			callback(new _error.BusinessError('INSTNFD'));
			return;
		}
		if(!_io.exist(_path.buildDomainDataDir(data.instance, data.domain))){
			
			callback(new _error.BusinessError('DMNNFD'));
			return;
		}
		
		_holder.readObject(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMapFileDir(data.instance, data.domain), (err, domainMap) => {
			
			var domainPhysicalFiles = _io.listFiles(_path.buildDomainDataDir(data.instance, data.domain));

			//MapFind
			if(data.filter.byKey){
				
				var fileReference = domainMap[data.filter.byKey];
				
				if(fileReference){
					
					var filePath = _path.buildDomainDataFileDir(data.instance, data.domain, fileReference);
					
					_holder.readObject(_identity.MAP_HOLDER_IDENTITY, filePath, (err, domainData) => {

						if(err){
							
							callback(err);
							return;
						}
						
						//Follow some patter of query result.
						var result = {};
						result[data.filter.byKey] = domainData[data.filter.byKey];
						callback(_.noop(), result);
						return;
					});
					return;
				}
				callback(_.noop(), {});
				return;
			}
			
			//DataScan
			_rf.reduce({})
				.addAll(domainPhysicalFiles)
				.next(function(fileReference, context, next, fail){
					
					var filePath = _path.buildDomainDataDir(data.instance, data.domain);
					filePath += _path.SEPARATOR;
					filePath += fileReference;
					
					_holder.readObject(_identity.MAP_HOLDER_IDENTITY, filePath, (err, domainData) => {
						
						if(err){
							
							fail(err);
							return;
						}
						
						var domainDataFiltered = _dataQuery.apply(domainData, data.filter);
						
						_.extend(context, domainDataFiltered);
						
						next(context);
					});
				})
				.error(function(error){
					
					callback(new _error.BusinessError(error));
				})
				.done(function(context){
					
					callback(_.noop(), context);
				});
		});
	}
}