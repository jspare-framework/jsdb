App.Jsdb = require('jsdb-nc');

Controllers.Instances = {

	checkStatus : function(datasource, credential, callback) {
		
		var connection = {
				
				datasource : datasource,
				credential : credential
		}
		App.Jsdb.build(connection).status(callback, callback);
	},

	saveConnection : function(connection) {

		//TODO adicionar validação se conexão ja existe -> Bugfix #P3
		
		var connections = Controllers.Core.Storage.get('connections');
		if(!connections){
			
			connections = {};
		}
		
		connections[connection.name] = connection;
		Controllers.Core.Storage.save('connections', connections);
		
		return true;
	},
	
	listDomains : function(connection, onSucces, onError){

		App.Jsdb.build(connection).listDomains(onSuccess, onError);
	},
	
	getConnections : function(){
		
		var connections = Controllers.Core.Storage.get('connections');
		if(!connections){
			
			connections = {};
		}
		return connections;
	}
	
};