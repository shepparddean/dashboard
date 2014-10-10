angular.module('companyController', [])


.controller('companiesCtrl', function($scope, $http, Company) {

	$scope.companies = {};

	$scope.gridOptions = {
		data: 'companies',
		enablePaging: true,
		showFooter: false,
		columnDefs: [{
			field: 'CompanyName',
			displayName: 'Company'
		}, {
			field: 'City',
			displayName: 'City'			
		}, {
			field: 'PhoneNumber',
			displayName: 'Phone'			
		}, {
			field: 'ContactPerson',
			displayName: 'Contact'			
		}, {
			field: 'Email',
			displayName: 'Email'			
		}]

	};

	Company.get()
		.success(function(data) {
			$scope.companies = data;

		})
		.error(function(data) {
			console.log('Error: ', data);
		});

})


.controller('totalCompanyCtrl', function($scope, $http, Company) {

	$scope.total = 0;


	Company.getTotalCompanies()
		.success(function(data) {
			$scope.total = data[0].Total;
		})
		.error(function(data) {
			console.log('Error : ', data);
		});

});