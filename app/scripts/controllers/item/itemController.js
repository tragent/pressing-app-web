'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ItemCtrl
 * @description
 * # ItemCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ItemCtrl', [ '$timeout', '$scope', '$rootScope', 'ItemService', '$location',
    function ($timeout, $scope, $rootScope, ItemService, $location) {
    $scope.items = [];
    $scope.successMessage = $rootScope.successMessageI;
    if ($scope.successMessage) {
      $timeout(
        function () {
          $scope.successMessage = false;
          $rootScope.successMessageI = false;
        }, 3000);
    }

   ItemService.getAllItems(
      function(data){
        $scope.items=data;
      }, function(){
        console.log("Could not get items");
        $scope.items = {};
      });

    $scope.viewItem = function(id){
      $location.path('/items/' + id);
    };


  }]);