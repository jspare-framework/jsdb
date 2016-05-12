# jsdb-cli

Make the simple, simple

JSDB is a simple and minimalist NoSQL database writed with node.

This module, is used for cli with jsdb.

Some features:

* See environment status
* Manage instances
* Manage domains

Todo list:

* persist
* language query for cli
* backup and restore
* replication by cli
* clustering configuration by cli

 
## Installation

## Node global installation

```sh
$ npm install jsdb-cli -g

$ run jsdb-cli
```
## Standalone installation

Access: [Downloads](http://jspare.org/jsdb/downloads)

## Documentation

For see full documentation access oficial website: [http://jspare.org/jsdb](http://jspare.org/jsdb)

#API

## connection

The command 'connection' show current connection with credentials used on cli.

## credential

Set the credential for current session of cli.

## status

See the current status of current connection.

## use

Set the instance for current connection.

## addInstance [instance]

The command 'addInstance' add on instance of jsdb, if parameter 'instance' is not setted, the cli assume the instance of connection.

## removeInstance [instance]

The command 'removeInstance' remove on instance of jsdb, if parameter 'instance' is not setted, the cli assume the instance of connection.

## listInstances

The command 'listInstances' list all instances of jsdb.

## addDomain [domain]

The command 'addDomain' add to domain in instance of connection setted.

## removeDomain [domain]

The command 'removeDomain' remove to domain in instance of connection setted.

## listDomains

The command 'listDomains' list all domains of instance setted.

### ** Notes **

For every request of cli, all roles of credential will be validated, check if your credential have fully access.

## License

[MIT](LICENSE)