angular.module('originationService', [])


.factory('Originations', function($http) {

	return {

		get: function() {
			return $http.get('/api/originations/today');
		},


		getMortgages: function() {
			return $http.get('/api/mortgages/today');
		},

		getTransactionOffers: function(transactionId) {
			return $http.get('/api/offers/' + transactionId);
		},

		getFundings: function() {
			return $http.get('/api/fundings/today');
		},

		getFundingsByPropertyUse: function() {
			return $http.get('/api/fundings/property');
		}

	}
});