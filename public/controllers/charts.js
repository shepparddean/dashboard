angular.module('chartsController', [])

.controller('propertyUseCtrl', function($scope, $http, Originations) {


	$scope.data = [];
	$scope.total = 0;

	Originations.getFundingsByPropertyUse()
		.success(function(data) {
			$scope.data = data;

			$.each($scope.data, function(key, val) {
				$scope.total += val.Total;
			});

		})
		.error(function(data) {
			console.log('Error: ', data);
		});




	$scope.xFunction = function() {
		return function(d) {
			return d.PropertyUse;
		};
	}


	$scope.yFunction = function() {
		return function(d) {
			return d.Total;
		};
	}


	$scope.descriptionFunction = function() {
		return function(d) {
			return d.key;
		}
	}

});