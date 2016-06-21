const /*--- Declaring imports ---*/

		_winston = require('winston'),
		_config = require('./../application/config'),
		_io = require('./../storage/io'),
		_path = require('./../storage/path');

var _logger = null;

var _load = function(){
		
	_io.load(_path.buildLoggerDir());
	_io.load(_path.buildErrorDir());
	_io.load(_path.buildAuditDir());
};

var _create = function(){
	
	if(_logger != null){
		
		return _logger;
	}
	
	_load();
	
	 _winston.loggers.add('logger', {
		
		 transports : [
			new (_winston.transports.Console)({
				name : 'consoleLogger',
				colorize : true,
				timestamp : true,
				prettyPrint: true,
				silent: false
			}),
			new (require('winston-daily-rotate-file'))({
				name : 'fileLogger',
				filename : _path.buildLoggerFileDir()
			})
		 ]
	 });
	 _winston.loggers.add('audit', {
		 transports : [
			new (require('winston-daily-rotate-file'))({
				name : 'auditLogger',
				filename : _path.buildAuditFileDir()
			})
		 ]
	 });
	
	return {
		
		error : function(){
			
			_winston.loggers.get('logger').error.apply(this, arguments);
		},
		warn : function(){
			
			_winston.loggers.get('logger').warn.apply(this, arguments);
		},
		info : function(){

			_winston.loggers.get('logger').info.apply(this, arguments);
		},
		verbose : function(){
			
			_winston.loggers.get('logger').verbose.apply(this, arguments);
		},
		debug : function(){
			
			_winston.loggers.get('logger').debug.apply(this, arguments);
		},
		silly : function(){
			
			_winston.loggers.get('logger').silly.apply(this, arguments);
		},
		audit : function(){
			
			_winston.loggers.get('audit').info.apply(this, arguments);
		}
	};
};
module.exports = _create();