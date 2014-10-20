angular.module('chartsController', [])



/**
 * Builds a simple bar chart, showing outstanding applications by Asset Type;
 *
 * @param  {[type]} $scope
 * @param  {[type]} $http
 * @param  {[type]} Originations
 * @return {[type]}
 */
.controller('applicationsOutstandingCtrl', function($scope, $http, Reports) {


	//This array will hold the raw values from the service
	//Once the service response is processed, this array can
	//be used to build the chart data;
	var total = 0;

	$scope.chart = {};


	//Retreive this years totals
	Reports.getOutstandingApplicationsByAssetType()
		.success(function(data) {


			$scope.data = data;

			//ok, now build the chart data;
			$scope.chart.data = {
				"cols": [{
					id: "t",
					label: "Asset Type",
					type: "string"
				}, {
					id: "s",
					label: "Outstanding",
					type: "number"
				}]
			};

			var rows = [];

			//push the data in the array for the known months
			$.each($scope.data, function(key, val) {
				rows.push({
					c: [{
						v: val.AssetType
					}, {
						v: val.Total
					}]
				});


				total += val.Total;

			});

			console.log('total is ', total);


			$scope.chart.data.rows = rows;
			$scope.total = total;

			$scope.chart.type = 'BarChart';
			$scope.chart.options = {
				curveType: 'function',
				// 'title': 'Outstanding Applications by Asset Class',
				legend: {
					position: 'bottom'
				}
			}



		})
		.error(function(data) {
			console.log('Error: ', data);
		});



})




/**
 * Builds a simple bar chart, showing outstanding applications by Asset Type;
 *
 * @param  {[type]} $scope
 * @param  {[type]} $http
 * @param  {[type]} Originations
 * @return {[type]}
 */
.controller('fundingByFunderCtrl', function($scope, $http, Reports) {


	//This array will hold the raw values from the service
	//Once the service response is processed, this array can
	//be used to build the chart data;
	var total = 0;

	$scope.chart = {};



	//Retreive this years totals
	Reports.getFundingsByFunder()
		.success(function(data) {


			$scope.data = data;

			//ok, now build the chart data;
			$scope.chart.data = {
				"cols": [{
					id: "t",
					label: "Funder",
					type: "string"
				}, {
					id: "s",
					label: "Total Funded",
					type: "number"
				}]
			};

			var rows = [];

			//push the data in the array for the known months
			$.each($scope.data, function(key, val) {

				rows.push({
					c: [{
						v: val.CompanyName
					}, {
						v: val.Total
					}]
				});


				total += val.Total;

			});


			$scope.chart.data.rows = rows;
			$scope.total = total;

			$scope.chart.type = 'BarChart';
			$scope.chart.options = {
				curveType: 'function',
				// 'title': 'Fundings by Funder',
				legend: {
					position: 'bottom'
				}
			}



		})
		.error(function(data) {
			console.log('Error: ', data);
		});



})


/**
 * Builds a simple bar chart, showing outstanding applications by Asset Type;
 *
 * @param  {[type]} $scope
 * @param  {[type]} $http
 * @param  {[type]} Originations
 * @return {[type]}
 */
.controller('FunderOriginatedCtrl', function($scope, $http, Reports) {


	//This array will hold the raw values from the service
	//Once the service response is processed, this array can
	//be used to build the chart data;
	var total = 0;

	$scope.chart = {};



	//Retreive this years totals
	Reports.getFunderOriginatedAndClosed()
		.success(function(data) {


			$scope.data = data;

			//ok, now build the chart data;
			$scope.chart.data = {
				"cols": [{
					id: "t",
					label: "Funder",
					type: "string"
				}, {
					id: "s",
					label: "Total Closed",
					type: "number"
				}]
			};

			var rows = [];

			//push the data in the array for the known months
			$.each($scope.data, function(key, val) {

				rows.push({
					c: [{
						v: val.CompanyName
					}, {
						v: val.Total
					}]
				});


				total += val.Total;

			});


			$scope.chart.data.rows = rows;
			$scope.total = total;

			$scope.chart.type = 'BarChart';
			$scope.chart.options = {
				curveType: 'function',
				// 'title': 'Funder Originated or Referred',
				legend: {
					position: 'bottom'
				}
			}



		})
		.error(function(data) {
			console.log('Error: ', data);
		});



})


/**
 * Builds a simple bar chart, showing funded applications by Asset Type by period;
 *
 * @param  {[type]} $scope
 * @param  {[type]} $http
 * @param  {[type]} Originations
 * @return {[type]}
 */
.controller('fundingByPeriodCtrl', function($scope, $http, Reports) {


	//This array will hold the raw values from the service
	//Once the service response is processed, this array can
	//be used to build the chart data;
	var total = 0;

	$scope.chart = {};
	$scope.startDate;

	if ($scope.startDate == undefined) {
		//default it to the first of this year;
		$scope.startDate = new Date(new Date().getFullYear(), 0, 1).customFormat("#YYYY#-#MM#-#DD#");
		$scope.endDate = new Date(new Date().getFullYear(), 11, 31).customFormat("#YYYY#-#MM#-#DD#");
		
	}

	$scope.runReport = function(startDate, endDate) {

		Reports.getFundedDealsByPeriod(new Date(startDate).getTime(), new Date(endDate).getTime())
			.success(function(data) {


				$scope.data = data;

				//ok, now build the chart data;
				$scope.chart.data = {
					"cols": [{
						id: "t",
						label: "Asset Class",
						type: "string"
					}, {
						id: "s",
						label: "Total Funded",
						type: "number"
					}]
				};

				var rows = [];

				//push the data in the array for the known months
				$.each($scope.data, function(key, val) {

					rows.push({
						c: [{
							v: val.AssetClass
						}, {
							v: val.Total
						}]
					});


					total += val.Total;

				});


				$scope.chart.data.rows = rows;
				$scope.total = total;

				$scope.chart.type = 'BarChart';
				$scope.chart.options = {
					curveType: 'function',
					// 'title': 'Funded by Period',
					legend: {
						position: 'bottom'
					}
				}



			})
			.error(function(data) {
				console.log('Error: ', data);
			});

	},


	$scope.refresh = function logIn(startDate, endDate) {

		$scope.runReport($scope.startDate, $scope.endDate);


		// if (email !== undefined && password !== undefined) {

		// 	UserService.logIn(email, password)

		// 	.success(function(data) {
		// 		AuthenticationService.isLogged = true;
		// 		$scope.login.error = false;
		// 		$window.sessionStorage.token = data.token;
		// 		// $location.path("/admin");

		// 	}).error(function(data, status) {
		// 		$scope.login.errormessage = 'Got it wrong bud';
		// 		$scope.login.error = true;
		// 	});
		// }
	}



	//run the report first time
	$scope.runReport($scope.startDate, $scope.endDate);





})
/**
 * This controller provides a break down of the total number of originations
 * for the calendar year by month.
 *
 * @param  {[type]} $scope
 * @param  {[type]} $http
 * @param  {[type]} Originations
 * @return {[type]}
 */
.controller('transactionVolumeCtrl', function($scope, $http, Originations) {

	//Months identifiers
	var JAN = 0,
		FEB = 1,
		MAR = 2,
		APR = 3,
		MAY = 4,
		JUN = 5,
		JUL = 6,
		AUG = 7,
		SEP = 8,
		OCT = 9,
		NOV = 10,
		DEC = 11;

	var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	//This array will hold the raw values from the service
	//Once the service response is processed, this array can
	//be used to build the chart data;
	var dataArray = [],
		total = 0;

	//populate the default empty data;
	for (var x = 0; x < 12; x++) {
		dataArray.push({
			month: x,
			monthName: monthNames[x],
			total: 0
		});
	}
	$scope.chart = {};



	//Retreive this years totals
	Originations.getTotalMonthlyTransactions(new Date().getFullYear())
		.success(function(data) {
			$scope.data = data;

			//push the data in the array for the known months
			$.each($scope.data, function(key, val) {
				dataArray[val.Month - 1].total = val.Volume;
			});

			//ok, now build the chart data;
			$scope.chart.data = {
				"cols": [{
					id: "t",
					label: "Month",
					type: "string"
				}, {
					id: "s",
					label: "Originations",
					type: "number"
				}]
			};

			var rows = [];

			//need to build the rows;
			$.each(dataArray, function(key, val) {
				//have to inject 2 options into each array
				//first  is the Title
				//second is the Total, just like the col definition above
				// var title = val.monthName;
				// var vol = val.total;
				rows.push({
					c: [{
						v: val.monthName
					}, {
						v: val.total
					}]
				});
				total += val.total;

			});

			$scope.chart.data.rows = rows;
			$scope.total = total;

			$scope.chart.type = 'LineChart';
			$scope.chart.options = {
				curveType: 'function',
				'title': 'Volume by Month (' + new Date().getFullYear() + ')',
				legend: {
					position: 'bottom'
				}
			}



		})
		.error(function(data) {
			console.log('Error: ', data);
		});




})



/**
 * This controller provides a break down of the total number of originations
 * and fundings for the calendar year by month.
 *
 * @param  {[type]} $scope
 * @param  {[type]} $http
 * @param  {[type]} Originations
 * @return {[type]}
 */
.controller('transactionVolumeFundingCtrl', function($scope, $http, Reports) {

	//Months identifiers
	var JAN = 0,
		FEB = 1,
		MAR = 2,
		APR = 3,
		MAY = 4,
		JUN = 5,
		JUL = 6,
		AUG = 7,
		SEP = 8,
		OCT = 9,
		NOV = 10,
		DEC = 11;

	var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	//This array will hold the raw values from the service
	//Once the service response is processed, this array can
	//be used to build the chart data;
	var dataArray = [],
		total = 0;

	//populate the default empty data;
	for (var x = 0; x < 12; x++) {
		dataArray.push({
			month: x,
			monthName: monthNames[x],
			fundings: 0,
			originations: 0
		});
	}
	$scope.chart = {}, $scope.totalOriginations = 0, $scope.totalFundings = 0;



	//Retreive this years totals
	Reports.getOriginationVsFunding(new Date().getFullYear())
		.success(function(data) {
			$scope.data = data;

			//push the data in the array for the known months
			$.each($scope.data, function(key, val) {
				if (val.Type == 'Funded') {
					dataArray[val.Month - 1].fundings += val.TotalAmount;
					$scope.totalFundings += val.TotalAmount;
				} else {
					dataArray[val.Month - 1].originations += val.TotalAmount;
					$scope.totalOriginations += val.TotalAmount;

				}
			});

			//ok, now build the chart data;
			$scope.chart.data = {
				"cols": [{
					id: "month",
					label: "Month",
					type: "string"
				}, {
					id: "originations",
					label: "Originations",
					type: "number"
				}, {
					id: "fundings",
					label: 'Fundings',
					type: 'number'
				}]
			};

			var rows = [];

			//need to build the rows;
			$.each(dataArray, function(key, val) {
				//have to inject 2 options into each array
				//first  is the Title
				//second is the Total, just like the col definition above
				// var title = val.monthName;
				// var vol = val.total;
				rows.push({
					c: [{
						v: val.monthName
					}, {
						v: val.originations
					}, {
						v: val.fundings
					}]
				});
				//total += val.total;

			});


			$scope.chart.data.rows = rows;


		})
		.error(function(data) {
			console.log('Error: ', data);
		});

	// $routeParams.chartType == BarChart or PieChart or ColumnChart...
	$scope.chart.type = 'ColumnChart';
	$scope.chart.options = {
		curveType: 'function',
		// isStacked: true,
		'title': 'Originations Vs Fundings $',
		legend: {
			position: 'bottom'
		}
	}


})


.controller('propertyUseCtrl', function($scope, $http, Originations) {


	$scope.total = 0;

	var chart1 = {};
	chart1.type = "PieChart";
	chart1.data = [
		['Property Use', 'Total'],
	]



	chart1.options = {
		displayExactValues: true,
		// width: 400,
		// height: 200,
		is3D: true
		// chartArea: {left:10,top:10,bottom:0,height:"100%"}
	};


	Originations.getFundingsByPropertyUse()
		.success(function(data) {
			$scope.data = data;

			$.each($scope.data, function(key, val) {
				chart1.data.push([val.PropertyUse, val.Total]);
				$scope.total += val.Total;
			});

		})
		.error(function(data) {
			console.log('Error: ', data);
		});


	$scope.chart = chart1;


});