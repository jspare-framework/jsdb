const /*--- Declaring imports ---*/

		Transaction = require('./../transaction/transaction'),

		_ = require('underscore'),
		_executor = require('./../transaction/executor'),
		_utils = require('./../tools/utils'),
		_http = {

			'CONTENT_TYPE' : {
				'Content-Type' : 'application/json'
			},

			'METHODS' : {
				'GET' : 'get',
				'POST' : 'post'
			},

			'STATUS' : {
				'SUCCESS' : 200,
				'DENIED' : 403,
				'ERROR' : 409,
				'INVALID' : 400,
				'FATAL' : 500,
				'FORBIDDEN' : 401
			}
		},

		_handler = {

			execute : function(res, transaction) {

				_executor.execute(transaction, function(result) {

					var data = {
						'status' : result.getType(),
						'timestamp' : _utils.now(),
						'tid' : transaction.id
					};

					res.writeHead(
						_http.STATUS[result.getType()],
						_http.CONTENT_TYPE
					);
					
					_.extend(data, _.isEmpty(result) ? {} : {
						'result' : result.getData()
					});
					res.end(JSON.stringify(data));
				});
			},

			commands : {

				'status' : {
					method : _http.METHODS.GET,
					url : '/environment/status',
					handler : function(req, res) {

						var transaction = new Transaction(req, "status");
						_handler.execute(res, transaction);
					}
				},

				'stop' : {
					method : _http.METHODS.POST,
					url : '/environment/stop',
					handler : function(req, res) {

						var transaction = new Transaction(req, "stop");
						_handler.execute(res, transaction);
					}
				},

				'addUser' : {
					method : _http.METHODS.POST,
					url : '/security/user/add',
					handler : function(req, res) {

						var user = req.body;
						var transaction = new Transaction(req, "addUser")
								.data(user);

						_handler.execute(res, transaction);
					}
				},

				'removeUser' : {
					method : _http.METHODS.POST,
					url : '/security/user/:user/remove',
					handler : function(req, res) {

						var key = req.params.user;
						var transaction = new Transaction(req, "removeUser")
								.data(key);

						_handler.execute(res, transaction);
					}
				},

				'getUser' : {
					method : _http.METHODS.GET,
					url : '/security/user/:user',
					handler : function(req, res) {

						var userKey = req.params.user;
						var transaction = new Transaction(req, "getUser")
								.data({
									'key' : userKey
								});

						_handler.execute(res, transaction);
					}
				},

				'listUsers' : {
					method : _http.METHODS.GET,
					url : '/security/users',
					handler : function(req, res) {

						var transaction = new Transaction(req, "listUsers");

						_handler.execute(res, transaction);
					}
				},

				'addInstance' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/add',
					handler : function(req, res) {

						var instance = req.params.instance;
						var transaction = new Transaction(req, "addInstance")
								.data(instance);

						_handler.execute(res, transaction);
					}
				},

				'removeInstance' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/remove',
					handler : function(req, res) {

						var instance = req.params.instance;
						var transaction = new Transaction(req, "removeInstance")
								.data(instance);

						_handler.execute(res, transaction);
					}
				},

				'listInstances' : {
					method : _http.METHODS.GET,
					url : '/instance/list',
					handler : function(req, res) {

						var transaction = new Transaction(req, "listInstances");

						_handler.execute(res, transaction);
					}
				},

				'instanceStatus' : {
					method : _http.METHODS.GET,
					url : '/instance/:instance/status',
					handler : function(req, res) {

						var instance = req.params.instance;
						var transaction = new Transaction(req, "instanceStatus")
								.data(instance);

						_handler.execute(res, transaction);
					}
				},

				'addDomain' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/domain/:domain/add',
					handler : function(req, res) {

						var data = {
							'instance' : req.params.instance,
							'domain' : req.params.domain
						};

						var transaction = new Transaction(req, "addDomain")
								.data(data);

						_handler.execute(res, transaction);
					}
				},

				'removeDomain' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/domain/:domain/remove',
					handler : function(req, res) {

						var data = {
							'instance' : req.params.instance,
							'domain' : req.params.domain
						};

						var transaction = new Transaction(req, "removeDomain")
								.data(data);

						_handler.execute(res, transaction);
					}
				},

				'listDomains' : {
					method : _http.METHODS.GET,
					url : '/instance/:instance/domain/list',
					handler : function(req, res) {

						var instance = req.params.instance;

						var transaction = new Transaction(req, "listDomains")
								.data(instance);

						_handler.execute(res, transaction);
					}
				},

				'persist' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/domain/:domain/data/persist',
					handler : function(req, res) {

						var instance = req.params.instance, domain = req.params.domain;
						var data = req.body;
						_.extend(data, {
							'instance' : instance,
							'domain' : domain
						});

						var transaction = new Transaction(req, "persist")
								.data(data);

						_handler.execute(res, transaction);
					}
				},

				'persistBatch' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/domain/:domain/data/persistBatch',
					handler : function(req, res) {

						var instance = req.params.instance, domain = req.params.domain;
						var data = {
							'instance' : instance,
							'domain' : domain,
							'entities' : req.body
						};

						var transaction = new Transaction(req, "persistBatch")
								.data(data);

						_handler.execute(res, transaction);
					}
				},

				'remove' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/domain/:domain/data/remove',
					handler : function(req, res) {

						var instance = req.params.instance, domain = req.params.domain;
						var data = req.body;
						_.extend(data, {
							'instance' : instance,
							'domain' : domain
						});

						var transaction = new Transaction(req, "remove")
								.data(data);

						_handler.execute(res, transaction);
					}
				},

				'queryFor' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/domain/:domain/data/query',
					handler : function(req, res) {

						var instance = req.params.instance, domain = req.params.domain;
						var data = req.body;
						var data = {
							'instance' : instance,
							'domain' : domain,
							'filter' : req.body
						};

						var transaction = new Transaction(req, "queryFor").data(data);

						_handler.execute(res, transaction);
					}
				},

				'count' : {
					method : _http.METHODS.POST,
					url : '/instance/:instance/domain/:domain/data/count',
					handler : function(req, res) {

						var instance = req.params.instance, domain = req.params.domain;
						var data = req.body;
						_.extend(data, {
							'instance' : instance,
							'domain' : domain
						});

						var transaction = new Transaction(req, "count")
								.data(data);

						_handler.execute(res, transaction);
					}
				},
				
				'size' : {
					method : _http.METHODS.GET,
					url : '/instance/:instance/domain/:domain/data/size',
					handler : function(req, res) {

						var instance = req.params.instance, domain = req.params.domain;
						var data = {
							'instance' : instance,
							'domain' : domain
						};

						var transaction = new Transaction(req, "size").data(data);

						_handler.execute(res, transaction);
					}
				}
			}
		};

module.exports = {

	getHandlers : function() {

		return _handler.commands;
	}
};