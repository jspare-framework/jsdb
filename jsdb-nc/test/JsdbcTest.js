process.env.NODE_ENV = 'test';

var assert = require('assert'), test = require('nodeunit').testCase, jsdb = require('./../lib/jsdb-nc'), connection = {
	"host" : "http://localhost",
	"port" : 5732,
	"instance" : "nodeunit-test"
};

var credential = {
	token : 'unique-token'
};
jsdb.conn(connection);
jsdb.build({
	auth : credential
});

exports.testStatus = function(test) {

	jsdb.status(function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testAddUser = function(test) {

	var user = {
		"name" : "JSpareDB User",
		"key" : "jsdb.user",
		"mail" : "jsdb@jspare.org",
		"roles" : [ "grantAll" ],
		"domains" : [ "test" ]
	};

	jsdb.addUser(user, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testGetUser = function(test) {

	jsdb.getUser("jsdb.user", function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.equal(data.result.key, "jsdb.user");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testRemoveUser = function(test) {

	jsdb.removeUser("jsdb.user", function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testListUsers = function(test) {

	jsdb.listUsers(function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testAddInstance = function(test) {

	var instance = "nodeunit-test";
	
	jsdb.addInstance(instance, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testListInstances = function(test) {

	jsdb.listInstances(function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};


exports.testAddDomain = function(test) {

	var domain = "person";
	
	jsdb.addDomain(domain, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testListDomains = function(test) {
	
	jsdb.listDomains(function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testPersist = function(test) {

	var key = '11111111111',
		person = {
			cpf : key,
			name : 'Test Person',
			birthDate : new Date()
	};
	
	jsdb.persist("person", key, person, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testQuery = function(test) {

	var query = jsdb.query();
	jsdb.queryFor("person", query, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testRemove = function(test) {
	
	var key = '11111111111';
	
	jsdb.remove("person", key, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testRemoveDomain = function(test) {
	
	var domain = "person";
	
	jsdb.removeDomain(domain, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};

exports.testRemoveInstance = function(test) {

	var instance = "nodeunit-test";
	
	jsdb.removeInstance(instance, function(data) {

		console.info('Success: %s', JSON.stringify(data));
		test.equal(data.status, "SUCCESS");
		test.done();
	}, function(error) {
		console.error(error.message);
		test.ok(false, error.message);
	});
};