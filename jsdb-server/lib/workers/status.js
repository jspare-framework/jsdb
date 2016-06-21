const /* Declaring imports */
	_ = require('underscore'),
	_monitoring = require('./../monitoring/monitoring.manager');

module.exports = {

	roles : [ 'grantAll', 'status' ],
	execute : function(transaction, callback) {

		var result = {

			state : _application.getContext().status,
			data : {
				env : process.env,
				memoryUsage : process.memoryUsage(),
				pid : process.pid,
				platform : process.platform,
				engine : process.release,
				versions : process.versions
			}
		}
		callback(_.noop(), result);
	}
}