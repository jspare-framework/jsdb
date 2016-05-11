$(document).ready(function() {
	
	/* ----------- Page Loader ----------- */
	var content = $('#wrapper').html();
	$('#wrapper').html(App.View.parseString(content, App.Context));
	$('#version').html('V' + App.Packg.version + ' C'+ App.Packg.compileId);
	
	Controllers.Window.menu.build();
	Controllers.Window.events.build();
	Controllers.Window.sidebar.build();
	Controllers.Window.content.build();
	
	$('#wrapper').show();
	
	/* ----------- Execute Load Settings ----------- */
	var settings = Controllers.Core.Storage.get('settings');
	if (settings.maximizedOnLoad) {

		Nw.win.maximize();
	}
});

/** =================== Load Function =================== */
$(window).load(function() {
	"use strict";
	Controllers.Window.hideLoader();
});