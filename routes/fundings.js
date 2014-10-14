var sql = require('mssql'); // microsoft sql driver

//load the config
var database = require('../config/database');

module.exports = function(app) {




	/**
	 * This method returns all of the fundings
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/fundings/sum', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =

				" select SUM(O.TotalOfferAmount) AS TotalOfferAmount " +
				" from	[File] as F, Offer as O " +
				" where	O.Status = 'Accepted' " +
				" and		F.Status = 'Closed' " +
				" and		O.FileID = F.FileID "

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
	 * This method returns all of the fundings
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/fundings/today', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =

				" select	count(F.FileID) as Total, C.CompanyName " +
				" from	[File] as F, Offer as O, " +
				" NorthBrookIdentity.dbo.Company as C, NorthBrookIdentity.dbo.NBProfile as Profile, " +
				" NorthBrookIdentity.dbo.Users as Users " +
				" where	O.Status = 'Accepted' " +
				" and		F.Status = 'Closed' " +
				" and		O.FileID = F.FileID " +
				" and		Users.UserName = O.BidderUsername " +
				" and		Profile.UserID = Users.UserId " +
				" and		C.CompanyID = Profile.CompanyID " +
				" group by C.CompanyName";

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
	 * This method returns all of the fundings, by property use;
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/fundings/property', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =

				" select	count(F.FileID) as Total, P.PropertyUse " +
				"	from	[File] as F, Offer as O, " +
				"			Property as P " +
				"	where	O.Status = 'Accepted'" +
				"	and		F.Status = 'Closed'" +
				"	and		O.FileID = F.FileID" +
				"	and		P.FileID = F.FileID" +
				"	group by P.PropertyUse";

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