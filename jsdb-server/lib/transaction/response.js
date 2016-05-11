'use strict';

class Response{
	
	constructor(type, data){
		this.type = type;
		this.data = data;
	}
	
	getType() {

		return this.type;
	}
	getData() {
		
		return this.data;
	}
}
module.exports = Response;