'use strict';
const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_context = require('./../application/context'),
	_cipher = require('./../tools/cipher'),
	_compress = require('./../tools/compress'),
	_collections = require('./../tools/collections'),
	_io = require('./io'),
	_fn = {
	
		pack : function(holderIdentity, data){

			var masterKey = _context.getAttribute('masterKey');
			
			var stringified = JSON.stringify(data);

			var output = Buffer.from(stringified, 'utf8');
			
			if(holderIdentity.cipher){
				
				output = _cipher.encryptBuffer(output, masterKey.key);
			}
			if(holderIdentity.compress){
				
				output = _compress.deflate(output);
			}

			return output;
		},
		
		unpack : function(holderIdentity, input){
			
			if(_.isNull(input) || _.isUndefined(input) || Object.keys(input).length === 0) return input;
			
			if(holderIdentity.compress){
				
				input = _compress.inflate(input);
			}
			
			if(holderIdentity.cipher){
				
				var masterKey = _context.getAttribute('masterKey');				
				input = _cipher.decryptBuffer(input, masterKey.key);
			}
					
			return JSON.parse(input);
		},
		
		save : function(holderIdentity, dir, data){
			
			if(holderIdentity.persistent){

				_HOLDER_.storage.put(dir, data, holderIdentity.timeToLive);
			}
		},
		
		read : function(holderIdentity, dir, callback){
			
			if(_HOLDER_.storage.exist(dir)){
				
				callback(_.noop(), _HOLDER_.storage.get(dir));
				
			}else{

				_io.read(dir, holderIdentity.nullable, (err, data) => {
					
					var data = _fn.unpack(holderIdentity, data);
					_fn.save(holderIdentity, dir, data);
					callback(_.noop(), data);
				});
			}
		},
		
		store : function(holderIdentity, dir, data, callback){
			
			var output = _fn.pack(holderIdentity, data);
			
			_io.store(dir, output, (err) => {
				
				if(err){
					
					callback(err);
					return;
				}
				
				_fn.save(holderIdentity, dir, data);
			});
		}
};

var console = process.console || global.console;

var _HOLDER_ = {

	storage : new _collections.TimedHeap(),
	stats : {}
};

module.exports = {

	store : function(holderIdentity, dir, data, callback) {
		
		//For store the callback is not consistent 100% of time.
		if(!callback) callback = () => {};
		
		_fn.store(holderIdentity, dir, data, callback);
	},

	readObject : function(holderIdentity, dir, callback) {
		
		//Nothing to do if callback is not passed
		if(!callback) callback = () => {};
		
		_fn.read(holderIdentity, dir, callback);
	}
};