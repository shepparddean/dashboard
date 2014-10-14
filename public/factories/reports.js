angular.module('reportService', [])


.factory('Reports', function($http) {

	return {

		getOriginationVsFunding: function(year) {
			return $http.get('/api/report/fundings/' + year);
		}

	
	}
});