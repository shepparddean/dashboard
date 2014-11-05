var sql = require('mssql'); // microsoft sql driver

//load the config
var database = require('../config/database');

module.exports = function(app) {


	app.get('/api/companies', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery = " select * from NorthBrookIdentity.dbo.Company ";

			request.query(sqlQuery, function(err, recordset) {
				if (err) {
					res.send(err);
				} else {
					res.send(recordset);
				}

				connection.close();
			});

		});
	});

	/**
	 * This method returns the total number of companies that are registered in the system.
	 * 
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/companies/count', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery = " select count(CompanyID) as Total " +
				" from NorthBrookIdentity.dbo.Company ";

			request.query(sqlQuery, function(err, recordset) {
				if (err) {
					res.send(err);
				} else {
					res.send(recordset);
				}

				connection.close();
			});

		});
	});




}