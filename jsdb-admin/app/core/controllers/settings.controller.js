Controllers.Settings = {

	configuration : {

		"general" : {

			"locale" : {

				type : 'select',
				values : function() {

					var locales = App.i18n.getLocales();
					var values = [];
					$.each(locales, function(i, l) {
						values.push({
							name : App.i18n.get('app', l).locale,
							value : l
						});
					});
					return values;
				},
				defaultValue : 'ptBR'
			}
		},
		"window" : {

			"maximizedOnLoad" : {
				type : 'boolean',
				defaultValue : false
			},
			"fracs" : {
				type : 'boolean',
				defaultValue : false
			},
			"showErrors" : {
				type : 'boolean',
				defaultValue : false
			}
		}
	},
	
	bind : function(){
		
		$('#cmd_settings_apply').on('click', function(e) {
			e.preventDefault();

			alert(App.i18n.get('app').settings.applied);

			Controllers.Settings.save(false);
		});

		$('#cmd_settings_ok').click(function(e) {
			e.preventDefault();
			alert(App.i18n.get('app').settings.applied);
			Controllers.Settings.save(true);
		});
	},

	build : function() {
		console.log('Build settings screen.');

		$.each(Controllers.Settings.configuration, function(i, group) {

			console.log('Generating tab [%s]', i);

			var groupPill = $('<li>').append(
					$('<a>').attr('href', '#' + i).attr('data-toggle', 'tab')
							.text(App.i18n.get('app').settings[i] || i));
			$('#nav-settings-nav').append(groupPill);

			var content = $('<div>', {
				id : i
			}).addClass('tab-pane fade');
			content
					.append($('<h4>')
							.text(App.i18n.get('app').settings[i] || i));
			$.each(group, function(k, item) {
				console.info('Processing item: [%s]', k)
				content.append(Controllers.Settings.createItem(k, group[k]));
			});
			$('#nav-settings-content').append(content);
		});

		var content = $('body').html();
		$('body').html(App.View.parseString(content, {}));
		$('body').show();
		
		Controllers.Settings.bind();

		$('#nav-settings-nav a:first').tab('show');
	},

	createItem : function(name, item) {

		var content = $('<div>', {
			'class' : 'form-group'
		}), label = $('<label>').text(
				App.i18n.get('app').settings[name] || name);

		content.append(label);

		if (item.type === 'select') {

			var component = $('<select>', {
				'type' : 'select',
				'class' : 'form-control',
				'name' : 'settings_' + name
			});
			
			var settings = parentWindow.Controllers.Core.Storage.get('settings');
			var defaultValue = settings[name] || item.defaultValue;
			$.each(item.values(), function(i, v) {

				component.append($('<option>', {
					value : v.value,
					name : v.name,
					selected : (defaultValue === v.value)
				}).text(v.name));
			});

			content.append(component);
		}
		if (item.type === 'boolean') {
			content.addClass('checkbox');
			var input = $('<input>', {
				'type' : 'checkbox',
				'name' : 'settings_' + name
			});

			var settings = parentWindow.Controllers.Core.Storage.get('settings');
			input.attr('checked', settings[name] || item.defaultValue);

			label.prepend(input);
		}
		return content;
	},
	save : function(close) {

		$("form .panel").each(function() {
			var settings = {};
			$.each($(this).find(':input'), function(i, el) {
				settings[el.name.substring(9)] = ($(el) .is(':checkbox')) ? $(el).prop('checked') : $(el).val();
			});
			parentWindow.Controllers.Core.Storage.save('settings', settings)
		});
		if (close) {

			window.close();
		}
	}

};

/**
 * =================== Ready Function ===================
 * 
 * On Document Ready, import lib's and registry the principal events.
 * 
 */
$(document).ready(function() {

	Nw.gui = global.window.require('nw.gui');
	Nw.win = Nw.gui.Window.get();

	App.i18n = require('./core/lib/i18n');
	App.View = require('./core/lib/View');
	
	parentWindow.Controllers.Window.menu.build();
	parentWindow.Controllers.Window.events.build(true);
});

/** =================== Load Function =================== */
$(window).load(function() {
	"use strict";
});