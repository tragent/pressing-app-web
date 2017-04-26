'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('DashboardCtrl', [ '$http', '$scope', 'readyItems', 'unreadyItems', 'TransactionService', '$cookieStore', '$location',
   function ($http, $scope, readyItems, unreadyItems, TransactionService, $cookieStore, $location) {
    $scope.currentDate = new Date();
    $scope.transactionsDueToday = [];
    $scope.readyItems = readyItems.data.length;
    $scope.unreadyItems = unreadyItems.data.length;

    TransactionService.getTransactionbyDueDate( $scope.currentDate,
      function(data){
        $scope.transactionsDueToday=data
      }, function(){
        console.log("Could not get transactions")
        $scope.transactionsDueToday = [];
    });

    $scope.viewTransaction = function(transactionId){
      $location.path('/deposited_items/view/' + transactionId);
    }

  }]);