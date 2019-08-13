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

    const ifconfigme = require('@imed.ch/node-ifconfig.me');

	async function useit(){
		var ip_addr = ifconfigme.ip_addr || (await ifconfigme.export.get).ip_addr || ifconfigme.error;
		console.log('my ip is', ip_addr);
	}
	
	setTimeout(useit, 1);
	// =>	my ip is 191.17.6.11


or

	ifconfigme.ready((err, result) => { console.log('ip_addr =', result.ip_addr, '\ntimestamp =', result.timestamp)})
	// =>	my ip = 191.17.6.11
	//		timestamp = 2019-07-28T07:16:27.008Z
	
… later

	console.log('IP :', ifconfigme.ip_addr); // => IP : 91.170.67.13
	console.log('Remote Host :', ifconfigme.remote_host); // => Remote Host : unavailable
	console.log('Result :', ifconfigme.all); // => { ip_addr: '191.17.6.11', ... timestamp: 2019-07-28T07:16:27.008Z }
	console.log('timestamp is', ifconfigme.all.timestamp); // => timestamp is 2019-07-28T07:16:27.008Z

You can refresh data by a new request to [ifconfig.me](http://ifconfig.me). Note that the module updates the timestamp of the request&nbsp;:

	ifconfigme.get.then(data => console.log(`my ip is ${data.ip_addr}`, '\ntimestamp is', data.timestamp)).catch(err => console.error('oops! an error occured', err));
	// =>	my ip is 191.17.6.11
	//		timestamp is 2019-07-28T07:25:57.296Z
	

## Tests ##

	npm test

## Documentation ##

	npm run docs

will generate the documentation and open its `index.html` file. It's a shortcut of:

	npm run generate-docs
	npm run show-docs

Last command should open file `./docs/node-ifconfig.me/<version>/index.html` (e.g. `./docs/node-ifconfig.me/0.1.0/index.html`) in your browser.

## Release History ##

* 0.8.2 README update
  --Sun Jul 28 01:57:48 CEST 2019
* 0.8.1 first npm release, main module but missing tests
  --Sun Jul 28 01:45:18 CEST 2019

## About me ##

Please, feel free to visit my personal website [imed.ch](http://imed.ch) and have a look to IoT projects for HealthCare I am involved in with [eliiot technology](http://eliiot-technology.ch).

If you use this module, please consider to buy me some cups of coffee on&nbsp;:

[![click me](https://ko-fi.com/img/Kofi_Logo_Blue.svg)](https://ko-fi.com/elojes)

