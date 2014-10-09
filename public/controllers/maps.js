angular.module('mapController', [])

.controller('mapCtrl', function($scope, $http, Originations) {


	$scope.total = 0;

	$scope.$on('mapInitialized', function(event, map) {


		Originations.getMortgages()
			.success(function(data) {
				var count = 0;
				$.each(data, function(index, mortgage) {
					if (mortgage.lat != null && mortgage.lat > 0) {

						var marker = new google.maps.Marker({
							title: 'Transaction ' + mortgage.TransactionID
						});

						var loc = new google.maps.LatLng(mortgage.lat, mortgage.lng);

						marker.setPosition(loc);
						marker.setMap(map);
						$scope.total += 1;

					}
				})

			})
			.error(function(data) {
				console.log('Error: ', data);
			});
	});
});