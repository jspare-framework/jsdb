"use strict";
const jsdbc = require('./conn');

jsdbc.status((err, status)=>{
	
	console.info(status);
})

