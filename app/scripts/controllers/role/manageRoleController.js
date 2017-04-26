'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManageRoleCtrl
 * @description
 * # ManageRoleCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManageRoleCtrl', [ '$rootScope', '$scope', 'RoleService', 'allPermissions', '$location', '$stateParams',
   function ($rootScope, $scope, RoleService,  allPermissions, $location, $stateParams) {
    $scope.role = {};
    $scope.submitCreateRoleForm = false;
    $scope.permissions = new Array();
    $scope.permissionSet = false;
    $scope.rolePermission = [];
    $scope.role.permissionIds = [];
    $scope.update = false;
    var count = 0;

    $scope.pretty = function(permissionName){
      var prettyName = permissionName.replace(/_/g, ' ').replace("ROLE", "");
      prettyName = prettyName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      return prettyName;
    }

    $scope.permissions = allPermissions.data;
    $scope.newPermission = allPermissions.data[0];

    $scope.addPermission = function(permission){
      if ($scope.permissions.length > 0) {
        $scope.rolePermission[count++] = permission;
        var i=0;
        while($scope.permissions.length > i) {
          if($scope.permissions[i].id == permission.id){
            $scope.permissions = $scope.permissions.splice(i+1, 1);
            $scope.permissionSet = true;
          }
          i++;
          if($scope.permissions.length > 0) {
            $scope.newPermission = $scope.permissions[0];
          } else {
            $scope.newPermission = {};
          }
        }
      }
    };

    $scope.removePermission = function(permission){
      if ($scope.rolePermission.length > 0){
        var i=0;
        var index =  $scope.rolePermission.indexOf(permission);
        if (index > -1) {
          $scope.rolePermission.splice(index, 1);
        }
        count = $scope.rolePermission.length;
        $scope.permissions[$scope.permissions.length] = permission;
        $scope.newPermission = $scope.permissions[0];
        if($scope.rolePermission.length == 0){
          $scope.permissionSet = false;
        }
      }
    }

    $scope.createRole = function(){
      $scope.submitCreateRoleForm = true;
      if($scope.roleName && $scope.rolePermission.length > 0) {
        $scope.role.name = 'ROLE_' + $scope.roleName.toUpperCase().replace(/ /g,"_");
        return;
        var i=0;
        while($scope.rolePermission.length>i){
          $scope.role.permissionIds[i] = $scope.rolePermission[i].id;
          i++;
        }
        RoleService.createRole($scope.role,
          function(){
            console.log("Role created");
            $rootScope.successMessageR = true;
            $location.path('/roles');
          }, function(){
            $rootScope.successMessageR = false;
            console.log("Could not create role");
          })
      } else {
        console.log("Fill all inputs");
      }
    }

    if($stateParams.id) {
      $scope.update = true;
      RoleService.getRole($stateParams.id,
        function(data){
          $scope.roleName = $scope.pretty(data.name);
          $scope.role = data;
          if(data.permission.length > 0){
            $scope.rolePermission = data.permission;
            var tempPermissions = [];

            count = $scope.rolePermission.length;

            for (var j = $scope.permissions.length - 1; j >= 0; j--) {
              var counter = $scope.rolePermission.length;
              for (var i = $scope.rolePermission.length - 1; i >= 0; i--) {
                if($scope.rolePermission[i].id != $scope.permissions[j].id){
                  counter--;
                }
              }
              if(counter == 0) {
                tempPermissions.push($scope.permissions[j])
              }
            }

            $scope.permissions = tempPermissions;

            if($scope.permissions.length > 0) {
              $scope.newPermission = $scope.permissions[0];
            } else {
              $scope.newPermission = {};
            }
          } else {
            $scope.permissionSet = false;
          }

        }, function(){
          console.log("Could not get role");
          $scope.role = {};
          $location.path('/roles');
      });

      $scope.back = function(){
        $location.path('/roles');
      };

      $scope.updateRole = function(){
        if($scope.rolePermission.length > 0) {
          var updateRole = {
            "id"           : $scope.role.id,
            "name"         : $scope.role.name,
            "description"  : $scope.role.description,
            "permissionIds": []
          }
          var i=0;
          while($scope.rolePermission.length>i){
            updateRole.permissionIds[i] = $scope.rolePermission[i].id;
            i++;
          }
          RoleService.putRole($stateParams.id, updateRole,
            function(){
              console.log("Role updated");
              $rootScope.successMessageR = true;
              $location.path('/roles');
            }, function(){
              $rootScope.successMessageR = false;
              console.log("Could not update role");
          });
        } else {
          console.log("Fill all input fields");
        }
      }
    }
  }]);