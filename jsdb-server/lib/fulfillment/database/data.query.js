const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_jq = require('json-query'),
	_op = require('object-path'),
	
	conditionsFun = {
		'EQUAL' : function(value, toCompare) {
			return value == toCompare;
		},
		'NOT_EQUAL' : function(value, toCompare) {
			return value != toCompare;
		},
		'GREATER' : function(value, toCompare) {
			return value > toCompare;
		},
		'LESSER' : function(value, toCompare) {
			return value < toCompare;
		},
		'GREATER_EQUAL' : function(value, toCompare) {
			return value >= toCompare;
		},
		'LESSER_EQUAL' : function(value, toCompare) {
			return value <= toCompare;
		},
		'STARTSWITH' : function(value, toCompare) {
			return value.startsWith(toCompare);
		},
		'CONTAINS'	: function(value, toCompare) {
			return value.indexOf(toCompare) != -1;
		},
	},
	
	filterCondition = function(data, conditions){
	
		//Ignore condition if condition are invalid
		conditions = _.filter(conditions, (c) =>{
			
			return _.has(conditionsFun, c.conditionType);
		});
		
		//TODO reference access
		for(var k in data){
			var validColumn = true;
			
			for (var i = 0; i < conditions.length; i++) {
				
				if(!validColumn) continue;
				
				var condition = conditions[i],
					item = data[k];
				
				validColumn = conditionsFun[condition.conditionType](item[condition.column], condition.conditionValue);
			}
			if(!validColumn){
				delete data[k];
			}
		}
		return data;
	},
	
	filterKey = function(data, key){
	
		if(data[key]){
			
			var result = {};
				result[key] = data[key]; 
			return result;
		}
		return {};
	},
	
	filterSelect = function(data, select){
		var temp = {};
		for(k in data){
			temp[k] = _op.get(data[k], select);
		}
		return temp;
	},
	
	filterWhere = function(obj, where){
		var predicate = _.matcher(where);
		
		var results = {};
		_.each(obj, function(value, index, list) {
			if (predicate(value, index, list))
				results[index] = value;
		});
		return results;
	};
	
module.exports = {
		
	apply : function(data, filter){
		
		var resultData = _.clone(data);
		
		if(!_.isEmpty(filter)){
			
			if(filter.select){
				
				resultData = filterSelect(resultData, filter.select)
			}
			
			if(filter.byKey){
				
				resultData = filterKey(resultData, filter.byKey)
			}
			
			//TODO transdorm string on properties, but now receive only properties
			if(filter.where){

				resultData = filterWhere(resultData, filter.where);
			}
			
			if(filter.conditions){
				
				resultData = filterCondition(resultData, filter.conditions);
			}
		}
		return resultData;
	},
	
	applyJoin : function(multiDomainData, filter){
		throw 'Not implemented Yed';
	}
};