const /*--- Declaring imports ---*/
	
	_ = require('underscore'),
	_package = require('./../../package.json'),
	_definitions = require('./../application/definitions'),
	_context = require('./../application/context'),
	_error = require('./../application/error'),
	_logger = require('./../application/logger'),
	_path = require('./../storage/path'),
	_io = require('./../storage/io'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity'),
	_utils = require('./../tools/utils'),
	_token = require('./../tools/token');

var _core = {
		
	_validateVersion : function(masterKey){
		
		if(masterKey.version !== _package.version){
			
			var ex = new _error.EnvironmentError('MKYDIF');
			_logger.error('Error Code: [%s] Message: [%s]', ex.name, ex.message);
			process.exit(1);
		}
	}
};

module.exports = {

	load : function(){
		
		_holder.readObject(_identity.KERNEL_HOLDER_IDENTITY, _path.buildMasterKeyFileDir(), (err, masterKey)=> {
			
			if(err || _.isEmpty(masterKey)){
				
				var ex = new _error.EnvironmentError('MKYNFD');
				_logger.error('Error Code: [%s] Message: [%s]', ex.name, ex.message);
				process.exit(1);
			}
			
			_context.setAttribute('masterKey', masterKey);
		});
	},	
	
	install : function(){
		
		_logger.info('building directories');
		
		//Build the master metadata directory
		_io.load(_path.buildMasterKeyDir());
		
		//Build the storage data directory
		_io.load(_path.buildStorageDir());
		
		//Build the tid tracker directory
		_io.load(_path.buildTidTrackerDir());
		
		_logger.info('installing master key');
		_holder.readObject(_identity.KERNEL_HOLDER_IDENTITY, _path.buildMasterKeyFileDir(), (err, masterKey)=> {
			
			if(_.isEmpty(masterKey)){
				
				masterKey = {
						key : _token.generateToken(),
						owner : _utils.getSystemUsername(),
						version : _package.version,
						timestamp : _utils.now()
				};
				
				_holder.store(_identity.KERNEL_HOLDER_IDENTITY,_path.buildMasterKeyFileDir(), masterKey);
				
				_logger.info('master key generated and stored.');
			}else{
				
				_logger.warn('master key already installed.');
			}
			//Put masterkey on context
			_context.setAttribute('masterKey', masterKey);
		});
	}
};