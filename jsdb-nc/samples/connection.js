const jsdb = require('./../src/jsdb-nc'),
	CONNECTION = {
		"datasource" : {
			"host" : "http://127.0.0.1",
			"port" : 5732,
			"instance" : "public"
		},
		"credential" : ""
};

//Sync operation for build jsdb connection
var jsdbc = jsdb.build(CONNECTION);

module.exports = jsdbc;