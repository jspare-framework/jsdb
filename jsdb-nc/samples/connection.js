"use strict";
const jsdb = require('./../src/jsdb-nc'),
	CONNECTION = {
		"datasource" : {
			"host" : "http://52.38.248.135",
			"port" : 5732,
			"instance" : "jspare"
		},
		"credential" : "ebda5eca59eb0503a99361d3c63f3986"
};

//Sync operation for build jsdb connection
var jsdbc = jsdb.build(CONNECTION);

jsdbc.status(console.info);

module.exports = jsdbc;