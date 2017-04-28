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
    var customers = [];
    var items = [];

    TransactionService.getTransactionbyDueDate( $scope.currentDate,
      function(data){
        $scope.transactionsDueToday=data

        /* Arrange array for transactions for repeated customers */
        for (var i = 0; i < $scope.transactionsDueToday.length; i++) {
          if(typeof $scope.transactionsDueToday[i].customer == "object"){
            customers.push($scope.transactionsDueToday[i].customer);

          } else if(typeof $scope.transactionsDueToday[i].customer == "number") {
            for (var j = 0; j < customers.length; j++) {
              if(customers[j].id == $scope.transactionsDueToday[i].customer) {
                $scope.transactionsDueToday[i].customer = customers[j];
                break;
              }
            }
          }
        }

        /* Arrange array for transactions for repeated items */
        for (var i = 0; i < $scope.transactionsDueToday.length; i++) {
          if(typeof $scope.transactionsDueToday[i].item == "object"){
            items.push($scope.transactionsDueToday[i].item);

          } else if(typeof $scope.transactionsDueToday[i].item == "number") {
            for (var j = 0; j < items.length; j++) {
              if(items[j].id == $scope.transactionsDueToday[i].item) {
                $scope.transactionsDueToday[i].item = items[j];
                break;
              }
            }
          }
        }
      }, function(){
        console.log("Could not get transactions")
        $scope.transactionsDueToday = [];
    });

    $scope.viewTransaction = function(transactionId){
      $location.path('/deposited_items/view/' + transactionId);
    }

  }]);