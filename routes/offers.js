var sql = require('mssql'); // microsoft sql driver

//load the config
var database = require('../config/database');


module.exports = function(app) {

	app.get('/api/offers/count', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =
				" select COUNT(OfferID) as Total from Offer " +
				" where Status <> 'Incomplete'";


			request.query(sqlQuery, function(err, recordset) {
				if (err) {
					res.send(err);
				} else {
					res.send(recordset);
				}
			});

		});
	});



	/**
	 * Gets the offer details for a specific transaction;
	 *
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/offers', function(req, res) {

		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =

				" select * from Offer " +
				"where Status <> 'Incomplete'";

			request.query(sqlQuery, function(err, recordset) {
				if (err) {
					res.send(err);
				} else {
					res.send(recordset);
				}
			});

		});

	});



	/**
	 * Gets the offer details for a specific transaction;
	 *
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/offers/:transactionId', function(req, res) {
			


		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =

				" select * from Offer " +
				" where FileID = " + req.params.transactionId + 
				" and Status <> 'Incomplete'";

			request.query(sqlQuery, function(err, recordset) {
				if (err) {
					res.send(err);
				} else {
					res.send(recordset);
				}
			});

		});

	});



}