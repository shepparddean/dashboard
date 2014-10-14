var sql = require('mssql'); // microsoft sql driver

//load the config
var database = require('../config/database');

module.exports = function(app) {



	//Mortgage Routes
	//======================================================================================

	/**
	 * This method returns all of the originations
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/originations/today', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery = " select	count(F.FileID) as Total, company.CompanyName " +
				" from	[File] AS F, " +
				" NorthBrookIdentity.dbo.Company AS company " +
				" where	company.CompanyID = F.CompanyId " +
				//' AND F.inputDate = CAST(GETDATE() AS DATE) ' +
				" group by company.CompanyName ";

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
	 * This method returns all of the mortgages created today
	 *
	 * Currently returns ALL transactions
	 *
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/mortgages/today', function(req, res) {
		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =
				" SELECT DISTINCT M.RequestedAmount,B.CreditScore,F.FileID AS TransactionID,M.LTV, B.FirstName + ' ' + B.LastName AS BorrowerName, " +
				" F.TradingGrade, P.CivicNumber + ' ' + P.StreetName + ' ' + LTRIM(RTRIM(ISNULL(ST2.Description, ' '))) + ' ' + LTRIM(RTRIM(ISNULL(SD2.Description + ' ', ' '))) + ' ' + P.City + ', ' + P.Province AS Address, " +
				' P.City as City, ' +
				'  M.MortgagePriority,  ' +
				'  F.InputDate,DateDiff(day,InputDate,GetDate())+1 As Days, ' +
				' P.latitude AS lat, ' +
				' P.longitude AS lng, ' +
				'  P.StreetName AS Title, ' +
				"  (select COUNT(*) from Offer where Offer.FileID = F.FileID and Offer.Status <> 'Incomplete') as totalOffers " +
				' FROM [File] AS F ' +
				' Inner  JOIN Property AS P ON P.FileID = F.FileID ' +
				' Inner JOIN Mortgage AS M ON M.PropertyID = P.PropertyID ' +
				' Inner  JOIN Borrower AS B ON B.MortgageID = M.MortgageID ' +
				' LEFT OUTER JOIN StreetType AS ST1 ON B.StreetType = ST1.Id ' +
				' LEFT OUTER JOIN StreetType AS ST2 ON P.StreetType = ST2.Id ' +
				' LEFT OUTER JOIN StreetDirection AS SD1 ON B.StreetDirection = SD1.Id ' +
				' LEFT OUTER JOIN StreetDirection AS SD2 ON P.StreetDirection = SD2.Id ' +
				//" WHERE (F.Status = 'Listed') " +
				' WHERE B.PrimaryBorrower = 1 ' +
				//' AND F.inputDate = CAST(GETDATE() AS DATE) ' +
				' Order by TransactionID desc';


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
	 * Retreives all mortgages that have been originated in the designated year,
	 * grouping them by month and returning the totals;
	 * 
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/mortgages/year/:year', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =
				"Select    count(F.FileID) as Volume , month(F.InputDate) as Month " +
				"FROM      [File] F  " +
				"WHERE     year(F.InputDate) = "  + req.params.year  +
				"GROUP BY  month(F.InputDate) ";


			request.query(sqlQuery, function(err, recordset) {
				if (err) {
					res.send(err);
				} else {
					res.send(recordset);
				}
			});

		});

	});

	app.get('/api/mortgages/count', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =
				" SELECT  COUNT(F.FileID) as Total " +
				" FROM [File] AS F " +
				" Inner  JOIN Property AS P ON P.FileID = F.FileID  " +
				" Inner JOIN Mortgage AS M ON M.PropertyID = P.PropertyID " +
				" Inner  JOIN Borrower AS B ON B.MortgageID = M.MortgageID " +
				" WHERE B.PrimaryBorrower = 1 ";


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