/**
 * Module dependencies.
 */
var unirest = require('unirest');

exports.index = function(req, res) {
	res.render('index', {});
};

exports.search = function(req, res) {
	var query = req.body.query;
	var location = req.body.location;

	console.log(req.body);

	unirest
		.get('https://jeannie.p.mashape.com/api')
		.query('input=' + query)
		.query('locale=en')
		.query('location=' + location)
		.query('page=1')
		.query('timeZone=-0400')
		.header('X-Mashape-Key', 'JYAXTJeeAWmsh6yYOGz8PJAYIMkTp1hz0RYjsn60sJgDs6NqLf')
		.header('Accept', 'application/json')
		.end(function(result) {
			console.log(result.status);
			console.log(result.headers);
			console.log(result.body);
			res.json({
				status: result.status,
				headers: result.headers,
				body: result.body
			});
		});
};
