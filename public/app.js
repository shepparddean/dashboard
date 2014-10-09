// main.js
var app = angular.module('dashboardApp', ['ngGrid', 'ngMap', 'nvd3ChartDirectives', 'ui.router',
	'originationController',
	'transactionController',
	'fundingController',
	'mapController',
	'chartsController',
	'originationService'
]);


app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('main', {
		url: '/main',
		templateUrl: '/views/main.html'
	})


	.state('offers', {
		url: '/offers/:transactionId',
		templateUrl: '/views/transactionOffers.html',
		controller: 'transactionOffersCtrl'
	});

	$urlRouterProvider.otherwise('/main');

});