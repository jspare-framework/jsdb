Controllers.ViewInstance = {
		
	renderSuccessStatus : function(result){
		
		var block = $('<dl>');
		block.append($('<dt>').text('Status'));
		block.append($('<dd>').text(result.state));
		block.append($('<dt>').text('Started at'));
		block.append($('<dd>').text(result.started));

		return block;
	}	
};

$(function() {

	var connection = Controllers.Window.content.current.context.connection;
	
	Controllers.Instances.checkStatus(connection.dataSource, connection.credential, function(response) {
		if (response instanceof Error || response.status != 'SUCCESS') {
			alert(App.i18n.get('instances').connFail);
			return;
		}
		
		var content = [];
		
		content.push(Controllers.ViewInstance.renderSuccessStatus(response.result.state));
		
		$('#status-content').append(content);
		
		alert(App.i18n.get('instances').connSuccess);
	});

});
//@ sourceURL=\modules\instances\viewInstance.controller.js
