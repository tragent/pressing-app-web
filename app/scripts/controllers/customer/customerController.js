'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('CustomerCtrl', [ '$timeout', '$scope', '$rootScope', 'CustomerService', '$cookieStore', '$location',
    function ($timeout, $scope, $rootScope, CustomerService, $cookieStore, $location) {
    $scope.customers = [];
    $scope.successMessage = $rootScope.successMessageC;
    if ($scope.successMessage) {
      $timeout(
        function () {
          $scope.successMessage = false;
          $rootScope.successMessageC = false;
        }, 3000);
    }

    CustomerService.getAllCustomers(
      function(data){
        $scope.customers=data
      }, function(){
        console.log("Could not get transactions")
        $scope.customers = {};
      });

    $scope.viewCustomer = function(customerId){
      $location.path('/customers/' + customerId);
    }


  }]);