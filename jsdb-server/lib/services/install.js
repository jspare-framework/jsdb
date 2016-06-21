const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_env = require('./../application/environment'),
	_logger = require('./../application/logger'),
	_os = require('os'),
	_definitions = require('./../application/definitions'),
	_nodeLibrary = {
		'win32' : 'node-windows',
		'darwin' : 'node-mac',
		'linux' : 'node-linux'
	},

	_install = {
			
		loader : function(){
			
			_env.install();
		},
		
		installService : function(library){
			
			_logger.log('install: installing JSDB Service on your operation system');
		
			var	dirname = _definitions['root'],
				Service = require(library).Service;
			
			// Create a new service object
			var svc = new Service({
			  name:'JSDB',
			  description: 'JSpareDataBase (JSDB) - The Node.js NoSql DataBase.',
			  script: dirname + '/scripts/start.js'
			});
			
			// Listen for the 'install' event, which indicates the
			// process is available as a service.
			svc.on('install',function(){
				
			  _logger.log('install: service installed');
			  svc.start();
			});
			
			svc.on('error',function(){
				
			  _logger.error('install: error on install service');
			});
		
			// Listen for the 'start' event and let us know when the
			// process has actually started working.
			svc.on('start',function(){
			  _logger.log('install: %s started', svc.name);
			});
		
			// Install the script as a service.
			svc.install();
		}
	};

module.exports = {
		
	execute : function(installService){
		
		_logger.info('install Process');
		
		_install.loader();
		
		var library =  _nodeLibrary[_os.platform()];
		if(_.isUndefined(library) || _.isNull(library)){
			
			throw 'JSDB not available for install service on your platform: ' +_os.platform();
		}
		
		_logger.info('environment prepared');
		
		if(!installService){
			_logger.warn('skip install service');
			return;
		}
		_install.installService(library);
	}
};