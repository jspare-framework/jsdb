const /*--- Declaring imports ---*/

	_ = require('underscore'), 
	_application = require('./../application/context'),
	_config = require('./../application/config'),
	_error = require('./../application/error'),
	_io = require('./../storage/io'), 
	_path = require('./../storage/path'),
	_holder = require('./../storage/holder'),
	_utils = require('./../tools/utils');

var _transactions = {};

var console = process.console || global.console;

module.exports = {
		
	registerTransaction : function(transaction){
		
		if(!_config.get("monitoring", false)) return;
		
		console.tag(transaction.getId()).debug('monitoring.registerTransaction');
		
		//XXX Retrieve other infos for future processing
		//XXX Call external profiller for analysis
		var monitoring = {
				
			transaction : transaction,
			start : _utils.militime()
		}
		
		_transactions[transaction.getId()] = monitoring;
	},
	endTransaction : function(tid){
		
		if(!_config.get("monitoring", false)) return;
		
		console.tag(tid).debug('monitoring.endTransaction');
		
		if(!_config.get("monitoring", false)) return;
		
		var monitoring = _transactions[tid];
		if(!monitoring){
			
			console.tag('executor').tag(tid).monitoring('fail on monitoring');
			return;
		}
			
		monitoring['end'] = _utils.militime();
		monitoring['timeProcess'] = monitoring.end - monitoring.start;
		
		var transaction = monitoring.transaction;
		
		console.tag('executor').tag(transaction.getId()).tag(transaction.getUserToken()).monitoring(monitoring);
		delete _transactions[tid];
		delete transaction;
		delete monitoring;
	},
	getSystemStatus : function() {

		return {

			state : _application.getContext().status,
			data : {
				env : process.env,
				memoryUsage : process.memoryUsage(),
				pid : process.pid,
				platform : process.platform,
				engine : process.release,
				versions : process.versions
			}
		};
	},
	getInstanceStatus : function(instance){
		
		//TODO impl
		
		var status = {
			
			options : {
				
			},
			storage : {
				using : 50000
			}	
		};
		return status;
	}
};