const jsdbc = require('./connection');

var user = {
	"name" : "Username",
	"mail" : "mail@mail.com",
	"roles" : [ "grantAll" ] // See section of User and Roles
};

jsdbc.addUser(user, (err, res) => {

	console.info(res);
});

jsdbc.getUser('token', (err, res) => {

	console.info(res);
});

jsdbc.listUsers((err, res)=> {

	console.info(res);
});