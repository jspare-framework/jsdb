const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_env = require('./../application/environment'),
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
			
			console.log('install: installing JSDB Service on your operation system');
		
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
				
			  console.log('install: service installed');
			  svc.start();
			});
			
			svc.on('error',function(){
				
			  console.error('install: error on install service');
			});
		
			// Listen for the 'start' event and let us know when the
			// process has actually started working.
			svc.on('start',function(){
			  console.log('install: %s started', svc.name);
			});
		
			// Install the script as a service.
			svc.install();
		}
	};

var console = process.console || global.console;

module.exports = {
		
	execute : function(installService){
		
		console.tag('jsdb').info('install Process');
		
		_install.loader();
		
		var library =  _nodeLibrary[_os.platform()];
		if(_.isUndefined(library) || _.isNull(library)){
			
			throw 'JSDB not available for install service on your platform: ' +_os.platform();
		}
		
		console.tag('jsdb').info('environment prepared');
		
		if(!installService){
			console.tag('jsdb').warn('skip install service');
			return;
		}
		_install.installService(library);
	}
};