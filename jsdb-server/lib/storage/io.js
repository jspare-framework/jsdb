const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_fs = require('fs'),
	_mkdirp = require('mkdirp'),
	_error = require('./../application/error');

var console = process.console || global.console;

module.exports = {

	load : function(dir) {

		if (!_fs.existsSync(dir)) {
			return _mkdirp.sync(dir);
		}
		return true;
	},
	
	exist : function(dir){
		
		return _fs.existsSync(dir);
	},
	
	removeDir : function(dir){
		
		if (_fs.existsSync(dir)) {
			_fs.readdirSync(dir).forEach(function(file, index) {
				var curPath = dir + '/' + file;
				if (_fs.lstatSync(curPath).isDirectory()) { // recurse
					module.exports.removeDir(curPath);
				} else { // delete file
					_fs.unlinkSync(curPath);
				}
			});
			_fs.rmdirSync(dir);
		}
	},

	remove : function(dir) {

		try {

			_fs.unlinkSync(dir);

		} catch (e) {
			
			if (e.code !== 'ENOENT') {
				
				throw new _error.EnvironmentError('EIO666');
			}

			throw e
		}
	},
	
	storeSync : function(dir, output) {

		_fs.writeFileSync(dir, output);
	},
	
	store : function(dir, output, callback) {

		_fs.writeFileSync(dir, output);
		
		callback();
	},
	
	stat : function(dir){
		
		var stat = _fs.statSync(dir);
		return stat;
	},
	
	readSync : function(dir, nullable) {

		try {

			var data = _fs.readFileSync(dir);
			return data;
		} catch (e) {
			if (e.code !== 'ENOENT') {
				console.error('error on %s', dir);
				console.error('STORAGE.js read ---FIXME---')
				// TODO LIST FIXME Vulnerable point
				throw new _error.EnvironmentError('EIO666');
			}

			if (nullable) {

				return {};
			}

			throw new _error.EnvironmentError('EIO01');
		}
	},
	
	read : function(dir, nullable, callback) {

		var data = _fs.readFile(dir, function(err, data){
			
			if(err){
				if (err.code !== 'ENOENT') {
					console.error('error on %s', dir);
					callback(new _error.EnvironmentError('EIO666'));
					return;
				}

				if (nullable) {

					callback(_.noop(), {});
					return;
				}
				callback(new _error.EnvironmentError('EIONTF'));
			}
			
			callback(_.noop(), data);
		});
	},

	list : function(dir) {
		
		return _fs.readdirSync(dir).filter(function (file) {
			return _fs.statSync(dir + '/' + file).isDirectory();
		});
	},
	
	listFiles : function(dir) {
		
		return _fs.readdirSync(dir).filter(function (file) {
			return _fs.statSync(dir + '/' + file).isFile();
		});
	}
};