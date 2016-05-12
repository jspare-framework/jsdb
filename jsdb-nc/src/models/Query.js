'use strict';
var _ = require('underscore');

function Query(executor, instance, domain) {

	this.filter = {};

	// For fluent usage on jsdbc directly
	this.executor = executor;
	this.instance = instance;
	this.domain = domain;
}

Query.prototype.setConditions = function(conditions) {

	this.filter.conditions = conditions;
	return this;
}

Query.prototype.condition = function(name, type, value) {

	var condition = _.first(arguments);

	if (arguments.length !== 1) {

		condition = {
			column : name,
			conditionType : type,
			conditionValue : value
		};
	}

	return this.addCondition(condition);
}

Query.prototype.addCondition = function(condition) {

	if (!this.filter.conditions) {
		this.filter.conditions = [];
	}
	this.filter.conditions.push(condition);
	return this;
}

Query.prototype.byKey = function(propertie) {

	this.filter.byKey = propertie;
	return this;
}

Query.prototype.setFilter = function(filter) {

	this.filter = filter;
	return this;
}

Query.prototype.select = function(access) {

	this.filter.select = access;
	return this;
}

Query.prototype.extendWhere = function(properties) {

	if (!this.filter.where) {
		this.filter.where = {};
	}
	_.extend(this.filter.where, properties);
	return this;
}

Query.prototype.where = function(name, value) {

	if (!this.filter.where) {
		this.filter.where = {};
	}
	this.filter.where[name] = value;
	return this;
}

Query.prototype.call = function(callback) {

	if (!this.executor) {

		throw 'No executor associated to this query object';
	}

	this.executor.queryFor(this.domain, this, callback, this.instance);
}
module.exports = Query;