// main.js
var app = angular.module('dashboardApp', ['ngGrid', 'ngMap',
	//'nvd3ChartDirectives',
	'googlechart',
	'ui.router',
	'originationController',
	'transactionController',
	'companyController',
	'fundingController',
	'mapController',
	'chartsController',
	'originationService',
	'companyService',
	'reportService'
]);


app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})

	.state('transactions', {
		url : '/transactions',
		templateUrl: '/views/transactions.html'
	})

	.state('offers', {
		url : '/offers',
		templateUrl: '/views/offers.html'
	})

	.state('offers2', {
		url : '/offers/:transactionId',
		templateUrl: '/views/transactionOffers.html'
	})

	.state('companies', {
		url: '/companies',
		templateUrl: '/views/companies.html'
	})

	.state('fundings', {
		url : '/fundings',
		templateUrl: '/views/fundings.html'
	})


	$urlRouterProvider.otherwise('/');
});