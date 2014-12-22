/**
 * Module dependencies.
 */
var http = require('http'),
	path = require('path'),
	express = require('express'),
	socketIO = require('socket.io'),
	nlp = require('natural'),
	shortid = require('shortid'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	compress = require('compression'),
	helmet = require('helmet'),
	config = require('./config');

module.exports = function() {
	// Initialize express app
	var app = express();
	var server = http.createServer(app);
	var io = socketIO(server);


	io.on('connection', function(socket) {
		socket.on('message', function(message) {
			console.log(message);
		});

		var roomID = shortid.generate();
		socket.join(roomID);
	});

	// Setting application local variables
	app.locals.env = process.env.NODE_ENV;
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set views path and view engine
	app.set('views', './app/views');
	app.set('view engine', 'jade');

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	// Use helmet to secure Express headers
	app.use(helmet.frameguard());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	app.use(helmet.ienoopen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// Globbing routing files
	config
		.getGlobbedPaths('./app/routes/**/*.js')
		.forEach(function(routePath) {
			var routes = require(path.resolve(routePath));

			app.use(routes.basePath, routes.router);
		});

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) {
			return next();
		}

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	/**
	 * Instead of a 404, we'll respond with index.html
	 */
	app.use(function(req, res) {
		res.render('index', {
			url: req.originalUrl
		});
	});

	return app;
};
