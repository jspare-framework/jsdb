const /*--- Declaring imports ---*/
	
	_moment = require('moment'),
	_path = require('path');

module.exports = {

	DEFAULT_DATE_PATTERN : 'YYYY-MM-DDTHH:mm:ss.SSS',

	getSystemUsername : function(){
		
		var dir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'].split(_path.sep);
		if(dir.length <= 0) return '';
		return dir[dir.length - 1];
	},
	militime : function(){
		
		return new Date().getTime();
	},
	normalizeUri : function(url){
		
		var l = url.slice(-1);
		if(l == '/'){
			url = url.substring(0, url.length - 1);
		}
		return url;
	},
	now : function() {

		return _moment().format(this.DEFAULT_DATE_PATTERN);
	}
};