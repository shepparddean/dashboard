angular.module('chartsController', [])


.controller('transactionVolumeCtrl', function($scope, $http,Originations) {
    

    $scope.chart = {};

    $scope.chart.data = {"cols": [
        {id: "t", label: "Month", type: "string"},
        {id: "s", label: "Volume", type: "number"}
    ], "rows": [
        {c: [
            {v: "Jan"},
            {v: 3},
        ]},
        {c: [
        	{
        		v: "Feb"},
        	{	v: 4
        	}
        ]},
        {c: [
            {v: "Mar"},
            {v: 31}
        ]},
        {c: [
            {v: "Apr"},
            {v: 21},
        ]},
        {c: [
            {v: "May"},
            {v: 21},
        ]},
        {c: [
            {v: "Jun"},
            {v: 22},
        ]},
        {c: [
            {v: "Jul"},
            {v: 42},
        ]},
        {c: [
            {v: "Aug"},
            {v: 32},
        ]},
        {c: [
            {v: "Sep"},
            {v: 12},
        ]},
        {c: [
            {v: "Oct"},
            {v: 22},
        ]},
        {c: [
            {v: "Nov"},
            {v: 21},
        ]},
        {c: [
            {v: "Dec"},
            {v: 12},
        ]}
    ]};


    // $routeParams.chartType == BarChart or PieChart or ColumnChart...
    $scope.chart.type = 'LineChart';
    $scope.chart.options = {
        'title': 'Volume by Month'
    }


})


.controller('propertyUseCtrl', function($scope, $http, Originations) {


	$scope.total = 0;

	var chart1 = {};
	chart1.type = "PieChart";
	chart1.data = [
		['Property Use', 'Total'],
	]



	 chart1.options = {
        displayExactValues: true,
        // width: 400,
        // height: 200,
        is3D: true
       // chartArea: {left:10,top:10,bottom:0,height:"100%"}
    };


	Originations.getFundingsByPropertyUse()
		.success(function(data) {
			$scope.data = data;

			$.each($scope.data, function(key, val) {
				chart1.data.push([val.PropertyUse, val.Total]);
				$scope.total += val.Total;
			});

		})
		.error(function(data) {
			console.log('Error: ', data);
		});

	
	// chart1.formatters = {
 //      number : [{
 //        columnNum: 1,
 //        pattern: "$ #,##0.00"
 //      }]
 //    };

    $scope.chart = chart1;


	// $scope.xFunction = function() {
	// 	return function(d) {
	// 		return d.PropertyUse;
	// 	};
	// }


	// $scope.yFunction = function() {
	// 	return function(d) {
	// 		return d.Total;
	// 	};
	// }


	// $scope.descriptionFunction = function() {
	// 	return function(d) {
	// 		return d.key;
	// 	}
	// }

});