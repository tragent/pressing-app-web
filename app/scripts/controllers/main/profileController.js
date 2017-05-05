'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ProfileCtrl', [ '$scope', '$timeout', '$cookieStore', 'UserService', '$location',  '$window',
    function ($scope, $timeout, $cookieStore, UserService, $location, $window) {
    $scope.currentDate = new Date();
    var userData = $cookieStore.get('userData');
    $scope.user = userData;
    $scope.submitUserForm = false;
    $scope.correctPassword = true;
    $scope.validNewPassword = true;
    $scope.successMessage = false;

    $scope.updateProfile = function (){
      $scope.submitUserForm = true;

      if(($scope.password || $scope.newPassword) && $scope.user.username
        && $scope.user.firstName && $scope.user.lastName && $scope.user.telephone) {
        var loggedInUser = {
          id        : $scope.user.id,
          firstName : $scope.user.firstName,
          lastName  : $scope.user.lastName,
          username  : $scope.user.username,
          password  : $scope.user.password,
          active    : $scope.user.active,
          roleIds   : [],
          telephone : $scope.user.telephone,
        }

        if($scope.newPassword){
          if($scope.password.localeCompare($scope.user.password) != 0){
            $scope.correctPassword = false;
            return;
          } else {
            $scope.correctPassword = true;
            if ($scope.newPassword.localeCompare($scope.user.password) == 0) {
              $scope.validNewPassword = false
              return;
            } else {
              $scope.validNewPassword = true
              loggedInUser.password = $scope.newPassword
            }
          }
        }

        var i =0;
        while($scope.user.roles.length>i){
          loggedInUser.roleIds[i] = $scope.user.roles[i].id;
          i++;
        }

        UserService.updateUser(loggedInUser.id, loggedInUser,
          function(){
            $scope.successMessage = true;
            $cookieStore.remove('userData');
            $cookieStore.remove('notification');
            $timeout(
              function () {
                $scope.successMessage = false;
              $window.location.reload();
              $location.path('/login');
              }, 3000);
          }, function(){
            console.log("Could not update profile");
        });

      } else {
        console.log("Fill in required input");
      }
    }

  }]);