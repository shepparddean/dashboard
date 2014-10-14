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
				" where YEAR(F.InputDate) = "  + req.params.year +
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
				" and		YEAR(F.InputDate) ="  + req.params.year +
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
}