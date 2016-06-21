const /*--- Declaring imports ---*/

	_ = require('underscore'), 
	_kernel = require('./../modules/kernel'),
	_credentials = require('./../modules/credentials'),
	_logger = require('./logger'),
	_resources = {
	
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

module.exports = {
		
	install : function(){
		
		_logger.info('initializing resources');

		_.each(_resources, (r) => {
			
			_logger.info('loading [%s]', r.name);
			
			r.install();
		});
	},	
	load : function() {
		
		_logger.info('initializing resources');

		_.each(_resources, (r) => {
			
			_logger.info('loading [%s]', r.name);
			
			r.load();
		});
	}
};