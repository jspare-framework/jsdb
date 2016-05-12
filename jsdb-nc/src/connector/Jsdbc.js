'use strict';
var /* Declaring imports */

Query = require('./../models/Query'),

_ = require('underscore'), _transport = require('./../transport/transport');

function Jsdbc(dataSource, credential, options) {

	this.dataSource = dataSource;
	this.credential = credential;
	this.options = options || {};
}

Jsdbc.prototype.dataSource = function(dataSource) {

	this.dataSource = dataSource;
	return this;
}

Jsdbc.prototype.credential = function(credential) {

	this.credential = credential;
	return this;
}

Jsdbc.prototype.options = function(options) {

	this.options = options;
	return this;
}

Jsdbc.prototype.status = function(callback) {

	_transport.execute(this.dataSource, this.credential, this.options,
			'status', _.noop(), _.noop(), callback);
}

Jsdbc.prototype.addUser = function(user, callback) {

	_transport.execute(this.dataSource, this.credential, this.options,
			'addUser', _.noop(), user, callback);
}

Jsdbc.prototype.removeUser = function(key, callback) {

	var parameters = {
		'user' : key
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'removeUser', parameters, _.noop(), callback);
}

Jsdbc.prototype.getUser = function(key, callback) {

	var parameters = {
		'user' : key
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'getUser', parameters, _.noop(), callback);
}

Jsdbc.prototype.listUsers = function(callback) {

	_transport.execute(this.dataSource, this.credential, this.options,
			'listUsers', _.noop(), _.noop(), callback);
}

Jsdbc.prototype.addInstance = function(callback, instance) {

	var parameters = {
		'instance' : instance || this.dataSource.instance
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'addInstance', parameters, _.noop(), callback);
}

Jsdbc.prototype.getInstanceStatus = function(callback, instance) {

	var parameters = {
		'instance' : instance || this.dataSource.instance
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'instanceStatus', parameters, _.noop(), callback);
}

Jsdbc.prototype.removeInstance = function(callback, instance) {

	var parameters = {
		'instance' : instance || this.dataSource.instance
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'removeInstance', parameters, _.noop(), callback);
}

Jsdbc.prototype.listInstances = function(callback) {

	_transport.execute(this.dataSource, this.credential, this.options,
			'listInstances', _.noop(), _.noop(), callback);
}

Jsdbc.prototype.addDomain = function(domain, callback, instance) {

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'addDomain', parameters, _.noop(), callback);
}

Jsdbc.prototype.removeDomain = function(domain, callback, instance) {

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'removeDomain', parameters, _.noop(), callback);
}

Jsdbc.prototype.listDomains = function(callback, instance) {

	var parameters = {
		'instance' : instance || this.dataSource.instance
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'listDomains', parameters, _.noop(), callback);
}

Jsdbc.prototype.persist = function(domain, key, entity, callback, instance) {

	// Preapre entity
	try {

		entity = JSON.parse(entity);
	} catch (e) {

		entity = entity || {};
	}

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};
	var data = {
		'key' : key,
		'entity' : entity
	};
	_transport.execute(this.dataSource, this.credential, this.options,
			'persist', parameters, data, callback);
}

Jsdbc.prototype.persistBatch = function(domain, entities, callback, instance) {

	// Preapre entity
	try {

		entities = JSON.parse(entities);
	} catch (e) {

		entities = entities || {};
	}

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};

	_transport.execute(this.dataSource, this.credential, this.options,
			'persistBatch', parameters, entities, callback);
}

Jsdbc.prototype.queryFor = function(domain, query, callback, instance) {

	// Preapre entity
	try {

		query = JSON.parse(query);
	} catch (e) {

		query = query || {};
	}

	var filter = (!_.isEmpty(query)) ? query.filter : {};

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};
	_transport.execute(this.dataSource, this.credential, this.options,
			'queryFor', parameters, filter, callback);
}

Jsdbc.prototype.query = function(domain, instance) {

	return new Query(this, instance || this.dataSource.instance, domain);
}

Jsdbc.prototype.count = function(domain, query, callback, instance) {

	var filter = (!_.isEmpty(query)) ? query.filter : {};

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};
	_transport.execute(this.dataSource, this.credential, this.options, 'count',
			parameters, filter, callback);
}

Jsdbc.prototype.size = function(domain, callback, instance)
{

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};
	_transport.execute(this.dataSource, this.credential, this.options, 'size',
			parameters, _.noop(), callback);
}

Jsdbc.prototype.remove = function(domain, key, callback, instance) {

	var parameters = {
		'instance' : instance || this.dataSource.instance,
		'domain' : domain
	};
	var data = {
		'key' : key
	};
	_transport.execute(this.dataSource, this.credential, this.options,
			'remove', parameters, data, callback);
}

module.exports = Jsdbc;