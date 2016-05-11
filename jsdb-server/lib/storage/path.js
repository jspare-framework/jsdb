const /*--- Declaring imports ---*/
	_ = require('underscore'),
	_path = require('path')
,	_appRoot = require('app-root-path').path,
	_definitions = require('./../application/definitions'),
	_cipher = require('./../tools/cipher'),
	_context = require('./../application/context');

module.exports = {
		
	SEPARATOR : _definitions.paths.SEPARATOR,
	
	
	buildFileReference : function(fileName){
		var masterKey = _context.getAttribute('masterKey');
		return _cipher.encryptText(fileName, masterKey.key);
	},
	
	fileName : function(path){
		
		return _path.basename(path);
	},

	buildStorageDir : function() {
		
		var dirname = _appRoot;
		dirname += _definitions.paths.ROOT;
		dirname += _definitions.paths.DATABASE;
		return dirname;
	},
	
	buildLoggerRootPath : function() {
		
		var dirname = _appRoot;
		dirname += _definitions.paths.ROOT;
		dirname += _definitions.paths.LOGGER;
		return dirname;
	},

	buildInstanceDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		var dirname = this.buildStorageDir();
		dirname += _definitions.paths.INSTANCE.replace('{instance}', instanceTranslated);
		return dirname;
	},
	
	buildInstanceMetaDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		var dirname = this.buildStorageDir();
		dirname += _definitions.paths.INSTANCE_META.replace('{instance}', instanceTranslated);
		return dirname;
	},
	
	buildInstanceMetaFileDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		var dirname = this.buildInstanceMetaDir(instance);
		dirname += _definitions.paths.INSTANCE_META_FILE.replace('{instance}', instanceTranslated);
		return dirname;
	},
	
	buildInstanceDomainsDir : function(instance){
		
		var masterKey = _context.getAttribute('masterKey');
		var dirname = this.buildInstanceDir(instance);
		dirname += _definitions.paths.INSTANCE_DOMAINS;
		return dirname;
	},
	
	buildMonitoringDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		var dirname = this.buildStorageDir();
		dirname += _definitions.paths.INSTANCE_MONITORING.replace('{instance}', instanceTranslated);
		return dirname;
	},
	
	buildMonitoringFileDir : function(instance) {
		
		var masterKey = _context.getAttribute('masterKey');
		var instanceTranslated = _cipher.encryptText(instance, masterKey.key);
		var dirname = this.buildMonitoringDir(instance);
		dirname += _definitions.paths.INSTANCE_MONITORING_FILE.replace('{instance}', instanceTranslated);
		return dirname;
	},

	buildDomainDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		var dirname = this.buildInstanceDomainsDir(instance);
		dirname += _definitions.paths.DOMAIN.replace('{domain}', domainTranslated);
		return dirname;
	},
	
	buildDomainDataDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		var dirname = this.buildDomainDir(instance, domain);
		dirname += _definitions.paths.DOMAINS_DATA.replace('{domain}', domainTranslated);
		return dirname;
	},
	
	buildDomainMapDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		var dirname = this.buildDomainDir(instance, domain);
		dirname += _definitions.paths.DOMAINS_MAP.replace('{domain}', domainTranslated);
		return dirname;
	},
	
	buildDomainMapFileDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		var dirname = this.buildDomainMapDir(instance, domain);
		dirname += _definitions.paths.DOMAINS_MAP_FILE.replace('{domain}', domainTranslated);
		return dirname;
	},
	
	buildDomainMetaDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		var dirname = this.buildDomainDir(instance, domain);
		dirname += _definitions.paths.DOMAINS_META.replace('{domain}', domainTranslated);
		return dirname;
	},
	
	buildDomainMetaFileDir : function(instance, domain) {
		
		var masterKey = _context.getAttribute('masterKey');
		var domainTranslated = _cipher.encryptText(domain, masterKey.key);
		var dirname = this.buildDomainMetaDir(instance, domain);
		dirname += _definitions.paths.DOMAINS_META_FILE.replace('{domain}', domainTranslated);
		return dirname;
	},
	
	buildDomainDataFileDir : function(instance, domain, fileReference) {

		var dirname = this.buildDomainDataDir(instance, domain);
		dirname += _definitions.paths.SEPARATOR;
		dirname += fileReference;
		dirname += _definitions.paths.DBEXT;
		return dirname;
	},
	
	buildCredentialsDir : function(){
		
		var dirname = _appRoot;
		dirname += _definitions.paths.ROOT;
		dirname += _definitions.paths.SECURITY;
		dirname += _definitions.paths.CREDENTIALS;
		return dirname;
	},
	
	buildCredentialsFileDir : function(){
		
		var dirname = this.buildCredentialsDir();
		dirname += _definitions.paths.CREDENTIALS_FILE;
		return dirname;
	},
	
	buildMasterKeyDir : function(){
		
		var dirname = _appRoot;
		dirname += _definitions.paths.ROOT;
		dirname += _definitions.paths.SECURITY;
		dirname += _definitions.paths.CIPHER;
		return dirname;
	},
	
	buildMasterKeyFileDir : function(){
		
		var dirname = this.buildMasterKeyDir();
		dirname += _definitions.paths.CIPHER_FILE;
		return dirname;
	},
	
	format : _path.format

};