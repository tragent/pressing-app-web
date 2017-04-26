'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:NotificationCtrl
 * @description
 * # NotificationCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('NotificationCtrl', [ '$scope', 'TransactionService', '$location', function ($scope, TransactionService, $location) {
    $scope.currentDate = new Date();
    $scope.transactions = [];

    TransactionService.getTransactionsPastDueDate( $scope.currentDate,
      function(data){
        $scope.transactions=data
      }, function(){
        console.log("Could not get transactions")
        $scope.transactions = [];
      });

    $scope.viewTransaction = function(transactionId){
      $location.path('/deposited_items/view/' + transactionId);
    }
  }]);