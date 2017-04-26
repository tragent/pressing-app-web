'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ViewDepositedItemCtrl
 * @description
 * # ViewDepositedItemCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ViewDepositedItemCtrl', [ '$http', '$scope', '$stateParams', 'ItemService', 'CustomerService', 'PaymentMethodService', 'TransactionService', '$location',
    function ($http, $scope, $stateParams, ItemService, CustomerService, PaymentMethodService, TransactionService, $location) {
    $scope.transaction = {};

    TransactionService.getTransaction($stateParams.id,
      function(data){
        $scope.transaction = data;
        $scope.amountPaid = 0;
        $scope.transactionDepositDate = stringToDate(data.depositDate);
        $scope.transactionDueDate = stringToDate(data.dueDate);
        $scope.numberOfPayments = data.payments.length;
        var arraySize = data.payments.length - 1;
        $scope.paymentDates = [];
        while(arraySize >= 0){
          $scope.paymentDates[arraySize] = stringToDate(data.payments[arraySize].time);
          $scope.amountPaid += data.payments[arraySize].amount;
          arraySize--;
        }
        $scope.amountPending = data.item.cost - $scope.amountPaid;
      }, function(){
        console.log("Could not get transaction");
        $location.path('/deposited_items');
    });

    $scope.updateTransacttion = function(id){
      $location.path('/deposited_items/update/' + id);
    };

    var dateToString = function(date){
      var dateString = date.getMilliseconds();
      return dateString;
    };

    var stringToDate = function(dateString){
      var date = new Date(dateString);
      return date;
    };

    $scope.isActive = function(index){
      if(index == 1)
        return true;
      else
        return false;
    };

  }]);