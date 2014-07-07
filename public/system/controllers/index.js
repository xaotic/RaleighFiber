'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
}]);

angular.module('mean.system').directive('myMap', function(){
  return{
    restrict: 'E',
    templateUrl: './public/system/views/my-map.html',
    controller: function ($http, $scope){
      $scope.fields = [];
      $http.get('http://localhost:27080/mean-dev/articles/_find').success(function(data){
        alert(data);
         $scope.fields = data;
       }),
        angular.extend($scope, {
          raleigh: {
            lat: 35.843768,
            lng:-78.6450559,
            zoom: 11
          },
          markers: {
            downtown: {
              lat: 35.843768,
              lng:-78.6450559,
              message: "RALEIGH WANTS FIBER",
              focus: true,
              draggable: false
            }
          }
        });
      


    },
    controllerAs: 'map'
  };
});

angular.module('mean.system').controller("DemoController", [ "$scope", function($scope) {
              angular.extend($scope, {
                london: {
                    lat: 51.505,
                    lng: -0.09,
                    zoom: 4
                }
            });
            // Nothing here!
        }]);