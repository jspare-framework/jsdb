const /*--- Declaring imports ---*/

	_ = require('underscore'),
	_osenv = require('osenv'),
	_error = require('./../application/error'),
	_path = require('./../storage/path'),
	_io = require('./../storage/io'),
	_holder = require('./../storage/holder'),
	_identity = require('./../storage/identity'),
	_token = require('./../tools/token'),
	_utils = require('./../tools/utils'),
	
	DEFAULT_CREDENTIALS_PATH = '/.jsdb/',
	DEFAULT_CREDENTIALS_FILE = 'credentials';
	
var console = process.console || global.console;

module.exports = {
		
	load : function(){
		
		_holder.readObject(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), (err, credentialsData) => {
			
			if(err || _.isNull(credentialsData) || _.isUndefined(credentialsData) || _.isEmpty(credentialsData)){
				
				var ex = new _error.EnvironmentError('ESCY01');
				console.error('error Code: [%s] message: [%s]', ex.name, ex.message);
				process.exit(1);
			}
		});
	},	
	
	install : function(){

		console.tag('jsdb').info('installing credentials');
		
		_io.load(_path.buildCredentialsDir());

		 _holder.readObject(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), (err, data)=> {
			 
			 if(_.isEmpty(data)){
	
					console.tag('jsdb').info('JSDB: generating your root token');
					
					var root = {
						'token' : _token.generateToken(),
						'name' : 'root',
						'roles' : [ 'grantAll' ],
						'creationDate' : _utils.now()
					};
					
					data[root.token] = root;
					
					_holder.store(_identity.DATA_HOLDER_IDENTITY, _path.buildCredentialsFileDir(), data);
					
					
					//Generate default credentials file.
					var credentialsPath = _osenv.home();
					credentialsPath += DEFAULT_CREDENTIALS_PATH;
					
					_io.load(credentialsPath);
					
					credentialsPath += DEFAULT_CREDENTIALS_FILE;
					var credentials = {
							"DEFAULT" : root.token
					};
					if(_io.exist(credentialsPath)){
						var data = JSON.parse(_io.readSync(credentialsPath, false));
						_.extend(data, credentials);
						credentials = data;
					}
					_io.storeSync(credentialsPath, JSON.stringify(credentials, null, 4));
					
					console.tag('jsdb').info('It is important that this key is not lost, it is the main key to your databas.');
					console.tag('jsdb').info('Root token generated: [%s]', root.token);
				}else{
					console.tag('jsdb').warn('credentials already installed');
				}
		 });
	}
};