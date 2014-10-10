angular.module('companyService', [])


.factory('Company', function($http) {

	return {


		get: function() {
			return $http.get('/api/companies');
		},

		getTotalCompanies: function() {
			return $http.get('/api/companies/count');
		},

		getCompanies: function() {
			return $http.get('/api/companies');
		}

	}
});