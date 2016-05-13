"use strict";
const nc = require('./../src/jsdb-nc'),
	
	const CONNECTION = {
			"datasource" : {
				"host" : "http://127.0.0.1",
				"port" : 5732,
				"instance" : "insurance"
			},
			"credential" : "ebda5eca59eb0503a99361d3c63f3986"
		};

	var jsdbc = nc.build(CONNECTION, (jsdbc) => {
		jsdbc.status(console.info);
	});
	
	module.exports = jsdbc;