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
    var customers = [];
    var items = [];

    TransactionService.getTransactionsPastDueDate( $scope.currentDate,
      function(data){
        $scope.transactions=data;

        /* Arrange array for transactions for repeated customers */
        for (var i = 0; i < $scope.transactions.length; i++) {
          if(typeof $scope.transactions[i].customer == "object"){
            customers.push($scope.transactions[i].customer);

          } else if(typeof $scope.transactions[i].customer == "number") {
            for (var j = 0; j < customers.length; j++) {
              if(customers[j].id == $scope.transactions[i].customer) {
                $scope.transactions[i].customer = customers[j];
                break;
              }
            }
          }
        }

        /* Arrange array for transactions for repeated items */
        for (var i = 0; i < $scope.transactions.length; i++) {
          if(typeof $scope.transactions[i].item == "object"){
            items.push($scope.transactions[i].item);

          } else if(typeof $scope.transactions[i].item == "number") {
            for (var j = 0; j < items.length; j++) {
              if(items[j].id == $scope.transactions[i].item) {
                $scope.transactions[i].item = items[j];
                break;
              }
            }
          }
        }
      }, function(){
        console.log("Could not get transactions")
        $scope.transactions = [];
      });

    $scope.stringToDate = function(dateString){
      var date = new Date(dateString);
      return date;
    };

    $scope.viewTransaction = function(transactionId){
      $location.path('/deposited_items/view/' + transactionId);
    }
  }]);