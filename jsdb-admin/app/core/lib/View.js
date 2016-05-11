const /* Declaring imports */
	
	_ = require('underscore'),
	_mustache = require('mustache'),
	_i18n = require('./i18n');

module.exports = {
		
	parse : function(app, ref, done){
		
		var content = app.$('<content>').load(ref.template, null, function(){
			
			content.html(_mustache.render(content.html(), ref.context));
			
			var view = {
				id : ref.id,
				context : ref.context,
				content : content,
				onClose : ref.onClose,
				options : ref.options,
				resources : ref.resources,
				title : ref.title
			};
			done(view);
		});
	},
	
	parseString : function(content, view){
		
		if(undefined === view || view === null){
			
			view = {};
		}
		if(!view.i18n){
			
			view.i18n = {};
		}
		_.extend(view.i18n, _i18n.get('app'));
		
		return _mustache.render(content, view);
	}
};