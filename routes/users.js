var User = require('../models/user');
var sql = require('mssql'); // microsoft sql driver

//load the config
var database = require('../config/database');

module.exports = function(app) {


	// ROUTES FOR OUR API
	// =============================================================================
	app.post('/api/users', function(req, res) {

		User.create({
			name: req.body.name, // set the user name (comes from the request)
			password: req.body.password
		}, function(err, user) {
			if (err)
				res.send(err);

			console.log('returning all users');
			User.find(function(err, users) {
				if (err)
					res.send(err)

				res.json(users);
			});

		});
	});

	app.get('/api/users', function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	});


	app.get('/api/users/:user_id', function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	});

	app.put('/api/users/:user_id', function(req, res) {

		// use our bear model to find the bear we want
		User.findById(req.params.user_id, function(err, user) {

			if (err)
				res.send(err);

			user.name = req.body.name; // update the users info
			user.password = req.body.password;


			// save the bear
			user.save(function(err) {
				if (err)
					res.send(err);

				User.find(function(err, users) {
					if (err) {
						res.send(err)
					}

					res.json(users);
				});
			});

		});
	});

	app.delete('/api/users/:user_id', function(req, res) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if (err)
				res.send(err);

			User.find(function(err, users) {
				if (err)
					res.send(err)

				res.json(users);

			});
		});
	});
}