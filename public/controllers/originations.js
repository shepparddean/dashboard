angular.module('originationController', [])

.controller('originationCtrl', function($scope, $http, Originations) {


	$scope.originations = {};
	$scope.totalOriginations = 0;

	$scope.originationGridOptions = {
		data: 'originations',
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

	Originations.get()
		.success(function(data) {
			$scope.originations = data;
			$scope.totalOriginations = 0;
			$.each(data, function(idx, rec) {
				$scope.totalOriginations += rec.Total;
			});

		})
		.error(function(data) {
			console.log('Error: ', data);
		});
})