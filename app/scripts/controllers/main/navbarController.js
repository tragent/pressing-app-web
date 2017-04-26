'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('NavCtrl', [ '$cookieStore', '$scope', '$rootScope', 'TransactionService', '$location',
    function ($cookieStore, $scope, $rootScope, TransactionService, $location) {

    var userData = $cookieStore.get('userData');
    $scope.loggedInUser = userData.user;
    var currentDate = new Date();

    $scope.toggleSideBar = function(){
      $rootScope.showSideBar = !$rootScope.showSideBar;
    };

    TransactionService.getTransactionsPastDueDate(currentDate,
      function(data){
        $scope.notification = data.length;
      }, function(){
        console.log("Could not set notification")
    })

    $scope.viewTransaction = function(transactionId){
      $location.path('/deposited_items/view/' + transactionId);
    }
  }]);