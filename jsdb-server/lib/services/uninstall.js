const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_os = require('os'),
	_definitions = require('./../application/definitions'),
	_nodeLibrary = {
		'win32' : 'node-windows',
		'darwin' : 'node-mac',
		'linux' : 'node-linux'
	},
	
	performUninstallService = function(library){
	
		console.log('Uninstalling jsdb on your os');
	
		var dirname = _definitions['root'];
	
		var Service = require(library).Service;
		// Create a new service object
		var svc = new Service({
		  name:'JSDB',
		  description: 'JSpareDataBase (JSDB) - The Node.js NoSql DataBase.',
		  script: dirname + '/scripts/start.js'
		});
		
		//Uninstall the script as a service.
		svc.uninstall();
	};

var console = process.console || global.console;
	
module.exports = {

		
	execute : function(){

		var library =  _nodeLibrary[_os.platform()];
		if(_.isUndefined(library) || _.isNull(library)){
			
			throw 'JSDB not available for uninstall service on your platform: ' +_os.platform();
		}
		performUninstallService(library);
	}
};