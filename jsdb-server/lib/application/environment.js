const /*--- Declaring imports ---*/

	_ = require('underscore'), 
	_logger = require('./../modules/logger'),
	_kernel = require('./../modules/kernel'),
	_credentials = require('./../modules/credentials'),
	_resources = {
		logger : {
			name : 'audit',
			install : function() {
				
				_logger.load();
			},
			load : function() {
				
				_logger.load();
			}
		},
		kernel : {
			name : 'kernel',
			install : function() {
				
				_kernel.install();
			},
			load : function() {
				// TODO load all maps of storage and hold on holder module.
				_kernel.load();
			}
		},
		database : {
			name : 'database',
			install : function() {
			},
			load : function() {
				// TODO load all maps of storage and hold on holder module.
			}
		},
		security : {
			name : 'security',
			install : function() {
	
				_credentials.install();
			},
			load : function() {
	
				_credentials.load();
			}
		},
};

var console = process.console || global.console;

module.exports = {
		
	install : function(){
		
		console.tag('env').info('initializing resources');

		_.each(_resources, (r) => {
			
			console.tag('env').info('loading [%s]', r.name);
			
			r.install();
		});
	},	
	load : function() {
		
		console.tag('env').info('initializing resources');

		_.each(_resources, (r) => {
			
			console.tag('env').info('loading [%s]', r.name);
			
			r.load();
		});
	}
};