const _identities = {
		
	KERNEL_HOLDER_IDENTITY : {
		persistent : true, //Indicates that the resource will be stored on application holder
		lockResource : false, //If the resource are sotored in memory, the resource on file system this is locked 
		nullable : true, //Indicates if return of read object will be a empty object
		cipher : false, //Indicates if the object will be ciphred and deciphred
		compress : false,//Indicates if the object will be compressed and decompressed
		timeToLive : Infinity, //Indicates the timeToLive on application holder, need persistent true.
		maxFileSize : Infinity //Indicates the maxFileSize, only active on algorithm MIO
	},
		
	MAP_HOLDER_IDENTITY : {
		persistent : true, //Indicates that the resource will be stored on application holder
		lockResource : false, //If the resource are sotored in memory, the resource on file system this is locked 
		nullable : true, //Indicates if return of read object will be a empty object
		cipher : true, //Indicates if the object will be ciphred and deciphred
		compress : true,//Indicates if the object will be compressed and decompressed
		timeToLive : 5 * 60 * 1000, //Indicates the timeToLive on application holder, need persistent true.
		maxFileSize : Infinity //Indicates the maxFileSize, only active on algorithm MIO
	},
	
	DATA_HOLDER_IDENTITY : {
		persistent : false, //Indicates that the resource will be stored on application holder
		lockResource : false, //If the resource are sotored in memory, the resource on file system this is locked 
		nullable : true, //Indicates if return of read object will be a empty object
		cipher : true, //Indicates if the object will be ciphred and deciphred
		compress : true,//Indicates if the object will be compressed and decompressed
		timeToLive : 5 * 60 * 1000, //Indicates the timeToLive on application holder, need persistent true.
		maxKeys : 5000, //Indicate the max of key size for each dbstg file
		maxFileSize : 2500000 //Indicates the maxFileSize, only active on algorithm MIO
	}
};

module.exports = _identities;