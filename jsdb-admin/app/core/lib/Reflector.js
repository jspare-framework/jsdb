/**
 * Reflector API
 */

var itensPerformed = []; 

function contains(obj, a) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}

function each( obj, callback ) {
	var length = obj.length, i = 0;
	for ( ; i < length; i++ ) {
		if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
			break;
		}
	}
	return obj;
}

function performArrayAction(array, doIt, afterDoIt, afterCallback, errorCallback){
	if(array.length === itensPerformed.length){
		afterCallback();
		return;
	}
	
	each(array, function(i, item){
		if(contains(i, itensPerformed)){ return;}
		itensPerformed.push(i);
		
		doIt(item, function(data) {
			afterDoIt(data);
			performArrayAction(array,doIt,afterDoIt,afterCallback,errorCallback);
		}, function (error) {
			errorCallback(error);
			return;
		});
		
		return false;
	});
}

module.exports = {

		performArray : function(array, doIt,afterDoIt, afterCallback, errorCallback){
			itensPerformed = []; 
			performArrayAction(array, doIt,afterDoIt, afterCallback, errorCallback);
		
		}
};