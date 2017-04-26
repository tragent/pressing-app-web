'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ExpenditureCtrl
 * @description
 * # ExpenditureCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ExpenditureCtrl', [ '$timeout', '$scope', '$rootScope', 'ExpenditureService', '$location',
    function ($timeout, $scope, $rootScope, ExpenditureService, $location) {
    $scope.expenditures = [];
    $scope.successMessage = $rootScope.successMessageE;
    if ($scope.successMessage) {
      $timeout(
        function () {
          $scope.successMessage = false;
          $rootScope.successMessageE = false;
        }, 3000);
    }

   ExpenditureService.getAllExpenditures(
      function(data){
        $scope.expenditures=data;
      }, function(){
        console.log("Could not get expenditures");
        $scope.expenditures= {};
      });

    $scope.stringToDate = function(dateString){
      var date = new Date(dateString);
      return date;
    };

    $scope.viewExpenditure = function(id){
      $location.path('/expenditures/' + id);
    };


  }]);