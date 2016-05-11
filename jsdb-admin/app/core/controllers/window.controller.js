Controllers.Window = {
		
	utils : {
		
		uniqueId : function(prefix){
			
			if(!prefix){
				
				prefix = '';
			}
			var uniqueId = Math.round(new Date().getTime() + (Math.random() * 100));
			return prefix + uniqueId;
		}
	},
	
	events : {
		
		build : function(forceClose){
			
			Nw.win.on('close', function() {
				
				var confirm = forceClose || window.confirm(App.i18n.get('app').window.exit);
				console.log('confirm close: [%s]', confirm)
				if (confirm) {
					this.hide();
					this.close(true);
				}
				return;
			});

			Nw.shortcut.add(App.Configuration.shortcuts.keys.devTools, function() {
				Nw.win.showDevTools();
			});
			Nw.shortcut.add(App.Configuration.shortcuts.keys.shell, function() {
				try {
					Controllers.Window.shellExecutor(null, true);
				} catch (e) {
					console.error(e);
				}
			});
			Nw.shortcut.add(App.Configuration.shortcuts.keys.reset, function() {
				Controllers.Window.shellExecutor('reset', false);
			});

			$('body').tooltip({
				selector : '[data-toggle="tooltip"]'
			});
		}
	},
	
	menu : {
		
		build : function(){
			
			var menuBar = new Nw.gui.Menu({ type : 'menubar' });
			
			if (navigator.platform.startsWith('Mac')) {
				menuBar.createMacBuiltin(App.Packg.window.title);
			}
			if (navigator.platform.startsWith('Win')) {
				Nw.gui.App.createShortcut(process.env.APPDATA
						+ '\\Microsoft\\Windows\\Start Menu\\Programs\\'
						+ App.Packg['app-id'] + '.lnk');
			}

			menuBar.append(Controllers.Window.menu.createItem(App.Def.menu['file']));
			
			$.each(App.Core.getModules(), function(i,m){
				
				if(m.menu != null){
					
					var menuData = typeof m.menu === 'object' ? m.menu : m.menu(top);
					menuBar.append(Controllers.Window.menu.createItem(menuData));
				}
			});
			$.each(App.Core.getPlugins(), function(i,p){
				
				if(p.menu != null){
					
					var menuData = typeof m.menu === 'object' ? m.menu : m.menu(top);
					menuBar.append(Controllers.Window.menu.createItem(menuData));
				}
			});
			
			//TODO Add Plugins Menu
			
			menuBar.append(Controllers.Window.menu.createItem(App.Def.menu['help']));

			// Assign it to `window.menu` to get the menu displayed
			Nw.win.menu = menuBar;
		},
		
		createItem : function(menu){
			
			var submenu = new Nw.gui.Menu();
			for (childKey in menu.itens) {
				
				if(childKey === 'separator'){
					
					submenu.append(new Nw.gui.MenuItem({ type: 'separator' }));
					continue;
				}
					
				var item = menu.itens[childKey];
				submenu.append(new Nw.gui.MenuItem({
					label : App.i18n.get('app').menu[childKey],
					key : item.key,
					click : item.click
				}));
			}

			return new Nw.gui.MenuItem({
				label : App.i18n.get('app').menu[menu.id],
				key : menu.key,
				submenu : submenu
			});
		}
	},
	
	newChild : function(page, options){
		
		var child = Nw.gui.Window.open(page, options);
		child.on('loaded', function(){
            child.window.setParent(window);
            child.window.onLoad();
        });
	},
	
	sidebar : {

		build : function(){
			
			var sidebar = $('#side-menu');
			sidebar.empty();
			
			sidebar.append(Controllers.Window.sidebar.createItem({ label : App.i18n.get('app').title, type : 'nav-title' }));
			
			$.each(App.Core.getModules(), function(i,m){
				
				if(m.sidebar != null){
					var sidebarData = typeof m.sidebar === 'object' ? m.sidebar : m.sidebar(top);
					sidebar.append(Controllers.Window.sidebar.createItem(sidebarData));
				}
			});
			
			sidebar.metisMenu();
		},
		createItem : function(item, level){
			
			//Create sidebar item
			var sidebarItem = $('<li>').append();
			
			if(item.type){
				
				sidebarItem.addClass(item.type);
			}
			
			var label = $('<a>');
			if(item.label){
				label.html('&nbsp;' + item.label + (item.itens ? '<span class="fa arrow"></span>' : ''))
				sidebarItem.append(label);
			}
			
			if(item.icon){
				
				label.prepend($('<i>').addClass('fa fa-' + item.icon + ' fa-fw'));
			}
			if(item.click){
				
				label.click(function(e){
					
					item.click(top, e);
				});
			}
			
			//Validate if exist itens and iterate for create childs itens
			if(item.itens){
				if(!level) level = 'second';
				else level = 'third';
				
				var childs = $('<ul>').addClass('nav nav-' + level +'-level');
				$.each(item.itens, function(k,v){
					childs.append(Controllers.Window.sidebar.createItem(v, level));
				});
				sidebarItem.append(childs);
			}
			return sidebarItem;
		}
	},
	
	content : {
		
		container : {},
		
		current : null,
		
		build : function(){
			
			$('#tab-container-nav').on('click', ' li a .tab-close', function(e) {
				e.preventDefault();
				var tabId = $(this).parents('li').children('a').attr('href');
				Controllers.Window.content.close(tabId, this);
			});
			
			
			var settings = Controllers.Core.Storage.get('settings');
			Controllers.Window.content.fracs(settings.fracs);
		},
		
		open : function(view) {
			
			var prefixId = 'tab_' + view.id;
			if(view.options.unique && Controllers.Window.content.container[prefixId]){
				
				if(view.options.uniqueAccessTrigger){
					
					view.options.uniqueAccessTrigger();
				}
				
				return;
			}
			
			var id = (view.options.unique) ? prefixId : Controllers.Window.utils.uniqueId(prefixId);
			var nav = $('<li role="presentation"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + view.title + ' <span class="tab-close"><i class="fa fa-times fa-1"></i></span></a></li>');
			var content = $('<div>', { id : id }).addClass('tab-pane').attr('role','tabpanel').append(view.content);
			
			$('#tab-container-nav').append(nav);
			$('#tab-container-content').append(content);
			
			$('[href=#'+id+']').on('shown.bs.tab', function (e) {
				var target = $(e.target).attr("href") // activated tab
				Controllers.Window.content.current = view;
			});
			
			$.each(view.resources, function(i, r){
				
				$.getScript( r, function( data, textStatus, jqxhr ) {
					console.log( r + ' loaded.' );
				});
			});
			$('[href=#'+id+']').tab('show');
			
			Controllers.Window.content.container[id] = view;
		},
		
		close : function(tabId, context){
			var close = true;
			var containerId = tabId.split('#')[1];
		    if(Controllers.Window.content.container[containerId].onClose){
		    	close = Controllers.Window.content.container[containerId].onClose(context);
		    }
		    if(close){
		    	var tabId = $(context).parents('li').children('a').attr('href');
			    $(context).parents('li').remove('li');
			    $(tabId).remove();
			    $('#tab-container-nav a:first').tab('show');
			    Controllers.Window.content.current = null;
			    delete Controllers.Window.content.container[containerId];
		    }
		},
		
		fracs : function(value){
			
			if(!value){
				$('#outline').hide();
				return;
			}
			
			$('#outline').fracs('outline', {
			    crop: true,
			    styles: [
			        {
			            selector: 'header,footer,section,article',
			            fillStyle: 'rgb(230,230,230)'
			        },
			        {
			            selector: 'h1',
			            fillStyle: 'rgb(240,140,060)'
			        }
			    ]
			});
			$('#outline').show();
		}
	},
	
	changeLanguage : function(locale){
		
		localStorage.locale = locale;
		App.i18n.setLocale(locale);
	},

	showLoader : function() {

		$("#loading").fadeIn();
	},

	hideLoader : function() {

		$("#loading").delay(100).fadeOut("slow");
	},
	
	errorListener : function(message, url, lineNumber, columnNumber, error) {  
		
		console.error(error.stack);
		Controllers.Window.hideLoader();
		
		var settings = Controllers.Core.Storage.get('settings');
		if(!settings.showErrors) return;
		
		var errorCode = '{0}:{1}:{2}'.format(error.name, lineNumber,columnNumber);
		window.alert(App.i18n.get('app').window.alert.error.format(errorCode));
		//TODO audit error
	},
	
	shellExecutor : function(cmd, showResult) {
		console.info('Shell Executor invoked');
		
		if (!cmd) cmd = window.prompt("Digite o comando a ser executado");
		if (App.Configuration.shortcuts.commands[cmd]) cmd = App.Configuration.shortcuts.commands[cmd];
		cmd =App.Configuration.shortcuts.commands[cmd] || cmd;
		if (showResult) {
			resp = eval(cmd);
			if (!resp)
				resp = 'Command executed with success';
			window.alert(resp);
			return;
		}
		eval(cmd);
	}
};

// Sets the min-height of #page-wrapper to window size
$(function() {
	
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height + 51) + "px");
            $(".tab-container").css("min-height", (height - 10) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});
window.onerror = Controllers.Window.errorListener;