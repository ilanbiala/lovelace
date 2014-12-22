/**
 * Module dependencies.
 */
var chalk = require('chalk'),
	config = require('./config/config'),
	express = require('./config/express');

exports.start = function() {
	var app = express();

	// Logging the initialization details
	console.log(chalk.green('%s application started.'), config.app.title);
	console.log(chalk.green('Environment: %s'), process.env.NODE_ENV);
	console.log(chalk.green('Port: %d'), config.port);
	console.log(chalk.green('Database: %s'), config.db);

	// Start the app by listening on <port>
	exports.server = app.listen(config.port);
};

exports.kill = function() {
	exports.server.close();

	console.log(chalk.red('Application killed. Port %s now available.'), config.port);

	exports.server = null;
};

exports.start();
