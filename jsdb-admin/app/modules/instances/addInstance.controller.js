$(function() {

	$('#cmd_add_connection').on('click', function(e) {
		e.preventDefault();
		
		if ($('#name').val() === null || $('#name').val() === '') {
			alert(App.i18n.get('instances').invalidName);
			return;
		}

		var connection = {
			name : $('#name').val(),
			dataSource : {
				host : $('#host').val(),
				port : parseInt($('#port').val()),
				instance : $('#instance').val()
			},
			credential : $('#credential').val()
		};

		Controllers.Instances.saveConnection(connection);
		Controllers.Window.sidebar.build();
		alert(App.i18n.get('instances').connAddSuccess);
	});

	$('#cmd_test_connection').on('click', function(e) {
		e.preventDefault();

		var credential = $('#credential').val();
		if (credential === null || credential === '') {
			alert(App.i18n.get('instances').invalidCredential);
			return;
		}

		var dataSource = {
			host : $('#host').val(),
			port : parseInt($('#port').val()),
			instance : $('#instance').val()
		};

		Controllers.Instances.checkStatus(dataSource, credential,
			function(result) {

				if (result instanceof Error
						|| result.status != 'SUCCESS') {
					alert(App.i18n.get('instances').connFail);
					return;
				}

				alert(App.i18n.get('instances').connSuccess);
			});
	});
});
//@ sourceURL=\modules\instances\addInstance.controller.js
