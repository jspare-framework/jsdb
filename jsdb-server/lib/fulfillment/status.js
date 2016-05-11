const /* Declaring imports */
	_ = require('underscore'),
	_monitoring = require('./../monitoring/monitoring.manager');

module.exports = {

	roles : [ 'grantAll', 'status' ],
	execute : function(transaction, callback) {

		var result = _monitoring.getSystemStatus();
		callback(_.noop(), result);
	}
}