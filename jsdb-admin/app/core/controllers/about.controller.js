/**
 * =================== Ready Function ===================
 * 
 * On Document Ready, import lib's and registry the principal events.
 * 
 */
$(document).ready(function() {
	
	App.View = global.window.require('./core/lib/View');
	var content = $('body').html();
    $('body').html(App.View.parseString(content, {}));
    $('body').show();
});

/** =================== Load Function =================== */
$(window).load(function() {
	"use strict";
});