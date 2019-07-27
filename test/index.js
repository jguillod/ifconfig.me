var expect = require('chai').expect,
	should = require('chai').should(),
	ifconfigme = require('../index');



describe('#Module node-ifconfig.me', function() {

	it('has a async function "ready" which wait until the result is ready', async function() {
		ifconfigme.should.have.property('ready');
		(typeof ifconfigme.ready).should.equal('function');
		var ready = await ifconfigme.ready();
		expect(typeof ready).to.equal('object');
	})

	it('has #ready with callback', async function() {
		var passed;
		await ifconfigme.ready((err, result) => {
			passed = true;
		});
		expect(passed).to.be.true;
	})

	it('has properties "get, ip_addr, remote_host, all, error"', function() {
		//  ifconfigme.should.have.property('get'); <=== ERREUR si usage car fait un appel à get et relance la requête http
		expect(Object.getOwnPropertyNames(ifconfigme).includes('get')).to.be.true;
		ifconfigme.should.have.property('ip_addr');
		ifconfigme.should.have.property('remote_host');
		ifconfigme.should.have.property('all');
		ifconfigme.should.have.property('error');
	})

	it('can get your external IP address', function() {
		// await ifconfigme.ready();
		expect(typeof ifconfigme.ip_addr).to.equal('string');
	});

	it('can get your remote host', function() {
		expect(typeof ifconfigme.remote_host).to.equal('string');
	})

	it('can get the timestamp of last get', function() {
		expect(ifconfigme.all.timestamp).to.be.an.instanceof(Date);
	})

});
