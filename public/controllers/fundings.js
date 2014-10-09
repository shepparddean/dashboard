angular.module('fundingController', [])

.controller('fundingCtrl', function($scope, $http, Originations) {

	$scope.fundings = {};
	$scope.totalFundings = 0;

	$scope.fundingGridOptions = {
		data: 'fundings',
		enablePaging: true,
		showFooter: false,
		columnDefs: [{
			field: 'CompanyName',
			displayName: 'Company'
		}, {
			field: 'Total',
			displayName: 'Total',
			cellClass: 'text-center',
			cellTemplate: '<h5><span class="label label-success">{{row.getProperty(col.field)}}</span></h5>'

		}]

	};


	Originations.getFundings()
		.success(function(data) {
			$scope.fundings = data;
			$scope.totalFundings = 0;
			$.each(data, function(idx, rec) {
				$scope.totalFundings += rec.Total;
			});



		})
		.error(function(data) {
			console.log('Error: ', data);
		});
});