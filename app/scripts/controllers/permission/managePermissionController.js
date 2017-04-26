'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManagePermissionCtrl
 * @description
 * # ManagePermissionCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManagePermissionCtrl', [ '$rootScope', '$scope', 'PermissionService', '$location', '$stateParams',
    function ($rootScope, $scope, PermissionService, $location, $stateParams) {
    $scope.permission = {};
    $scope.submitCreatePermissionForm = false;
    $scope.update = false;

    $scope.createPermission = function(){
      $scope.submitCreatePermissionForm = true;
      if($scope.permissionName){
        $scope.permission.name = $scope.permissionName.toUpperCase().replace(/ /g,"_");
        PermissionService.createPermission($scope.permission,
          function(){
            console.log("Permission created");
            $rootScope.successMessageP = true;
            $location.path('/permissions');
          }, function(){
            $rootScope.successMessageP = false;
            console.log("Could not create permission");
          });
      } else {
        console.log("Fill input fields");
      }
    }

    if($stateParams.id){
      $scope.update = true;

      var pretty = function(permissionName){
        var prettyName = permissionName.replace(/_/g, ' ');
        prettyName = prettyName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        return prettyName;
      };

      PermissionService.getPermission($stateParams.id,
        function(data){
          $scope.permission = data;
          $scope.permissionName = pretty(data.name);
        }, function(){
          console.log("Could not get permission");
          $scope.permission = {};
          $location.path('/permissions');
      });

      $scope.back = function(){
        $location.path('/permissions');
      }

      $scope.updatePermission = function(){
        $scope.submitCreatePermissionForm = true;
        PermissionService.updatePermission($stateParams.id, $scope.permission,
          function(){
            console.log("Permission updated");
            $rootScope.successMessageP = true;
              $location.path('/permissions');
          }, function(){
            $rootScope.successMessageP = false;
            console.log("Could not update permission");
          });
      }
    }
  }]);