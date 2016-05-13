"use strict";
const jsdbc = require('./connection');

	const CONNECTION = {
			"datasource" : {
				"host" : "http://127.0.0.1",
				"port" : 5732,
				"instance" : "insurance"
			},
			"credential" : "ebda5eca59eb0503a99361d3c63f3986"
		};
	
	var nc = require('jsdb-nc');
	
	var jsdbc = nc.build(CONNECTION, (jsdbc) => {
		jsdbc.status(console.info);
	});

	jsdbc.addInstance('insurance', (err, result) => {
		
		if(err) throw new Error() //XXX catch error
		
		jsdbc.addDomain('person');
		jsdbc.addDomain('proposal');
	});
	
	
	
	




