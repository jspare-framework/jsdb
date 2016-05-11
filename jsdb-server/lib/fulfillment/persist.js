const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_rf = require('reduce-future'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'),
	_identity = require('./../storage/identity'),
	_holder = require('./../storage/holder'),
	_path = require('./../storage/path');

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
		
		var entity = {
			'key' : data.key,
			'data' : data.entity
		};
		
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
				
				var existEntity = domainInfo.map[entity.key] ? true : false;
				var fileReference = domainInfo.map[entity.key];
				
				if(domainInfo.meta.lastReference && _io.exist(domainInfo.meta.lastReference)){
					
					var filePath = _path.buildDomainDataFileDir(data.instance, data.domain, fileReference);
					
					var lastReferenceFileStat = _io.stat(filePath);
					var sizePrediction = lastReferenceFileStat.size  + Buffer.byteLength(JSON.stringify(entity), 'utf8');
					
					if(sizePrediction < _identity.DATA_HOLDER_IDENTITY.maxFileSize){
						
						fileReference = domainInfo.meta.lastReference;
					}
				}
				
				if(!fileReference){
					
					var domainPhysicalFilesCount = _io.listFiles(_path.buildDomainDataDir(data.instance, data.domain)).length;
					
					var fileName = data.domain + '_' + (domainPhysicalFilesCount + 1);
					fileReference = _path.buildFileReference(fileName);
				}
				
				var filePath = _path.buildDomainDataFileDir(data.instance, data.domain, fileReference);
				
				_holder.readObject(_identity.DATA_HOLDER_IDENTITY, filePath, (err, domainData) => {
					
					if(existEntity){
						
						_.extend(domainData[entity.key], entity.data);
					}else{
						
						domainData[entity.key] = entity.data;
						domainInfo.map[entity.key] = fileReference;
					}
					
					//Set the current path of this domain.
					domainInfo.meta.lastReference = fileReference;
		
					_holder.store(_identity.DATA_HOLDER_IDENTITY, filePath, domainData);
					_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMetaFileDir(data.instance, data.domain), domainInfo.meta);
					_holder.store(_identity.MAP_HOLDER_IDENTITY, _path.buildDomainMapFileDir(data.instance, data.domain), domainInfo.map);
					
					callback();
				});
			});

	},
	rollback : function(transaction, error){
	}
}