const /* Declaring imports */ 
	
	Jsdbc = require('./connector/Jsdbc'),
	Credential = require('./models/Credential'),
	DataSource = require('./models/DataSource'),
	Query = require('./models/Query'),

	_ = require('underscore');


module.exports = {

	build : function(options, callback){
		
		if(_.isEmpty(options)) throw 'options cannot be null';
		if(_.isEmpty(options.datasource)) throw 'options.datasource cannot be null';
		
		var dataSource = new DataSource(options.datasource.host, options.datasource.port, options.datasource.instance); 
		var credential = new Credential(dataSource, options.credential);
		
		var jsdbc = new Jsdbc(dataSource, credential);
		
		if(callback){
			
			callback(jsdbc);
			return;
		} 
		return jsdbc;
	},
	
	Jsdbc : Jsdbc,
	
	Query : Query
};