'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('UserCtrl', [ '$timeout', '$scope', '$rootScope', 'UserService', '$location',
    function ($timeout, $scope, $rootScope, UserService, $location) {
    $scope.users = [];
    $scope.successMessage = $rootScope.successMessageU;
    if ($scope.successMessage) {
      $timeout(
        function () {
          $scope.successMessage = false;
          $rootScope.successMessageU = false;
        }, 3000);
    }

   UserService.getAllUsers(
      function(data){
        $scope.users=data;
      }, function(){
        console.log("Could not get users");
        $scope.users = [];
      });

    $scope.viewUser = function(id){
      $location.path('/users/' + id);
    };


  }]);