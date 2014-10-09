angular.module('transactionController', [])

.controller('transactionsCtrl', function($scope, $http,  Originations) {

	$scope.todays = {};

	$scope.gridOptions = {
		data: 'todays',
		enablePaging: true,
		showFooter: false,
		multiSelect: false,
		columnDefs: [{
			field: 'TransactionID',
			displayName: 'ID'
		}, {
			field: 'MortgagePriority',
			displayName: 'Type'
		}, {
			field: 'RequestedAmount',
			displayName: 'Amount',
			cellFilter: 'currency'
		}, {
			field: 'CreditScore',
			displayName: 'Score',
			cellClass: 'text-center'
		}, {
			field: 'totalOffers',
			displayName: 'Offers',
			cellClass: 'text-center',
			cellTemplate: '<a ui-sref="offers/100234" href="#/offers/100234"><h5><span class="label label-success">{{row.getProperty(col.field)}}</span></h5></a>'
		}]


	};

	Originations.getMortgages()
		.success(function(data) {
			$scope.todays = data;

		})
		.error(function(data) {
			console.log('Error: ', data);
		});

	$scope.loadOffers = function(row) {
		$stateProvider.go('#/offers/' + row.entity.TransactionID);
		//$window.location.href = '/views/transactionOffers/' + row.entity.TransactionID;
	}

})

.controller('gradeTierCtrl', function($scope, $http, Originations) {

	$scope.data = [];

	$scope.total = 0;



	$scope.gridOptions = {
		data: 'data',
		enablePaging: true,
		showFooter: false,
		columnDefs: [{
			field: 'tradingGrade',
			displayName: 'Grade'
		}, {
			field: 'total',
			displayName: '#',
			cellClass: 'text-center'
		}, {
			field: 'percent',
			displayName: '%',
			cellClass: 'text-center'
		}]
	};

	//create the tiers;
	var tiers = [{
			tradingGrade: ' 0 -  40%',
			percent: 0,
			total: 0
		}, {
			tradingGrade: '41 -  50%',
			percent: 0,
			total: 0
		}, {
			tradingGrade: '51 -  60%',
			percent: 0,
			total: 0
		}, {
			tradingGrade: '61 -  70%',
			percent: 0,
			total: 0
		}, {
			tradingGrade: '71 -  80%',
			percent: 0,
			total: 0
		}, {
			tradingGrade: '81 -  90%',
			percent: 0,
			total: 0
		}, {
			tradingGrade: '91 - 100%',
			percent: 0,
			total: 0
		}


	]


	Originations.getMortgages()
	//on success, need to parse the data into the appropriate tiers
	//Assumption null = 0
	//Tier 0 =  0 -  40
	//Tier 1 = 41 -  50
	//Tier 2 = 51 -  60
	//Tier 3 = 61 -  70
	//Tier 4 = 71 -  80
	//Tier 5 = 81 -  90
	//Tier 6 = 91 - 100
	.success(function(data) {


		$.each(data, function(idx, rec) {

			var _grade = rec.TradingGrade;

			if (_grade == null || _grade < 41) {
				tiers[0].total++;
			} else if (_grade < 51) {
				tiers[1].total++;

			} else if (_grade < 61) {
				tiers[2].total++;

			} else if (_grade < 71) {
				tiers[3].total++;

			} else if (_grade < 81) {
				tiers[4].total++;

			} else if (_grade < 91) {
				tiers[5].total++;

			} else if (_grade < 101) {
				tiers[6].total++;
			}





			//console.log(rec);
		});

		//update the percents
		$.each(tiers, function(idx, tier) {
			tier.percent = ((tier.total / data.length) * 100).toFixed(2);
		})

		$scope.data = tiers;
		$scope.total = data.length;





	})
		.error(function(data) {
			console.log('Error: ', data);
		});


})


.controller('transactionOffersCtrl', function($scope, $http, $stateParams, Originations) {


	console.log('What now..');

	$scope.offers = {};

	$scope.gridOptions = {
		data: 'offers',
		enablePaging: true,
		showFooter: false,
		columnDefs: [{
			field: 'FileID',
			displayName: 'ID'
		}, {
			field: 'OfferID',
			displayName: 'Offer ID'

		}, {
			field: 'Status',
			displayName: 'Status'

		}, {
			field: 'Amount',
			displayName: 'Amount',
			cellFilter: 'currency',
			cellClass: 'text-right'

		}, {
			field: 'Rate',
			displayName: 'Rate',
			cellClass: 'text-center'

		}, {
			field: 'Term',
			displayName: 'Term',
			cellClass: 'text-center'

		}, {
			field: 'Amortization',
			displayName: 'Amortization',
			cellClass: 'text-center'

		}, {
			field: 'LenderFee',
			displayName: 'Fee',
			cellFilter: 'currency',
			cellClass: 'text-right'
		}, {
			field: 'PaymentAmount',
			displayName: 'Payment',
			cellFilter: 'currency',
			cellClass: 'text-right'

		}, {
			field: 'DecisionDate',
			displayName: 'Decision Date',
			cellFilter: 'date'
		}, {
			field: 'PaymentFrequency',
			displayName: 'Frequency'
		}]


	};

	Originations.getTransactionOffers($stateParams.transactionId)
		.success(function(data) {
			$scope.offers = data;

		})
		.error(function(data) {
			console.log('Error: ', data);
		});






});