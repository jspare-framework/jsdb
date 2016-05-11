const /* Declaring imports */
	
	_server = require('./../transport/server');

var console = process.console || global.console;

module.exports = {

	roles : [ 'grantAll' ],
	execute : function(transaction, callback) {

		console.log('Stopping JSDB...');
		
		callback();
		
		_server.stop();
		process.exit(0);
	}
}