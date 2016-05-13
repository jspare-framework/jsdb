"use strict";
const jsdbc = require('./conn');

var person = {
	"personId" : "08643467944",
	"name" : "Paulo Lima"
}

jsdbc.persist('person', person.personId, person);

person.contact = 'pflima92@gmail.com';

jsdbc.persist('person', person.personId, person);

/* Batch */

//Key / Value
var entities = {
	
	"1112223344" : {
		
		"personId" : "1112223344",
		"name" : "Homer Simpson",
		"height" : 1.82
	},
	"08643467944" : {
		"name" : "Paulo H. F. Lima",
		"height" : 1.86
	},
	"22233344455" : {
		"name" : "Barth Simpson",
		"height" : 0.95
	}
};

jsdbc.persistBatch("person", entities, console.info);






