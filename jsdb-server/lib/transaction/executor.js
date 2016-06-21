const /*--- Declaring imports ---*/

		Response = require('./response'),

		_ = require('underscore'),
		_definitions = require('./../application/definitions'),
		_error = require('./../application/error'),
		_errors = require('./../application/errors.json'),
		_entitlements = require('./entitlements');

module.exports = {

	execute : function(transaction, dispatch) {
		
		console.tag(transaction.getId()).debug('executor.execute');
		
		/**
		 * Closure callback  of execute method
		 * 
		 * @param {object} transaction
		 * @param {function} dispatch
		 * */
		function callback(err, result, rollback){
			
			if(!_.isUndefined(err)){
				
				console.tag(transaction.getId()).debug('executor.callback err', err);
				
				//Default Status
				var status = _definitions.trxStatus.FATAL;
				
				//Hard error
				if(!executor){
					
					var error = new _error.EnvironmentError('TRXNF');
					dispatch(new Response(status, error));
					return;
				}
				
				//Verify if need execute rollback
				if(rollback){
				
					if(executor.rollback){
						
						console.error('Executing rollback for ID[%s] NAME[%s]', transaction.getId(), transaction.getTransaction());
						console.tag(transaction.getId()).tag(transaction.getUserToken()).tag('rollback').audit('Executing rollback');
						executor.rollback(transaction, err);
						console.error('Rollback executed for ID[%s] NAME[%s]', transaction.getId(), transaction.getTransaction());
						console.tag(transaction.getId()).tag(transaction.getUserToken()).tag('rollback').audit('Rollback executed');
					}
				}
				
				//Define Status of Error
				if('TypeError' == err.name){
					
					status = _definitions.trxStatus.INVALID;
				}
				if('ReferenceError' == err.name){
					
					status = _definitions.trxStatus.FATAL;
				}
				if(!_.isEmpty(_errors[err.name])){
					
					status = _definitions.trxStatus.ERROR;
				}
				if(typeof err == 'NotAuthorizedError'){
					
					status = _definitions.trxStatus.DENIED;
				}
				if(typeof err == 'ForbiddenError'){
					
					status = _definitions.trxStatus.FORBIDDEN;
				}
				
				console.tag(transaction.getId()).tag(transaction.getTransaction()).tag(transaction.getUserToken()).audit('response - status[%s]', status);
				dispatch(new Response(status, err));
				return
			}
			
			console.tag(transaction.getId()).debug('executor.callback status[%s]', _definitions.trxStatus.SUCCESS);
			
			console.tag(transaction.getId()).tag(transaction.getTransaction()).tag(transaction.getUserToken()).audit('response - status[%s]', _definitions.trxStatus.SUCCESS);
			
			dispatch(new Response(_definitions.trxStatus.SUCCESS, result));
		}

		//Start execution of transaction
		console.debug(transaction.getId()).tag(transaction.getTransaction()).tag(transaction.getUserToken()).audit('received transaction');
		try {
			
			//Get fulfillment
			var worker = './../workers/' + transaction.getTransaction();
			
			//Get executor
			var executor = require(worker);
			console.tag(transaction.getId()).debug('executor import fulfillment [%s]', transaction.getTransaction());
			
			_entitlements.validate(transaction, executor, (err) => {
				
				if(err){
					
					callback(err);
					return;
				}
				
				//Validate request
				if(executor.validateRequest && !executor.validateRequest(transaction.getData())){
					var errorData = { 'reason' : 'TRXINV', 'message' : _errors.TRXINV.message };
					dispatch(new Response(_definitions.trxStatus.INVALID, errorData));
					return;
				}
				
				//Execute transaction
				executor.execute(transaction, callback);
			});

			
		} catch (e) {
			
			//Fatal error, callback is called and try rollback of this transaction.
			console.error('Transaction fatal failed [%s][%s]', e.name, e.message);
			global.console.trace(e);
			callback(e, _.noop(), true);
		}
	}
};