'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManageDepositedItemCtrl
 * @description
 * # ManageDepositedItemCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManageDepositedItemCtrl', [ '$http', '$scope', '$rootScope', '$stateParams', 'ItemService', 'CustomerService', 'PaymentMethodService', 'TransactionService', '$location',
    function ($http, $scope, $rootScope, $stateParams, ItemService, CustomerService, PaymentMethodService, TransactionService, $location) {
    $scope.transaction = {};
    $scope.items = {};
    $scope.customers = {};
    $scope.paymentMethods = {};
    $scope.depositDate = new Date();
    $scope.transaction.depositDate = '';
    $scope.payment = {};
    $scope.payment.paymentMethod = {};
    $scope.today = $scope.payment.paymentDate = new Date();
    $scope.payment.time = '';
    $scope.submitDepositItemForm = false;
    $scope.submitMakePaymentForm = false;
    $scope.update = false;
    $scope.transaction.quantity = 1;
    $scope.totalCost = 0;

    var dateToString = function(date){
      var dateString = date.getTime();
      return dateString;
    };

    var stringToDate = function(dateString){
      var date = new Date(dateString);
      return date;
    };

    CustomerService.getActiveCustomers(true,
      function(data){
        $scope.customers = data;
        $scope.transaction.customer = $scope.customers[0];
      }, function(){
        console.log("Could not get customers");
        $scope.items = {};
      });

    ItemService.getAllItems(
      function(data){
        $scope.items=data;
        $scope.transaction.item = $scope.items[0];
        $scope.totalCost = $scope.transaction.item.cost * $scope.transaction.quantity;
      }, function(){
        console.log("Could not get items");
        $scope.items = {};
      });

    PaymentMethodService.getAllPaymentMethods(
      function(data){
        $scope.paymentMethods=data;
        $scope.payment.paymentMethod = $scope.paymentMethods[0];
      }, function(){
        console.log("Could not get payment method");
        $scope.paymentMethods = {};
      });

    $scope.updateTotalCostFromQty = function(quantity){
      $scope.totalCost = $scope.transaction.item.cost * quantity;
    };

    $scope.updateTotalCostFromItem = function(item){
      $scope.totalCost = item.cost * $scope.transaction.quantity;
    };

    $scope.depositeItem = function(){
      $scope.submitDepositItemForm = true;
      if($scope.dueDate && $scope.depositDate && $scope.transaction.quantity && $scope.transaction.status
        && $scope.transaction.label){

        $scope.transaction.depositDate = dateToString($scope.depositDate);
        $scope.transaction.dueDate = dateToString($scope.dueDate);
        TransactionService.createNewTransaction($scope.transaction,
          function(date){
            console.log('Saved trans');
            $rootScope.successMessageDI = true;
            $location.path('/deposited_items');
          }, function(){
            $rootScope.successMessageDI = false;
            console.log('could not save trans');
          });
      } else {
        console.log("Fill all input fields");
      }
    };

    if($stateParams.id){
      $scope.update = true;
      TransactionService.getTransaction($stateParams.id,
        function(data){
          $scope.transaction = data;
          $scope.customerName = data.customer.firstName+' '+data.customer.lastName;
          $scope.amountPaid = 0;
          $scope.totalCost = data.item.cost * data.quantity;
          $scope.itemDepositDate = stringToDate(data.depositDate);
          $scope.itemDueDate = stringToDate(data.dueDate);
          $scope.numberOfPayments = data.payments.length;
          var arraySize = data.payments.length - 1;
          while(arraySize >= 0){
            $scope.amountPaid += data.payments[arraySize].amount;
            arraySize--;
          }
          $scope.amountPending = data.item.cost - $scope.amountPaid;

          $scope.updateTransactionStatus = function(){
            $scope.update = true;
            var customerItem = {
              "id": $scope.transaction.id,
              "item": $scope.transaction.item,
              "customer": $scope.transaction.customer,
              "quantity": $scope.transaction.quantity,
              "status": $scope.transaction.status,
              "label": $scope.transaction.label,
              "depositDate": $scope.transaction.depositDate,
              "dueDate": $scope.transaction.dueDate
            }
            TransactionService.updateTransaction($stateParams.id, customerItem,
              function(data){
                $scope.update = false;
                $rootScope.successMessageDI = true;
                $location.path('/deposited_items');
              }, function(){
                $rootScope.successMessageDI = false;
                console.log("Cld not update transaction");
            });
          };


          $scope.back = function(){
            $location.path('/deposited_items/view/' + $stateParams.id);
          }

          $scope.makePayment = function(){
            $scope.submitMakePaymentForm = true;
            var transactionPayment = {
              "amount": $scope.payment.amount,
              "paymentDate": dateToString($scope.payment.paymentDate),
              "customerItemId": $scope.transaction.id,
              "paymentMethodId": $scope.payment.paymentMethod.id
            }
            if($scope.payment.paymentDate && $scope.payment.paymentMethod && $scope.payment.amount){
              TransactionService.depositPayment($stateParams.id, transactionPayment,
              function(data){
                $scope.update = false;
                $location.path('/deposited_items/view/' + $stateParams.id);
              }, function(){

              });
            } else {
                console.log("Fill all input fields");
            }
          };
        }, function(){
          console.log("Could not get transaction");
          $scope.update = false;
          $location.path('/deposited_items');
        });
    }

    $scope.updateTransacttion = function(id){
      $location.path('/deposited_items/update/' + id);
    };

    $scope.isActive = function(index){
      if(index == 1)
        return true;
      else
        return false;
    };

  }]);