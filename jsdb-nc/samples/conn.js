"use strict";
const nc = require('./../src/jsdb-nc'),
	
	const CONNECTION = {
			"datasource" : {
				"host" : "http://127.0.0.1",
				"port" : 5732,
				"instance" : "insurance"
			},
			"credential" : "ehdafecas9eb0503a91231dwc63f3s86"
		};

	var jsdbc = nc.build(CONNECTION, (jsdbc) => {
		jsdbc.status(console.info);
	});
	
	module.exports = jsdbc;