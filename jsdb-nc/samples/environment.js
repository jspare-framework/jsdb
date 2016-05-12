"use strict";
const jsdbc = require('./connection');

jsdbc.status((err, status)=>{
	
	console.info(status);
})

