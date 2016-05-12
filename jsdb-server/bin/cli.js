#! /usr/bin/env node
const /*--- Declaring imports ---*/
	
	_ = require('underscore'),
	_program = require('commander'),
	_package = require('./../package.json'),
	_jsdb = require('./../lib/jsdb');
	_config = require('./../lib/application/config')

//Command Line Tools
_program
	.version(_package.version)
	.option('-a, --about', 'About jsdb');

_program
	.command('install')
	.description('Install jsdb')
	.option('-s, --service <service>', 'Install Service')
	.action(function(options){
		
		var installService = options.service == true ? true : false || false;
		_jsdb.install(installService);
	});

_program
	.command('uninstall')
	.description('Uninstall jsdb')
	.action(function(options){
		
		_jsdb.uninstall();
	});

_program
	.command('start')
	.description('Start jsdb')
	.option('-c, --config <config>', 'Set configuration file')
	.action(function(options){

		if(options.config){
			
			_config.setConfigFile(options.config)
		}
		
		_jsdb.start();
	});

_program
	.command('stop [token]')
	.description('Stop jsdb')
	.action(function(token){
		
		_jsdb.stop(token);
	});

_program.parse(process.argv);
  
if(_program.about){
	
	console.log('\tAbout JSDB:');
	for(var k in _package){
		
		if(!_.isObject(_package[k])){
			
			console.log('\t\t' + k + ' - ' + _package[k]);  
		}
	}
}