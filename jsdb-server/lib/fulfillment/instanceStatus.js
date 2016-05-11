const /* Declaring imports */

	_monitoring = require('./../monitoring/monitoring.manager');

module.exports = {

	roles : [ 'grantAll', 'status' ],
	execute : function(transaction, callback) {
		
		if(!_io.exist(_path.buildInstanceDir(transaction.getData()))){
			
			callback(new _error.BusinessError('INSTNFD'));
			return;
		}

		var instance = transaction.getData();
		
		var result = _monitoring.getInstanceStatus(instance);
		callback(_.noop(), result);
	},
	rollback : function(transaction, error){
	}
}