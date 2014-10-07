// main.js
var app = angular.module('dashboardApp', ['ngGrid']);


    app.controller('MyCtrl', function($scope) {
        
        $scope.myData = [{name: "Moroni", age: 50, employee: true},
                         {name: "Tiancum", age: 43, employee: true},
                         {name: "Jacob", age: 27, employee: true},
                         {name: "Nephi", age: 29, employee: true},
                         {name: "Enos", age: 34, employee: false}];

        $scope.gridOptions = { 
            data: 'myData'
        };
});