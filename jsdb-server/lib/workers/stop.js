const /* Declaring imports */
	
	_server = require('./../transport/server');

module.exports = {

	roles : [ 'grantAll' ],
	execute : function(transaction, callback) {

		callback();
		
		_server.stop();
		process.exit(0);
	}
}