const /*--- Declaring imports ---*/
	
	_ = require('underscore'),
	_definitions = require('./../application/definitions'),
	_context = require('./../application/context'),
	_error = require('./../application/error'),
	_path = require('./../storage/path'),
	_io = require('./../storage/io'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity'),
	_utils = require('./../tools/utils'),
	_token = require('./../tools/token');

var console = process.console || global.console;

module.exports = {

	load : function(){
		
		_holder.readObject(_identity.KERNEL_HOLDER_IDENTITY, _path.buildMasterKeyFileDir(), (err, masterKey)=> {
			
			if(err || _.isEmpty(masterKey)){
				
				var ex = new _error.EnvironmentError('SCYNFD');
				console.error('Error Code: [%s] Message: [%s]', ex.name, ex.message);
				process.exit(1);
			}
			
			_context.setAttribute('masterKey', masterKey);
		});
	},	
	
	install : function(){
		
		console.tag('jsdb').info('building directories');
		
		_io.load(_path.buildMasterKeyDir());
		
		_io.load(_path.buildStorageDir());
		
		console.tag('jsdb').info('installing master key');
		
		_holder.readObject(_identity.KERNEL_HOLDER_IDENTITY, _path.buildMasterKeyFileDir(), (err, masterKey)=> {
			
			if(_.isEmpty(masterKey)){
				
				masterKey = {
						key : _token.generateToken(),
						owner : _utils.getSystemUsername(),
						timestamp : _utils.now()
				};
				
				_holder.store(_identity.KERNEL_HOLDER_IDENTITY,_path.buildMasterKeyFileDir(), masterKey);
				
				console.tag('jsdb').info('master key generated and stored.');
			}else{
				
				console.tag('jsdb').warn('master key already installed.');
			}
			//Put masterkey on context
			_context.setAttribute('masterKey', masterKey);
		});
	}
};