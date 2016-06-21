const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_path = require('path'),
	_appRoot = require('app-root-path').path,
	_definitions = require('./../application/definitions'),
	_cipher = require('./../tools/cipher'),
	_context = require('./../application/context');

module.exports = {
		
	buildFileReference : function(fileName){
		var masterKey = _context.getAttribute('masterKey');
		return _cipher.encryptText(fileName, masterKey.key);
	},
	
	fileName : function(path){
		
		return _path.basename(path);
	},

	buildStorageDir : function() {

		return _path.join(
				_appRoot,
				_definitions.paths.ROOT,
				_definitions.paths.DATABASE
		);
	},
	
	buildLoggerDir : function() {
		
		return _path.join(
				_appRoot, 
				_definitions.paths.ROOT,
				_definitions.paths.LOGGER
		);
	},
	
	buildLoggerFileDir : function() {
		
		return _path.join(
				this.buildLoggerDir(),
				_definitions.paths.LOGGER
		);
	},
	
	buildAuditDir : function() {
		
		return _path.join(
				_appRoot, 
				_definitions.paths.ROOT,
				_definitions.paths.AUDIT
		);
	},
	
	buildAuditFileDir : function() {
		
		return _path.join(
				this.buildAuditDir(),
				_definitions.paths.AUDIT
		);
	},
	
	buildErrorDir : function() {
		
		return _path.join(
				_appRoot, 
				_definitions.paths.ROOT,
				_definitions.paths.ERROR
		);
	},
	
	buildErrorFileDir : function() {
		
		return _path.join(
				this.buildErrorDir(),
				_definitions.paths.ERROR
		);
	},
	
	buildTidTrackerDir : function(tid) {
		
		return _path.join(
				this.buildStorageDir(), 
				_definitions.paths.TID_TRACKER.replace('{tid}', tid)
		);
	},
	
	buildTidTrackerMetaFileDir : function(tid) {
		
		return _path.join(
				this.buildStorageDir(), 
				_definitions.paths.TID_TRACKER_META_FILE.replace('{tid}', tid)
		);
	},
	
	buildTidTrackerDataFileDir : function(tid) {
		
		return _path.join(
				this.buildStorageDir(), 
				_definitions.paths.TID_TRACKER_DATA_FILE.replace('{tid}', tid)
		);
	},

	buildInstanceDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		
		return _path.join(
				this.buildStorageDir(), 
				_definitions.paths.INSTANCE.replace('{instance}', instanceTranslated)
		);
	},
	
	buildInstanceMetaDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		
		return _path.join(
				this.buildStorageDir(),
				_definitions.paths.INSTANCE_META.replace('{instance}', instanceTranslated)
		);
	},
	
	buildInstanceMetaFileDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		return _path.join(
				this.buildInstanceMetaDir(instance),
				_definitions.paths.INSTANCE_META_FILE.replace('{instance}', instanceTranslated)
		);
	},
	
	buildInstanceDomainsDir : function(instance){
		
		return _path.join(
				this.buildInstanceDir(instance),
				_definitions.paths.INSTANCE_DOMAINS
		);
	},
	
	buildDomainDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		
		return _path.join(
				this.buildInstanceDomainsDir(instance),
				_definitions.paths.DOMAIN.replace('{domain}', domainTranslated)
		);
	},
	
	buildDomainDataDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);

		return _path.join(
				this.buildDomainDir(instance, domain),
				_definitions.paths.DOMAINS_DATA.replace('{domain}', domainTranslated)
		);
	},
	
	buildDomainMapDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		
		return _path.join(
				this.buildDomainDir(instance, domain),
				_definitions.paths.DOMAINS_MAP.replace('{domain}', domainTranslated)
		);
	},
	
	buildDomainMapFileDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		
		return _path.join(
				this.buildDomainMapDir(instance, domain),
				_definitions.paths.DOMAINS_MAP_FILE.replace('{domain}', domainTranslated)
		);
	},
	
	buildDomainMetaDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		
		return _path.join(
				this.buildDomainDir(instance, domain),
				_definitions.paths.DOMAINS_META.replace('{domain}', domainTranslated)
		);
	},
	
	buildDomainMetaFileDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		
		return _path.join(
				this.buildDomainMetaDir(instance, domain),
				_definitions.paths.DOMAINS_META.replace('{domain}', domainTranslated)
		);
		
	},
	
	buildDomainDataFileDir : function(instance, domain, fileReference) {

		return _path.join(
				this.buildDomainDataDir(instance, domain),
				fileReference + _definitions.paths.DBEXT
		);
	},
	
	buildCredentialsDir : function(){
		
		return _path.join(
				_appRoot,
				_definitions.paths.ROOT,
				_definitions.paths.SECURITY,
				_definitions.paths.CREDENTIALS
		);
	},
	
	buildCredentialsFileDir : function(){
		
		return _path.join(
				this.buildCredentialsDir(),
				_definitions.paths.CREDENTIALS_FILE
		);
	},
	
	buildMasterKeyDir : function(){
		
		return _path.join(
				_appRoot,
				_definitions.paths.ROOT,
				_definitions.paths.SECURITY,
				_definitions.paths.CIPHER
		);
	},
	
	buildMasterKeyFileDir : function(){
		
		return _path.join(
				this.buildMasterKeyDir(),
				_definitions.paths.CIPHER_FILE
		);
	},
	
	format : _path.format
};