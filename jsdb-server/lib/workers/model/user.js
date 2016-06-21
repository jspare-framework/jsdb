'use strict';

class User {
	
	constructor(token, name, mail, roles, creationDate){
		
		this.token = token
		this.name = name;
		this.roles = roles;
		this.mail = mail;
		this.creationDate = creationDate;
	}
}
module.exports = User;