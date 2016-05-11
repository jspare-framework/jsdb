const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_crypto = require('crypto'),
	_moment = require('moment'),
	
	TOKEN_TIMESTAMP_PREFIX = 'YYYYMMDDHHmmssSSS';

module.exports = {

	generateToken : function() {

		return _crypto.randomBytes(16).toString('hex');
	},
	generateTid : function(){
		
		return _.uniqueId(_moment().format(TOKEN_TIMESTAMP_PREFIX));
	}
};