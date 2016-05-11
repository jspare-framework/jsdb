'use strict';
const 
	_ = require('underscore'),
	_utils = require('./../tools/utils');

class TimedHeap {
	
	constructor(timeToLive){
		
		if(!timeToLive){
			
			timeToLive = 5 * 1000 * 60;
		}
		
		//Default life time are 5 minutes
		this.timeToLive = timeToLive;
		this.map = {};
		this.timestamps = {};
	}
	
	put(key, value, timeToLive){
		
		var toLive = this.timeToLive;
		if(timeToLive){
			toLive = timeToLive;
		}
		
		this.map[key] = value;
		this.timestamps[key] = (_utils.militime() + timeToLive);
	}
	
	get(key){
		
		if(!this.exist(key)){
			
			return null;
		}
		
		return this.map[key];
	}
	
	exist(key){
		
		return ((this.map[key]) || this.isValid(key));
	}
	
	isValid(key){
		var timestamp = this.timestamps[key];
		if(_.isUndefined(timestamp) || _.isNull(timestamp)){

			return false;
		}
		var now = _utils.militime();
		return timestamp > now;
	}
	
	remove(key){
	
		delete this.map[key];
		delete this.timestamps[key];
	}
	
	reindex(){
		
		_.each(this.timestamps, function(v, k){
			if(v < _utils.militime()){
				
				this.remove(k);
			}
		}, this);
	}
}

module.exports = {
		
	TimedHeap : TimedHeap
};