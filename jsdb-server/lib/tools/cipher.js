const /*--- Declaring imports ---*/

	_crypto = require('crypto'), 
	_algorithm = 'aes-256-ctr';

module.exports = {
		
	encryptBuffer : function(buffer, token) {
		
		var cipher = _crypto.createCipher(_algorithm, token);
		var crypted = Buffer.concat([cipher.update(buffer),cipher.final()]);
		return crypted;
	},

	decryptBuffer : function(buffer, token) {
		
		var decipher = _crypto.createDecipher(_algorithm, token);
		var dec = Buffer.concat([decipher.update(buffer) , decipher.final()]);
		return dec;
	},
	
	encryptText : function(text, token) {
		
		var cipher = _crypto.createCipher(_algorithm, token);
		var crypted = cipher.update(text,'utf8','hex');
		return crypted;
	},

	decryptText : function(text, token) {
		
		var decipher = _crypto.createDecipher(_algorithm, token);
		var dec = decipher.update(text,'hex','utf8');
		dec += decipher.final('utf8');
		return dec;
	}
};