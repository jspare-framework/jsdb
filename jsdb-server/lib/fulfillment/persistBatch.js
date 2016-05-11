const /*--- Declaring imports ---*/

	Package = require('./model/package'),
	
	_ = require('underscore'),
	_rf = require('reduce-future'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_path = require('./../storage/path'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity');

var console = process.console || global.console;

module.exports = {

	roles : [ 'grantAll', 'grantMngDomain', 'grantPersist',
				'grantPersist::instance', 'grantPersist::instance::domain' ],
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
		
		var domainRequest = [ {
			'name' : 'meta',
			'path' : _path.buildDomainMetaFileDir(data.instance, data.domain)
		}, {
			'name' : 'map',
			'path' : _path.buildDomainMapFileDir(data.instance, data.domain)
		} ];
		
		var domainInfo = {};
		_rf.reduce(domainInfo)
			.addAll(domainRequest)
			.next((request, context, next, fail)=> {
			
				_holder.readObject(_identity.MAP_HOLDER_IDENTITY, request.path, (err, data)=>{
					
					if(err){
						
						fail(err);
						return;
					}
					
					context[request.name] = data;
					next(context);
				});
			})
			.error((err)=>{
				
				callback(err);
			})
			.done((domainInfo) => {
				
				var insertCount = 0;
				var updateCount = 0;
				
				var existingEntities = {};
				var newEntities = {};
				
				function mapExistingEntity(existingEntities, key, entity){
					
					if(!existingEntities[domainInfo.map[key]]){
						
						existingEntities[domainInfo.map[key]] = {};
					}
					
					existingEntities[domainInfo.map[key]][key] = entity;
				}
				
				_.each(data.entities, function(entity, key){
					
					//Entity already on domain
					if(domainInfo.map[key]){
						
						updateCount++;
						mapExistingEntity(existingEntities,key, entity);

					//New entity on domain
					}else{

						insertCount++;
						newEntities[key] = entity;
					}
				});
				
				
				var reduceEntities = _rf.reduce({});
				
				//Process existingEntities
				//XXX Parallel processing
				_.each(existingEntities, function(objectDomain, fileReference){
					
					var filePath = _path.buildDomainDataFileDir(data.instance, data.domain, fileReference);
					
					_holder.readObject(_identity.DATA_HOLDER_IDENTITY, filePath, (err, storage) => {
						
						//TODO FIXME FATAL ERROR
						if(err) console.error(err);
						
						_.extend(storage, objectDomain);
						_holder.store(_identity.DATA_HOLDER_IDENTITY, filePath, storage);
					});
				});
				
				//Packages with entities splited by size
				var packages = [];
				var currentPackage = new Package();
				
				_.each(newEntities, function(entity, key){

					currentPackage.values[key] = entity;
					
					currentPackage.size += Buffer.byteLength(JSON.stringify(entity));
					if(currentPackage.size > _identity.DATA_HOLDER_IDENTITY.maxFileSize){
						
						packages.push(_.clone(currentPackage.values));
						currentPackage = new Package();
					}
				});
				
				if(Object.keys(currentPackage.values).length !== 0){
					
					packages.push(currentPackage.values);
				}
				console.debug('existingEntities ' + Object.keys(existingEntities).length);
				console.debug('newEntities ' + Object.keys(newEntities).length);
				console.debug('batch ' + packages.length);
				
				var domainPhysicalFilesCount = _io.listFiles(_path.buildDomainDataDir(data.instance, data.domain)).length;
				domainPhysicalFilesCount++;
				
				var fileReference = domainInfo.meta.lastReference;
				
				_.each(packages, function(values){
					
					var fileName = data.domain + '_' + (domainPhysicalFilesCount);
					fileReference = _path.buildFileReference(fileName);
					
					_.each(Object.keys(values), function(k){
						
						domainInfo.map[k] = fileReference;
					});
					
					var filePath = _path.buildDomainDataFileDir(data.instance, data.domain, fileReference);
					
					_holder.store(_identity.DATA_HOLDER_IDENTITY, filePath, values);
					
					domainPhysicalFilesCount++;
				});
				
				//Set the current path of this domain.
				domainInfo.meta.lastReference = fileReference;
				
				_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMetaFileDir(data.instance, data.domain), domainInfo.meta);
				_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMapFileDir(data.instance, data.domain), domainInfo.map);
				
				var result = { "inserted" : insertCount, "updated" : updateCount };
				callback(_.noop(), result);
			});
		
	},
	rollback : function(transaction, error){
	}
}