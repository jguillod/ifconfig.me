#!/usr/bin/env node

const URL = "http://ifconfig.me/all.json";
const http = require('http');

var promise = new Promise(main).then().catch();
var result;
var errorMessage;

function main(resolve, reject) {
	result = {};
	errorMessage = undefined;
	http.get(URL, (res) => {
		const {
			statusCode
		} = res;
		const contentType = res.headers['content-type'];

		if (statusCode !== 200) {
			errorMessage = `Request Failed.\nStatus Code: ${statusCode}`;
		} else if (!/^application\/json/.test(contentType)) {
			errorMessage = `Invalid content-type.\nExpected application/json but received ${contentType}`;
		}
		if (errorMessage) {
			// Consume response data to free up memory
			res.resume();
			return reject(errorMessage);;
		}

		res.setEncoding('utf8');
		let rawData = '';
		res.on('data', (chunk) => {
			rawData += chunk;
		});
		res.on('end', () => {
			try {
				result = JSON.parse(rawData);
				result.timestamp = new Date();
				resolve(cloneResult());
			} catch (e) {
				errorMessage = e.message
				reject(errorMessage);
			}
		});
	}).on('error', (e) => {
		errorMessage = e.message
		reject(`Got error: ${errorMessage}`);
	});
}

function cloneResult(){
	return Object.assign({}, result);
}

/**
 * Get the external network configuration using ifconfig.me
 * @module node-ifconfig
 * @example <caption>Example usage of module</caption>
 * var module = require('@imed.ch/node-ifconfig.me');
 * var ip_addr = module.ip_addr || (await module.ready()).ip_addr || module.error;
 * // or
 * module.get.then(data => console.log(`my ip is ${data.ip_addr}`)).catch(err => console.error('oops! an error occured', err));
 */

module.exports = {
	/**
	 * @property {Promise} get - Make a fresh request and return a promise.
	 */

	get get() {
		return promise = new Promise(main);
	},
	
	/**
	 * ready() function
	 * @example <caption>Example usage of ready(cb)</caption>
	 * var module = require('@imed.ch/node-ifconfig.me');
	 * var ip = (await module.ready()).ip_addr; // or
	 * module.ready((err, result) => { console.log('ip_addr =', result.ip_addr)})
	 * @async
	 * @param {Function} [cb] - Optional callback(err, result).
	 * @returns {Objet|undefined} - undefined if error on getting result, result if success.
	 */
	
	async ready(cb) {
		try {
			await promise;
			var clone = cloneResult();
			cb && cb(null, clone)
			return clone;
		} catch (e){
			cb && cb(e);
		}
	},
	
	/**
	 * @property {String} ip_addr - The external IP address.
	 */
	get ip_addr() {
		return result.ip_addr
	},

	/**
	 * @property {String} remote_host - The remote host address.
	 */
	get remote_host() {
		return result.remote_host
	},

	/**
	 * @property {Object} all - The result Object { ip_addr, remote_host, user_agent, port, language, method, encoding, mime, via, forwarded }
	 */
	get all() {
		return cloneResult();
	},

	/**
	 * @property {String|undefined} error - An optional error message.
	 */
	get error(){
		return errorMessage;
	}
	// , test: test
};




///-----------------------------------------------------------------------------------------------
// TESTS À SUPPRIMER
//-----------------------------------------------------------------------------------------------

// async function test() {
// 	console.log('FIRST', module.export.ip_addr || module.export.error || (await module.export.get).ip_addr, module.export.all.timestamp);
//
// 	console.log('DIRECT', module.export.all.timestamp, module.export.ip_addr, module.export.remote_host);
// 	module.export.get.then(data => console.log(`my ip is ${data.ip_addr} @ ${data.timestamp}`)).catch(err => console.error('oops! an error occured', err));
// 	console.log('DIRECT 2', module.export.all.timestamp, module.export.ip_addr, module.export.remote_host);
//
// 	setTimeout(function() {
// 		console.log('TIMEDOUT', module.export.all.timestamp, module.export.ip_addr, module.export.remote_host);
// 		console.log('ALL', module.export.all.timestamp, module.export.all)
// 	}, 2000);
//
// }
//
// async function test2(){
// 	console.log('TEST2', module.export.ip_addr);
// 	console.log('AWAIT', (await module.export.ready()).ip_addr);
// 	console.log('AWAIT', module.export.all, result);
// }
//
// setTimeout(test2, 1);
//
