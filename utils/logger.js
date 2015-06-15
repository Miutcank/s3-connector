var config = require('../config').logger;
var bunyan = require('bunyan');
var logstash = require('bunyan-logstash-tcp');

module.exports = function createLogger(){
	var log = bunyan.createLogger({
		name: 'rabbitmq-connector',
		streams: [
		{
			type: 'raw',
			stream: logstash.createStream({
				host: config.logStash.host,
				port: config.logStash.port,
				tags: ['bunyan', 's3-connector']
			})
			.on('error', function func(err) {
				console.error('[rabbitmq-connector] Error in bunyan-logstash-tcp stream');
				console.error(err);
			})
		},
		{
			stream: process.stdout
		}
		]
	});
	return log;
};
