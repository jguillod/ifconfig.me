[![NPM Version](https://img.shields.io/npm/v/@imed.ch/node-ifconfig.me.svg)](https://npmjs.org/package/@imed.ch/node-ifconfig.me)
[![Dependency Status](https://david-dm.org/jguillod/node-ifconfig.me.svg?style=flat)](https://david-dm.org/jguillod/node-ifconfig.me)
[![devDependency Status](https://img.shields.io/david/dev/jguillod/node-ifconfig.me.svg?style=flat)](https://david-dm.org/jguillod/node-ifconfig.me#info=devDependencies)
[![Build Status](https://travis-ci.com/jguillod/node-ifconfig.me.svg?branch=master)](https://travis-ci.com/jguillod/node-ifconfig.me)
[![Coverage Status](https://coveralls.io/repos/github/jguillod/node-ifconfig.me/badge.svg?branch=master)](https://coveralls.io/github/jguillod/node-ifconfig.me?branch=master)
[![NPM](https://img.shields.io/github/license/jguillod/node-ifconfig.me.svg)](LICENSE)


# node-ifconfig.me #


> A nodejs module with promise to GET [http://ifconfig.me/all.json](http://ifconfig.me/all.json).

## Install ##

	npm i -S @imed.ch/node-ifconfig.me

## Usage ##

    var ifconfigme = require('@imed.ch/node-ifconfig.me');
	// ...

	async function useit(){
		var ip_addr = ifconfigme.ip_addr || (await ifconfigme.export.get).ip_addr || ifconfigme.error;
		// or
		ifconfigme.get.then(data => console.log(`my ip is ${data.ip_addr}`)).catch(err => console.error('oops! an error occured', err));
	}
	
	useit();
	// =>	Promise {
	// 		… }
	// 		my ip is 91.170.67.133

	ifconfigme.ready((err, result) => { console.log('ip_addr =', result.ip_addr)})
	
	// … later
	console.log('IP :', ifconfigme.ip_addr);
	console.log('Remote Host :', ifconfigme.remote_host);
	console.log('Result :', ifconfigme.all);
	

## Tests ##

	npm test

## Documentation ##

	npm run docs

will generate the documentation and open its `index.html` file. It's a shortcut of:

	npm run generate-docs
	npm run show-docs

If the index.html file does not show in your browser, edit `package.json` file and see if version number should be updated in `scripts["show-docs"]`, or open file in `./docs/node-ifconfig.me/<version>/index.html` (e.g. `./docs/node-ifconfig.me/0.1.0/index.html`).

## Release History ##

* 0.8.1 first npm release, main module but missing tests
  --Sun Jul 28 01:45:18 CEST 2019
