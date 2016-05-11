Controllers.Core = {

	Storage : {

		get : function(name) {

			var storage = localStorage[name] || null;

			try {

				return JSON.parse(storage);
			} catch (e) {

				return storage;
			}
		},

		save : function(name, data) {
			if (Object.prototype.toString.call(data) !== '[object String]') {

				data = JSON.stringify(data);
			}
			localStorage[name] = data;

		}
	},

	audit : function(type, message) {

		var audit = Controllers.Core.Storage.get('audit');
		audit.push({
			'type' : type,
			'message' : message
		});
		Controllers.Core.Storage.save('audit', audit);
	},

	relateError : function(err) {

		Controllers.Core.audit('REL_ERROR', err);
		// TODO call server service for relate error
	}
};

/**
 * =================== Ready Function ===================
 * 
 * On Document Ready, import lib's and registry the principal events.
 * 
 */
$(document).ready(function() {

	var loaded = localStorage.installationDate;
	if (!loaded) {
		console.info('Loading application first time.')
		var defaultSettings = {
			'locale' : 'ptBR'
		};

		localStorage.installationDate = new Date();
		localStorage.settings = JSON.stringify(defaultSettings);
	}

	var context = {
		'parent' : window,
		'document' : document,
		'jquery' : $
	};

	/* ----------- Define GUI Imports ----------- */
	Nw.gui = global.window.require('nw.gui');
	Nw.win = Nw.gui.Window.get();
	Nw.shortcut = global.window.require('./core/lib/Shortcut'); //TODO Change for Nw cmpt
	Nw.shortcut.load(context);

	/* ----------- Define Application Imports ----------- */
	App.Configuration = require('./core/commons/configuration');
	App.Core = require('./core/lib/Core');
	App.i18n = require('./core/lib/i18n');
	App.Packg = require('./../package');
	App.Reflector = require('./core/lib/Reflector');
	App.View = require('./core/lib/View');

	/* ----------- Application Definitions ----------- */
	App.Def = {

		menu : {
			'file' : {
				id : 'file',
				key : 'f',
				itens : {
					'config' : {
						id : 'config',
						click : function() { 
							Controllers.Window.newChild('./core/view/settings.html',
							{
								"title" : App.i18n.get('app').settings.title,
								"focus" : true,
								"toolbar" : false,
								"frame" : true,
								"width" : 765,
								"min_width" : 765,
								"height" : 400,
								"min_height" : 400,
								"position" : "center",
								"resizable" : true,
								"always-on-top" : false,
							});
						}
					},
					'separator' : null,
					'exit' : {
						id : 'exit',
						click : function() {
							Nw.win.close();
						}
					}
				}
			},
			'help' : {
				id : 'help',
				key : 'h',
				itens : {

					'docs' : {
						id : 'docs',
						click : function() { 
							Nw.gui.Shell .openExternal(App.i18n.get('app').menu.documentationUrl);
						}
					},
					'separator' : null,
					'about' : {
						id : 'about',
						click : function(){ 
							Nw.gui.Window .open('./core/view/about.html', {
								"title" : App.i18n.get('app').about.title,
								"focus" : true,
								"toolbar" : false,
								"frame" : true,
								"width" : 250,
								"height" : 150,
								"position" : "center",
								"resizable" : false,
								"always-on-top" : false,
								"show_in_taskbar" : false, 
							});
						}
					}
				}
			}
		}
	};

	/* ----------- Registry Events ----------- */

	var settings = Controllers.Core.Storage.get('settings');

	App.i18n.load('app', './../locale/');
	App.i18n.setLocale(settings.locale);

	if(!sessionStorage.start){
		sessionStorage.start = true;
		App.Core.loadModules();
		App.Core.importPlugins();
	}
});