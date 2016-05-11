module.exports = {

	'paths' : {
		'SEPARATOR' : '/',
		'INDEX' : '/index.js',
		'ROOT' : '/jsdbase',
		'DATABASE' : '/db',
		'LOGGER' : '/ltrack',
		'SECURITY' : '/security',
		'CIPHER' : '/cipher',
		'CIPHER_FILE' : '/master.key',
		'CREDENTIALS' : '/credentials',
		'CREDENTIALS_FILE' : '/scy.pass',
		'INSTANCE' : '/{instance}',
		'INSTANCE_META' : '/{instance}/meta',
		'INSTANCE_META_FILE' : '/{instance}.dbmeta',
		'INSTANCE_MONITORING' : '/{instance}/monitoring',
		'INSTANCE_MONITORING_FILE' : '/{instance}.dbmonitoring',
		'INSTANCE_DOMAINS' : '/domains',
		'DOMAIN' : '/{domain}',
		'DOMAINS_DATA' : '/data',
		'DOMAINS_META' : '/meta',
		'DOMAINS_META_FILE' : '/{domain}.dbmeta',
		'DOMAINS_MAP' : '/map',
		'DOMAINS_MAP_FILE' : '/{domain}.dbmap',
		'DBEXT' : '.dbstg',
		'PRIVATE_KEY_FILE' : '/ssl/server.key',
		'CERTIFICATE_KEY_FILE' : '/ssl/server.crt',
	},

	'statusState' : {
		'STOPED' : 'STOPED',
		'STARTED' : 'STARTED'
	},

	'trxStatus' : {
		'SUCCESS' : 'SUCCESS',
		'DENIED' : 'DENIED',
		'ERROR' : 'ERROR',
		'INVALID' : 'INVALID',
		'FATAL' : 'FATAL',
		'FORBIDDEN' : 'FORBIDDEN'
	}
}