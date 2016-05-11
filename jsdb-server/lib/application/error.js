"use strict";
const _errors = require('./../application/errors.json');

class NotAuthorizedError{

	constructor(message) {
		
		this.name = 'TRXNTA';
		this.message = message || _errors['TRXNTA'].message;
	}
}

class ForbiddenError{

	constructor(message) {
		
		this.name = 'TRXFBD';
		this.message = message || _errors['TRXFBD'].message;
	}
}

class EnvironmentError {

	constructor(code) {

		if(!_errors[code]) code = 'ENX000';
		
		this.name = code;
		this.message = _errors[code].message;
	}
}

class BusinessError {

	constructor(code) {

		if(!_errors[code]) code = 'ENX000';
		
		this.name = code;
		this.message = _errors[code].message;
	}
}

module.exports = {
		
	BusinessError : BusinessError,
	EnvironmentError : EnvironmentError,
	ForbiddenError : ForbiddenError,
	NotAuthorizedError : NotAuthorizedError
};