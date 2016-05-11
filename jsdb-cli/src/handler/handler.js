const /* Declaring Imports */

	_ = require('underscore'),
	_jsdb = require('jsdb-nc'),
	_argv = require('string-argv'),
	
	_validateCommand = function(command){
	
		if(_commands[command]) return true;

		if(_jsdbc[command]) return true;

		return false;
	},
	
	_callback = function(err, result){
		
		if(err){
			
			console.log('jsdb> ' +'Err: ' + err);
			_rl.prompt();
			return;
		}

		var content;
		try {
			content = JSON.parse(result);
		} catch (e) {
			content = result;
		}
				
		console.info(JSON.stringify(content, null, 2));
		_rl.prompt();
	},
	
	_commands = {
		
		version : function(){
				
			console.log('jsdb> ' +'jsdb-cli: 0.0.1');
			_rl.prompt();
		},
		help : function(){
			
			console.log('jsdb> ' +'Access: http://jspare.org/jsdb for more info.')
			
			_rl.prompt();
		},
		exit : function(){
			
			_rl.close();
		},
		use : function(){
			
			var instance = arguments[1];
			
			_config.connection.datasource.instance = instance;
			_jsdbc = _jsdb.build(_config.connection);

			console.log('jsdb> ' +'using instance: ' + instance);
			
			_rl.prompt();
		},
		credential : function(){
			
			var credential = arguments[1];
			
			_config.connection.credential = credential;
			_jsdbc = _jsdb.build(_config.connection);

			console.log('jsdb> ' +'using credential: ' + credential);
			
			_rl.prompt();
		},
		connection : function(){

			_callback(_.noop(), _config.connection);
		},
		shutdown : function(){
			
			//TODO
			console.log('jsdb> ' +'Not implemented yet');
			_rl.prompt();
			
		},
		restart : function(){
			
			//TODO
			console.log('jsdb> ' +'Not implemented yet');
			_rl.prompt();
		},
		addInstance : function(){
			
			var instance = arguments[1];
			_jsdbc.addInstance(_callback, instance);
		},
		removeInstance : function(){
			var instance = arguments[1];
			_jsdbc.removeInstance(_callback, instance);
		},
		listDomains : function(){
			
			var instance = arguments[1];
			_jsdbc.listDomains(_callback, instance);
		}
	},
	_execute = function(){
		
		var method = arguments[0]; 

		var args =_.toArray(arguments);
		args.splice(0,1);
		
		console.log('jsdb> ' +'Executing [%s] St: [%s]', method, new Date());
		args.push(_callback);
		
		try {
			
			
			_jsdbc[method].apply(_jsdbc, args);
		} catch (e) {

			console.log('jsdb> ' +'Hey, invalid parameters to command [%s]. Parameters available: [%s] Try [help] for more info.', method, Array.prototype.slice.call(_jsdbc[method]))	;
		}
		
		
	};

var _readline, _rl, _config, _jsdbc;


module.exports = {
		
	build : function(config, readline, rl){
		
		_readline = readline;
		_config = config;
		_rl = rl;
		
		_jsdbc = _jsdb.build(_config.connection);
	},
	
	handle : function(line){
		
		//TODO manter commando
		var commands = _argv.parseArgsStringToArgv(line);
		var command = _.first(commands);
		
		if(!_validateCommand(command)){
			console.log('jsdb> ' +'Hey, invalid command. Try [help] for more info.');
			_rl.prompt();
			return;
		}
		
		if(_commands[command]){
			
			_commands[command].apply(this, commands);
			return;
		}
		
		_execute.apply(this, commands);
	}
};