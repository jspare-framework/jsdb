'use strict';
const _ = require('underscore');

class Query{
	
	constructor(executor, instance, domain){
		
		this.filter = {};
		
		//For fluent usage on jsdbc directly
		this.executor = executor;
		this.instance = instance;
		this.domain = domain;
	}
	
	setConditions(conditions){
		
		this.filter.conditions = conditions;
		return this;
	}
	
	condition(name, type, value){
		
		var condition = _.first(arguments);
		
		if(arguments.length !== 1){
			
			condition = {
				column : name,
				conditionType : type,
				conditionValue : value
			};
		}
		
		return this.addCondition(condition);
	}
	
	addCondition(condition){
		
		if(!this.filter.conditions){
			this.filter.conditions = [];
		}
		this.filter.conditions.push(condition);
		return this;
	}
	
	byKey(propertie){
		
		this.filter.byKey = propertie;
		return this;
	}
	
	setFilter(filter){
		
		this.filter = filter;
		return this;
	}
	
	select(access){
		
		this.filter.select = access;
		return this;
	}
	
	extendWhere(properties){
		
		if(!this.filter.where){
			this.filter.where = {};
		}
		_.extend(this.filter.where, properties);
		return this;
	}
	
	where(name, value){
		
		if(!this.filter.where){
			this.filter.where = {};
		}
		this.filter.where[name] = value;
		return this;
	}
	
	call(callback){
		
		if(!this.executor){
			
			throw 'No executor associated to this query object';
		}
		
		this.executor.queryFor(this.domain, this, callback, this.instance);
	}
}
module.exports = Query;