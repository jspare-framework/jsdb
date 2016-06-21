const /*--- Declaring imports ---*/

	Resource = require('./resource'),

	_ = require('underscore'),
	_express = require('express'),
	_expressCompress = require('compression'),
	_bodyParser = require('body-parser'),
	_cors = require('cors'),
	_config = require('./../application/config'),
	_logger = require('./../application/logger')
	_io = require('./../storage/io'),
	_appRoot = require('app-root-path').path,
	_handlers = require( './handlers'),
	_fn = {
	
		engine : _express(),
		
		getMappings : function(){
			
			var mappings = [];
			_.each(_handlers.getHandlers(), function(h){
				
				mappings.push(h)
			});
			return mappings;
		},
		
		build : function(){
			
			var serverConfig = _config.get('server');
			
			var mappings = _fn.getMappings();
			
			var jsdb = function (req, res, next) {
				  res.header('x-powered-by', 'JSDB');
				  next();
			};
			
			_fn.engine.use(_cors());
			_fn.engine.options('*', _cors());
			
			_fn.engine.use(_bodyParser.json(
					{ 'limit' : serverConfig.maxPersistSize }
			));
			_fn.engine.use(_expressCompress());
			
			_.each(_resources, function(r){
				
				if(r.middleware){
					
					_fn.engine.use(r.path,r.middleware, r.doIt(r.context));
					return;
				}
				_fn.engine.use(r.path,r.doIt(r.context));
			});
		
			_fn.engine.param('instance', function(req, res, next, instance) {

				req.instance = instance;
			    next(); 
			});
			
			_fn.engine.all('*', function(req, res, next){
				
				var originalUrl = req.originalUrl,
					er = /\/instance\/(.*?)\/.*/,
					instance = er.exec(originalUrl);
				
				if(instance !== null){
					
					originalUrl = originalUrl.replace(instance[1],':instance');
				}			
								
				next();
			});
			
			_.each(mappings, function(mapping){
				
				if(mapping.method === 'get'){
					_fn.engine.get(mapping.url,jsdb, mapping.handler);
				}
				else if(mapping.method === 'post'){
					_fn.engine.post(mapping.url,jsdb, mapping.handler);
				}
				else throw 'Method not implemented.';
			});
		}
};

var _app = null, _resources = [];

var console = process.console || global.console;

module.exports = {
		
	addResource : function(resource){
		
		_resources.push(resource);
	},
	
	Resource : Resource,
	
	router : function(){
		
		_fn.build();
		
		return _fn.engine;
	},
	
	start : function(){
		
		_fn.build();
		
		_app = _fn.engine;
		
		var serverConfig = _config.get('server');
		
		if(serverConfig.security.enable){
			
			_logger.info('https enabled');
			
			var privateKeyPath = _appRoot + serverConfig.security.privateKey;
			var certificatePath = _appRoot + serverConfig.security.certificate;
			
			
			if(_.isEmpty(serverConfig.security.privateKey) || !_io.exist(privateKeyPath)){
				
				var ex = new _error.EnvironmentError('SRVPKNF');
				_logger.error('error Code: [%s] message: [%s]', ex.name, ex.message);
				process.exit(1);
			}
			if(_.isEmpty(serverConfig.security.certificate) || !_io.exist(certificatePath)){
				
				var ex = new _error.EnvironmentError('SRVCERNF');
				_logger.error('error Code: [%s] message: [%s]', ex.name, ex.message);
				process.exit(1);
			}
			
			var https = require('https');
			var privateKey  = fs.readFileSync(privateKeyPath, 'utf8');
			var certificate = fs.readFileSync(certificatePath, 'utf8');

			var credentials = {key: privateKey, cert: certificate};
			
			_app = _app.createServer(credentials);
		}
		
		//Work with cluster option XXX BETA - Will be improved
		if(serverConfig.cluster.enable){
			
			_logger.info('cluster enabled');
			
			var cluster = require('cluster');
			
			if (cluster.isMaster) {
				
			    var cpuCount = require('os').cpus().length;
			    for (var i = 0; i < cpuCount; i += 1) {
			    	
			        cluster.fork();
			    }
			}else{
				
				//TODO Check cluster listener
				_app = _app.listen(serverConfig.port, () => {

					_logger.info('server [%s] - started on port [%s]', _config.get('name'), serverConfig.port);
				});
				_logger.info('server [%s] - started on port [%s] cluster [%s]', _config.get('name'), serverConfig.port, cluster.worker.id);
			}
			
			// Listen for dying workers
			cluster.on('exit', (worker) => {

				_logger.info('lost cluster %d ', worker.id);
			    cluster.fork();
			});
			return;
		}
		
		_app = _app.listen(serverConfig.port, () => {
			
			_logger.info('server [%s] - started on port [%s]', _config.get('name'), serverConfig.port);
		});
	},
	
	stop : function(){
		
		if(_app != null){
			
			_logger.info('server [%s] - will be stoped', _config.get('name'));
			
			_app.close();
		}
	}	
};