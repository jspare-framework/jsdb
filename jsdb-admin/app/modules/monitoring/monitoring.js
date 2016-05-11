var _i18n = require('./../../core/lib/i18n').load('instances',
		'../../modules/backup/locale/').get('instances');

module.exports = {

	id : 'monitoring',

	type : 'content',

	menu : null,

	sidebar : {
		label : _i18n.title,
		icon : 'sitemap',
		itens : {

			'addConnection' : {
				label : _i18n.addConnection,
				icon : 'plus',
				click : function() {
					window.alert('addConnection');
				}
			},
			'refresh' : {
				label : _i18n.refresh,
				icon : 'refresh',
				click : function() {
					window.alert('refresh');
				}
			},
			'separator' : {
				type : 'separator'
			}
		}
	}
};