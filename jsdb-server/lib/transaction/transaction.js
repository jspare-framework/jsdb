'use strict';
const /*--- Declaring imports ---*/

	_utils = require('./../tools/utils'), 
	_token = require('./../tools/token');

class Transaction{
	
	constructor(req, transaction){
		
		this.creationDate = _utils.now();
		this.id = _token.generateTid();
		this.transaction = transaction;
		this.userToken = req.header('x-auth-token');
		this.context = {};
	}
	data(data) {

		this.data = data;
		return this;
	}
	getId(){
		
		return this.id;
	}
	getCreationDate(){

		return this.creationDate;
	}
	getData(){

		return this.data;
	}
	getContext(name){
		
		return this.context[name];
	}
	getTransaction(){

		return this.transaction;
	}
	getUserToken(){
		
		return this.userToken;
	}
	setContext(name, value){
		
		this.context[name] = value;
	}
}

module.exports = Transaction;