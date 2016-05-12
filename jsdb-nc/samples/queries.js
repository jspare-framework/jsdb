"use strict";

const jsdbc = require('./connection');

jsdbc.query("person").call(console.info);

jsdbc.query("person").byKey("08643467944").call(console.info);

jsdbc.query("person").where('name', 'Barth Simpson').call(console.info);

jsdbc.query("person").setFilter({

	conditions : [ {
		column : 'name',
		conditionType : 'EQUAL',
		conditionValue : 'Barth Simpson'
	}, {
		column : 'height',
		conditionType : 'GRETTER',
		conditionValue : '0'
	} ]

}).call(console.info);