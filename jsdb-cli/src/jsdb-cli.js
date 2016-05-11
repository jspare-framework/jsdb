const /* Declaring imports */ 

	_ = require('underscore'),
	_readline = require('readline'),
	_handler = require('./handler/handler'),
	_fs = require('fs'),
	_path = require('path'),
	_appRoot = require('app-root-path');

var _rl = _readline.createInterface(process.stdin, process.stdout);

function start() {

	var configuration = _fs.readFileSync(_path.format({
		'dir' : _appRoot.path,
		'base' : 'config.json'
	}));
	
	//Validate configuration
	try {
		
		configuration = JSON.parse(configuration);
		
		if(!configuration.connection){
			
			console.info('Invalid connection. Validate yout config.json for more details.');
			return;
		}
	} catch (e) {

		console.info('Invalid configuration file. Validate yout config.json for more details.')
		return;
	}
	
	_handler.build(configuration,_readline, _rl);
	_rl.setPrompt('jsdb> ');
	_rl.prompt();
	_rl.on('line', function(line) {
		 
		_handler.handle(line.trim());
		
	}).on('close', function() {
		
		console.log('THANK YOU FOR USING JSDB <3 - JSPARE.ORG - COPYRIGHT 2016');
		process.exit(0);
	});
}
module.exports = start;