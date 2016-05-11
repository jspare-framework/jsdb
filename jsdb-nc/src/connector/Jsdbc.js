'use strict';
const /* Declaring imports */

	Query = require('./../models/Query'),

	_ = require('underscore'),
	_transport = require('./../transport/transport');

class Jsdbc{
	
	constructor(dataSource, credential, options){
		
		this.dataSource = dataSource;
		this.credential = credential;
		this.options = options || {};
	}
	
	dataSource(dataSource){
		
		this.dataSource = dataSource;
		return this;
	}
	
	credential(credential){
		
		this.credential = credential;
		return this;
	}
	
	options(options){
		
		this.options = options;
		return this;
	}
	
	status(callback){
		
		_transport.execute(this.dataSource, this.credential, this.options, 'status', _.noop(), _.noop(), callback);
	}
		
	addUser(user, callback) {
		
		
		_transport.execute(this.dataSource, this.credential, this.options, 'addUser', _.noop(), user, callback);
	}
	
	removeUser(key, callback) {

		var parameters = {
			'user' : key
		};
		
		_transport.execute(this.dataSource, this.credential, this.options, 'removeUser', parameters, _.noop(), callback);
	}
	
	getUser(key, callback) {
		
		var parameters = {
			'user' : key
		};
			
		_transport.execute(this.dataSource, this.credential, this.options, 'getUser', parameters, _.noop(), callback);
	}
	
	listUsers(callback) {
		
		_transport.execute(this.dataSource, this.credential, this.options, 'listUsers', _.noop(), _.noop(), callback);
	}
	
	addInstance(callback, instance){

		var parameters = {
			'instance' : instance || this.dataSource.instance
		};
				
		_transport.execute(this.dataSource, this.credential, this.options, 'addInstance', parameters, _.noop(), callback);
	}
	
	getInstanceStatus(callback, instance){
		
		var parameters = {
			'instance' : instance || this.dataSource.instance
		};
				
		_transport.execute(this.dataSource, this.credential, this.options, 'instanceStatus', parameters, _.noop(), callback);
	}
	
	removeInstance(callback, instance){
		
		var parameters = {
			'instance' : instance || this.dataSource.instance
		};
					
		_transport.execute(this.dataSource, this.credential, this.options, 'removeInstance', parameters, _.noop(), callback);
	}
	
	listInstances(callback){

		_transport.execute(this.dataSource, this.credential, this.options, 'listInstances', _.noop(), _.noop(), callback);
	}
	
	addDomain(domain, callback, instance){
		
		var parameters = {
			'instance' : instance || this.dataSource.instance,
			'domain' : domain
		};
					
		_transport.execute(this.dataSource, this.credential, this.options, 'addDomain', parameters, _.noop(), callback);
	}
	
	removeDomain(domain, callback, instance){
		
		var parameters = {
			'instance' : instance || this.dataSource.instance,
			'domain' : domain
		};
					
		_transport.execute(this.dataSource, this.credential, this.options, 'removeDomain', parameters, _.noop(), callback);
	}
	
	listDomains(callback, instance){
		
		var parameters = {
			'instance' : instance || this.dataSource.instance
		};
						
		_transport.execute(this.dataSource, this.credential, this.options, 'listDomains', parameters, _.noop(), callback);
	}
	
	
	persist(domain, key, entity, callback, instance) {

		//Preapre entity
		try {
			
			entity = JSON.parse(entity);
		} catch (e) {
			
			entity = entity || {};
		}
		
		var parameters = {
			'instance' : instance || this.dataSource.instance,
			'domain' : domain	
		};
		var data =  {
			'key' : key,
			'entity' : entity
		};
		_transport.execute(this.dataSource, this.credential, this.options, 'persist', parameters, data, callback);
	}
	
	persistBatch(domain, entities, callback, instance) {
		
		//Preapre entity
		try {
			
			entities = JSON.parse(entities);
		} catch (e) {
			
			entities = entities || {};
		}
		
		var parameters = {
			'instance' : instance || this.dataSource.instance,
			'domain' : domain	
		};
		
		_transport.execute(this.dataSource, this.credential, this.options, 'persistBatch', parameters, entities, callback);
	}
	
	queryFor(domain, query, callback, instance) {
		
		//Preapre entity
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
		_transport.execute(this.dataSource, this.credential, this.options, 'queryFor', parameters, filter, callback);
	}
	
	query(domain, instance){
		
		return new Query(this, instance || this.dataSource.instance, domain);
	}
	
	count(domain, query, callback, instance) {
		
		var filter = (!_.isEmpty(query)) ? query.filter : {};
		
		var parameters = {
			'instance' : instance || this.dataSource.instance,
			'domain' : domain	
		};
		_transport.execute(this.dataSource, this.credential, this.options, 'count', parameters, filter, callback);
	}

	size(domain, callback, instance) {
		
		var parameters = {
			'instance' : instance || this.dataSource.instance,
			'domain' : domain	
		};
		_transport.execute(this.dataSource, this.credential, this.options, 'size', parameters, _.noop(), callback);
	}
	
	remove(domain, key, callback, instance) {
		
		var parameters = {
			'instance' : instance || this.dataSource.instance,
			'domain' : domain	
		};
		var data =  {
			'key' : key
		};
		_transport.execute(this.dataSource, this.credential, this.options, 'remove', parameters, data, callback);
	}
}

module.exports = Jsdbc;