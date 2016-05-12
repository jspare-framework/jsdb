'use strict';
function DataSource(host, port, instance) {
	
	this.host = host || '127.0.0.1';
	this.port = port || 5732;
	this.instance = instance || 'public';
}

module.exports = DataSource;