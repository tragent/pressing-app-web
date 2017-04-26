'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManageCustomerCtrl
 * @description
 * # ManageCustomerCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManageCustomerCtrl', [ '$rootScope', '$scope', 'CustomerService', '$stateParams', '$location',
   function ($rootScope, $scope, CustomerService, $stateParams, $location) {
    $scope.customer = {};
    $scope.customer.active = true;
    $scope.submitCreateCustomerForm = false;
    $scope.update = false;

    $scope.createCustomer = function(){
      $scope.submitCreateCustomerForm = true;
      if($scope.customer.firstName && $scope.customer.lastName && $scope.customer.telephone && $scope.customer.email){
        CustomerService.createCustomer($scope.customer,
          function(){
            console.log("Custmer account created");
            $rootScope.successMessageC = true;
            $location.path('/customers');
          }, function(){
            $rootScope.successMessageC = false;
            console.log("Could not create customer account");
          });
      } else {
        console.log("Fill all input fields");
      }
    }

    if($stateParams.id) {
      $scope.update = true;
      CustomerService.getCustomer($stateParams.id,
        function(data){
          $scope.customer = data;
        }, function(){
          console.log("Could not get customer");
          $location.path('/customers');
      });

      $scope.back = function(){
        $location.path('/customers');
      };

      $scope.updateCustomer = function(){
        if($scope.customer.firstName && $scope.customer.lastName && $scope.customer.telephone && $scope.customer.email){
        CustomerService.updateCustomer($stateParams.id, $scope.customer,
          function(){
            console.log("Customer account updated");
            $rootScope.successMessageC = true;
            $location.path('/customers');
          }, function(){
            $rootScope.successMessageC = false;
            console.log("Could not update customer account");
          });
      } else {
        console.log("Fill all input fields");
      }
      }
    }

  }]);