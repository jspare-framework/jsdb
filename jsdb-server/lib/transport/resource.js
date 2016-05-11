"use strict";

class Resource{
	
	constructor(name, path, doIt,middleware, context){
		this.name = name;
		this.path = path;
		this.doIt = doIt;
		this.middleware = middleware;
		this.context = context;
	}
}

module.exports = Resource;