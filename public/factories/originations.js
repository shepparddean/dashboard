angular.module('originationService', [])


.factory('Originations', function($http) {

	return {

		get: function() {
			return $http.get('/api/originations/today');
		},


		getMortgages: function() {
			return $http.get('/api/mortgages/today');
		},

		getTotalTransactions: function() {
			return $http.get('/api/mortgages/count');
		},

		getTotalMonthlyTransactions: function(year) {
			return $http.get('/api/mortgages/year/' + year);
		},

		getOffers: function() {
			return $http.get('/api/offers');
		},

		getTransactionOffers: function(transactionId) {
			return $http.get('/api/offers/' + transactionId);
		},

		getTotalOffers: function() {
			return $http.get('/api/offers/count');
		},


		getFundings: function() {
			return $http.get('/api/fundings');
		},

		getTotalFundedAmount: function() {
			return $http.get('/api/fundings/sum');
		},

		getFundingsByPropertyUse: function() {
			return $http.get('/api/fundings/property');
		}

	}
});