var User = require('./models/user');
var sql = require('mssql'); // microsoft sql driver

//load the config
var database = require('./config/database');

module.exports = function(app) {


	//Mortgage Routes
	//======================================================================================

	/**
	 * This method returns all of the mortgages created today
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
            " P.CivicNumber + ' ' + P.StreetName + ' ' + LTRIM(RTRIM(ISNULL(ST2.Description, ' '))) + ' ' + LTRIM(RTRIM(ISNULL(SD2.Description + ' ', ' '))) + ' ' + P.City + ', ' + P.Province AS Address, " +
            ' P.City as City, ' +
            '  M.MortgagePriority,  ' +
            '  F.InputDate,DateDiff(day,InputDate,GetDate())+1 As Days, ' +
            ' P.latitude AS lat, ' +
            ' P.longitude AS lng, ' +
            '  P.StreetName AS Title, ' +
            "  (select COUNT(*) from Offer where Offer.FileID = F.FileID and Offer.Status <> 'Incomplete') as totalOffers "   + 
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
			' Order by TransactionID';


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
	 * This method returns all of the originations
	 * @param  {[type]} req
	 * @param  {[type]} res
	 * @return {[type]}
	 */
	app.get('/api/originations/today', function(req, res) {

		//@todo - Have to find a way to move this connection details to a pool
		var connection = new sql.Connection(database, function(err) {
			var request = new sql.Request(connection);
			var sqlQuery =  " select	count(F.FileID) as Total, company.CompanyName " +
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









	// ROUTES FOR OUR API
	// =============================================================================
	app.post('/api/users', function(req, res) {


		console.log('The Name = [', req.body.name, ']');
		console.log('The pass = [', req.body.password, ']');

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



	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/index.html');
	// });




}