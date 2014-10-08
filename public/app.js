// main.js
var app = angular.module('dashboardApp', ['ngGrid']);


app.controller('todaysTransactionsCtrl', function($scope, $http) {

	$scope.todays = {};

	$scope.gridOptions = {
		data: 'todays',
		enablePaging: true,
		showFooter: false,
		columnDefs: [{
			field: 'TransactionID',
			displayName: 'ID'
		},
		{
			field: 'MortgagePriority',
			displayName: 'Type'
		},
		{
			field: 'RequestedAmount',
			displayName: 'Amount',
			cellFilter: 'currency'
		},
		{
			field: 'CreditScore',
			displayName: 'Score',
			cellClass: 'text-center'
		},
		{
			field: 'totalOffers',
			displayName: 'Offers',
			cellClass:'text-center',
			cellTemplate: '<h5><span class="label label-success">{{row.getProperty(col.field)}}</span></h5>'
		}]


	};

	$http.get('/api/mortgages/today')
		.success(function(data) {
			$scope.todays = data;

		})
		.error(function(data) {
			console.log('Error: ', data);
		});
});


app.controller('todaysOriginationsCtrl', function($scope, $http) {

	$scope.originations = {};
	$scope.totalOriginations = 0;

	$scope.originationGridOptions = {
		data: 'originations',
		enablePaging: true,
		showFooter: false,
		columnDefs: [{
			field: 'CompanyName',
			displayName: 'Company'
		},
		{
			field: 'Total',
			displayName: 'Total',
			cellClass: 'text-center',
			cellTemplate: '<h5><span class="label label-success">{{row.getProperty(col.field)}}</span></h5>'

		}]

	};

	$http.get('/api/originations/today')
		.success(function(data) {
			$scope.originations = data;
			$scope.totalOriginations = 0;
			$.each(data, function(idx, rec) {
			 $scope.totalOriginations += rec.Total; 
			} );



		})
		.error(function(data) {
			console.log('Error: ', data);
		});
});


app.controller('todaysFundingCtrl', function($scope, $http) {

	$scope.fundings = {};
	$scope.totalFundings = 0;

	$scope.fundingGridOptions = {
		data: 'fundings',
		enablePaging: true,
		showFooter: false,
		columnDefs: [{
			field: 'CompanyName',
			displayName: 'Company'
		},
		{
			field: 'Total',
			displayName: 'Total',
			cellClass: 'text-center',
			cellTemplate: '<h5><span class="label label-success">{{row.getProperty(col.field)}}</span></h5>'

		}]

	};

	$http.get('/api/fundings/today')
		.success(function(data) {
			$scope.fundings = data;
			$scope.totalFundings = 0;
			$.each(data, function(idx, rec) {
			 $scope.totalFundings += rec.Total; 
			} );



		})
		.error(function(data) {
			console.log('Error: ', data);
		});
});



