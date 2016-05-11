const jsdbc = require('./connection');

jsdbc.addInstance((err, res)=> {

	console.info(res);
}, 'optional.instance');

jsdbc.removeInstance((err, result) => {
	
	console.info(result);
}, 'optional.instance');

jsdbc.listInstances((err, result) => {
	
	console.info(instances);
});

jsdbc.addDomain('domain',(err, res)=> {

	console.info(res);
}, 'optional.instance');

jsdbc.removeDomain('domain',(err, result) => {
	
	console.info(result);
}, 'optional.instance');

jsdbc.listDomains((err, result) => {
	
	console.info(instances);
});

