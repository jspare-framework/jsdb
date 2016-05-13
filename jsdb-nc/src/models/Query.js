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
		
		if(_.isEmpty(conditions)) return this;
		
		this.filter.conditions = conditions;
		return this;
	}
	
	condition(name, type, value){
		
		if(_.isEmpty(value) && !_.isBoolean(value)) return this;
		
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
		
		if(_.isEmpty(propertie)) return this;
		
		this.filter.byKey = propertie;
		return this;
	}
	
	setFilter(filter){
		
		if(_.isEmpty(filter)) return this;
		
		this.filter = filter;
		return this;
	}
	
	select(access){
		
		if(!access) return this;
		
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
		
		if(!value) return this;
		
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