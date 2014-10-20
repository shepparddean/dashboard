angular.module('reportService', [])


.factory('Reports', function($http) {

	return {

		getOriginationVsFunding: function(year) {
			return $http.get('/api/report/fundings/' + year);
		},


		getOutstandingApplicationsByAssetType: function() {
			return $http.get('/api/report/outstanding');
		},

		getFundingsByFunder: function() {
			return $http.get('/api/report/fundingsByFunder');
		},

		getFunderOriginatedAndClosed: function() {
			return $http.get('/api/report/funderOriginatedAndClosed');
		},

		getFundedDealsByPeriod: function(startDate, endDate) {
			return $http.get('/api/report/fundingByPeriod/' + startDate + '/' + endDate);
		}


	}
});