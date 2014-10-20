var sql = require('mssql'); // microsoft sql driver

//load the config
var database = require('../config/database');

module.exports = function(app) {

	/**
	 * This returns data about originations and fundings, broken down by year / month
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/report/fundings/:year', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =
				" select	SUM(M.RequestedAmount) as TotalAmount, MONTH(F.InputDate) as Month, 'Originated' as Type " +
				" FROM [File] AS F " +
				"	Inner  JOIN Property AS P ON P.FileID = F.FileID " +
				"    Inner JOIN Mortgage AS M ON M.PropertyID = P.PropertyID" +
				"    Inner  JOIN Borrower AS B ON B.MortgageID = M.MortgageID " +
				" where YEAR(F.InputDate) = " + req.params.year +
				"    group by MONTH(F.InputDate)" +
				" " +
				" " +
				" union " +
				" " +
				" select	SUM(O.TotalOfferAmount) as TotalAmount, MONTH(F.InputDate) as Month, 'Funded' as Type" +
				" from	[File] as F, Offer as O" +
				" where	O.Status = 'Accepted'" +
				" and		F.Status = 'Closed'" +
				" and		O.FileID = F.FileID" +
				" and		YEAR(F.InputDate) =" + req.params.year +
				" group by (Month(F.InputDate))";

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
	 * This method returns a collection of applications that are awaiting
	 * offers, by asset class (i.e. mortgage, termloan, etc);
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/report/outstanding', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =
				" select COUNT(F.FileID) as Total, 'Mortgage' as AssetType " +
				" from [File] as F " +
				" Inner  JOIN Property AS P ON P.FileID = F.FileID" +
				" Inner JOIN Mortgage AS M ON M.PropertyID = P.PropertyID" +
				" Inner  JOIN Borrower AS B ON B.MortgageID = M.MortgageID" +
				" WHERE B.PrimaryBorrower = 1" +
				" and (F.Status <> 'Closed' and F.Status <> 'Withdrawn' or F.Status is null)" +
				" union " +
				" select '0' as Total, 'Term Loan' as AssetType  ";

			// to add additional asset types, add a union clause.

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
	 * This method returns all of the fundings, grouped by Funder
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/report/fundingsByFunder', function(req, res) {

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
	 * This method returns all of the fundings, grouped by Funder
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/report/funderOriginatedAndClosed', function(req, res) {

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
				" and		Users.UserName = F.RecommendedBy " +
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
	 * This method returns all of the fundings by asset class by the requested period;
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/report/fundingByPeriod/:startDate/:endDate', function(req, res) {


		console.log(req.params.startDate);

		var _startDate = new Date(parseInt(req.params.startDate)).customFormat("#YYYY#/#MM#/#DD#");
		var _endDate = new Date(parseInt(req.params.endDate)).customFormat("#YYYY#/#MM#/#DD#");
	
		console.log(_startDate, ' - ', _endDate );
		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =

				"select	count(F.FileID) as Total, 'Mortgage' as AssetClass " +
				"from	[File]	as F, " +
				"		Offer	as O " +
				"where	O.Status		= 'Accepted' " +
				"and		F.Status		= 'Closed' " +
				"and		O.FileID		= F.FileID " +
				"and		F.InputDate between '" + _startDate + "' and '" + _endDate + "'";

			request.query(sqlQuery, function(err, recordset) {
				if (err) {
					console.log('Error ', err);
					res.send(err);
				} else {
					console.log('We have the following records ' + recordset);
					res.send(recordset);
				}
			});

		});

	});



	/*
	 
	 */
}