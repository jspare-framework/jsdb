const 
	
	_view = require('./../../core/lib/view'),
	_i18n = require('./../../core/lib/i18n').load('backup', '../../modules/backup/locale/').get('backup'),
	_html = './modules/backup/backup.html',
	_resources = [ './modules/backup/backup.controller.js' ];

module.exports = {

	menu : null,

	sidebar : {
		label : _i18n.title,
		icon : 'files-o',
		itens : {

			'migrate' : {
				label : _i18n.migrate,
				icon : 'circle-o',
				click : function(app, event) {
					
					var ref = {
						id : 'backup_restore',
						context : { i18n : _i18n, current : 'migrate' },
						title : _i18n.migrate,
						template : _html,
						resources : _resources,
						options : { 
							unique : true
						},
						onClose : function(context){
							console.info('closing...');
							return true;
						}
					};
					
					var view = _view.parse(app, ref, function(view){
						
						app.Controllers.Window.content.open(view);
					});
				}
			},
			'backup' : {
				label : _i18n.backup,
				icon : 'circle-o',
				click : function(app, event) {
					

					var ref = {
						id : 'backup_restore',
						context : { i18n : _i18n, current : 'backup' },
						title : _i18n.migrate,
						template : _html,
						resources : _resources,
						options : { 
							unique : true
						}
					};
					
					var view = _view.parse(app, ref, function(view){
						
						app.Controllers.Window.content.open(view);
					});
				}
			},
			'restore' : {
				label : _i18n.restore,
				icon : 'circle-o',
				click : function(app, event) {

					var ref = {
						id : 'backup_restore',
						context : { i18n : _i18n, current : 'restore' },
						title : _i18n.migrate,
						template : _html,
						resources : _resources,
						options : { 
							unique : true
						}
					};
					
					var view = _view.parse(app, ref, function(view){
						
						app.Controllers.Window.content.open(view);
					});
				}
			}
		}
	}
};