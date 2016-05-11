'use strict';
class DataSource {
	
	constructor (host, port, instance){
		
		this.host = host || '127.0.0.1';
		this.port = port || 5732;
		this.instance = instance || 'public';
	}
}

module.exports = DataSource;