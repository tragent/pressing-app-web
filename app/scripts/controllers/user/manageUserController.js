'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManageUserCtrl
 * @description
 * # ManageUserCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManageUserCtrl', [ '$rootScope', '$scope', 'UserService', '$location', '$stateParams', 'allRoles',
   function ($rootScope, $scope, UserService, $location, $stateParams, allRoles) {
    $scope.user = {};
    $scope.user.active = true;
    $scope.submitCreateUserForm = false;
    $scope.roles = new Array();
    $scope.userRole = [];
    $scope.newRole;
    var count = 0;
    $scope.roleSet = false;
    $scope.user.roleIds = [];
    $scope.update = false;
    $scope.roles = allRoles.data;
    $scope.newRole = allRoles.data[0];

    $scope.pretty = function(roleName){
      var prettyName = roleName.replace(/_/g, ' ').replace("ROLE", "");
      prettyName = prettyName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      return prettyName;
    }

    $scope.addRole = function(role){
      if ($scope.roles.length > 0) {
        var newRoles = [];
        $scope.userRole[count++] = role;

        for (var i = $scope.roles.length - 1; i >= 0; i--) {
          if($scope.roles[i].id != role.id){
            newRoles.push($scope.roles[i]);
          }
        }
        if(newRoles.length > 0) {
            $scope.newRole = newRoles[0];
          } else {
            $scope.newRole = {};
        }
        $scope.roles = newRoles;
        $scope.roleSet = true;
      }
    };

    $scope.removeRole = function(role){
      if ($scope.userRole.length > 0){
        var i=0;
        var index =  $scope.userRole.indexOf(role);
        if (index > -1) {
          $scope.userRole.splice(index, 1);
        }
        count = $scope.userRole.length;
        $scope.roles[$scope.roles.length] = role;
        $scope.newRole = $scope.roles[0];
        if($scope.userRole.length == 0){
          $scope.roleSet = false;
        }
      }
    };

    $scope.createUser = function(){
      $scope.submitCreateUserForm = true;
      if($scope.user.firstName && $scope.user.lastName && $scope.user.username && $scope.user.password
        && $scope.user.telephone && $scope.userRole.length > 0) {
        var i=0;
        while($scope.userRole.length>i){
          $scope.user.roleIds[i] = $scope.userRole[i].id;
          i++;
        }
        UserService.createUser($scope.user,
          function(){
            console.log("User created");
            $rootScope.successMessageU = true;
            $location.path('/users');
          }, function(){
            $rootScope.successMessageU = false;
            console.log("Could not create user");
          });
      } else {
        console.log("Fill in all input fields");
      }
    };

    if($stateParams.id){
      $scope.update = true;
      UserService.getUser($stateParams.id,
        function(data){
          $scope.user = data;
          if (data.roles.length >  0) {
            $scope.userRole = data.roles;
            var tempRoles = [];
            tempRoles.push(data.roles[0]);

            for (var i = $scope.userRole.length - 2; i >= 0; i--) {
              var counter = tempRoles.length;
              for (var j = tempRoles.length - 1; j >= 0; j--) {
                if($scope.userRole[i].id != tempRoles[j].id){
                  counter--;
                }
              }
              if (counter == 0) {
                tempRoles.push($scope.userRole[i]);
              }
            }

            $scope.userRole = tempRoles;
            tempRoles = [];
            count = $scope.userRole.length;

            for (var j = $scope.roles.length - 1; j >= 0; j--) {
              var counter = $scope.userRole.length;
              for (var i = $scope.userRole.length - 1; i >= 0; i--) {
                if($scope.userRole[i].id != $scope.roles[j].id){
                  counter--;
                }
              }
              if(counter == 0) {
                tempRoles.push($scope.roles[j])
              }
            }

            $scope.roles = tempRoles;

            if($scope.roles.length > 0) {
              $scope.newRole = $scope.roles[0];
            } else {
              $scope.newRole = {};
            }
          } else {
            $scope.roleSet = false;
          }
        }, function(){
          console.log("Could not create user");
          $scope.user = {};
          $location.path('/users');
        });

      $scope.back = function(){
        $location.path('/users');
      }

      $scope.updateUser = function(){
        $scope.submitCreateUserForm = true;
        if($scope.user.firstName && $scope.user.lastName && $scope.user.password
          && $scope.user.telephone && $scope.userRole.length > 0) {
          $scope.roleSet = true;
          var updatedUser = {
            "id": $scope.user.id,
            "firstName": $scope.user.firstName,
            "lastName" : $scope.user.lastName,
            "username" : $scope.user.username,
            "password" : $scope.user.password,
            "roleIds"  : [],
            "telephone": $scope.user.telephone,
            "active"   : $scope.user.active
          }

          for(var i=0 ; $scope.userRole.length>i ; i++){
            updatedUser.roleIds[i] = $scope.userRole[i].id;
          }
          UserService.updateUser($stateParams.id, updatedUser,
            function(){
              console.log("User updated");
              $rootScope.successMessageU = true;
              $location.path('/users');
            }, function(){
              $rootScope.successMessageU = false;
              console.log("Could not update user");
            });
        } else {
          console.log("Fill all inputs");
        }
      }
    }

  }]);