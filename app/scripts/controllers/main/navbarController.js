'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('NavCtrl', [ '$cookieStore', '$scope', '$rootScope', 'TransactionService', 'AuthenticationService', '$location',
    function ($cookieStore, $scope, $rootScope, TransactionService, AuthenticationService, $location) {

    var userData = $cookieStore.get('userData');
    $scope.loggedInUser = userData;
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

    /*Logout*/
    $scope.logout = function(){
      AuthenticationService.logout();
      $location.path('/login');
    };

    $scope.viewTransaction = function(transactionId){
      $location.path('/deposited_items/view/' + transactionId);
    }
  }]);