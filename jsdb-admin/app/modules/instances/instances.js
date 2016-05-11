const
_ = require('underscore'),
_view = require('./../../core/lib/view'), _i18n = require(
		'./../../core/lib/i18n').load('instances',
		'../../modules/instances/locale/').get('instances');

module.exports = {

	id : 'instances',

	type : 'content',

	menu : null,

	sidebar : function(app) {

		var sidebar = {
			label : _i18n.title,
			icon : 'sitemap',
			itens : {

				'addConnection' : {
					label : _i18n.addConnection,
					icon : 'plus',
					click : function(app, event) {
						var ref = {
							id : 'addConnection',
							context : {
								i18n : _i18n,
								current : 'addConnection'
							},
							title : _i18n.addConnection,
							template : './modules/instances/addInstance.html',
							resources : [
									'./modules/instances/instances.controller.js',
									'./modules/instances/addInstance.controller.js' ],
							options : {
								unique : true
							},
							onClose : function(context) {
								return true;
							}
						};

						var view = _view.parse(app, ref, function(view) {

							app.Controllers.Window.content.open(view);
						});
					}
				},
				'refresh' : {
					label : _i18n.refresh,
					icon : 'refresh',
					click : function() {
						
						app.Controllers.Window.sidebar.build();
					}
				},
				'separator' : {
					type : 'separator'
				}
			}
		};
		
		
		var connections = app.Controllers.Core.Storage.get('connections');
		if(!connections){
			
			connections = {};
		}
		_.each(connections, function(conn){
			
			sidebar.itens[conn.name] = {
					label : conn.name,
					icon : 'server',
					click : function() {
						
						var ref = {
								id : 'viewInstance',
								context : {
									i18n : _i18n,
									current : 'viewInstance'
								},
								title : conn.name,
								template : './modules/instances/viewInstance.html',
								resources : [
										'./modules/instances/instances.controller.js',
										'./modules/instances/viewInstance.controller.js' ],
								options : {
									unique : true,
									uniqueAccessTrigger : function(){
										//App.i18n.get('instances').connSuccess
										app.alert('Feche a conexão existente para se conectar em ' + conn.name);
									}
								},
								onClose : function(context) {
									return true;
								}
							};

							var view = _view.parse(app, ref, function(view) {

								view.context.connection = conn;
								app.Controllers.Window.content.open(view);
							});
					}	
			}
		});
		return sidebar;
	}
};