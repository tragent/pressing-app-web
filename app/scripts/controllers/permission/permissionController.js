'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:PermissionCtrl
 * @description
 * # PermissionCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('PermissionCtrl', [ '$timeout', '$scope', '$rootScope', 'PermissionService', '$cookieStore', '$location',
    function ($timeout, $scope, $rootScope, PermissionService, $cookieStore, $location) {
    $scope.permissions = [];
    $scope.successMessage = $rootScope.successMessageP;
    if ($scope.successMessage) {
      $timeout(
        function () {
          $scope.successMessage = false;
          $rootScope.successMessageP = false;
        }, 3000);
    }

    $scope.pretty = function(permissionName){
      var prettyName = permissionName.replace(/_/g, ' ').replace("ROLE", "");
      prettyName = prettyName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      return prettyName;
    };

    PermissionService.getAllPermissions(
      function(data){
        $scope.permissions=data
      }, function(){
        console.log("Could not get transactions")
        $scope.permissions = {};
      });

    $scope.viewPermission = function(permissionId){
      $location.path('/permissions/' + permissionId);
    }


  }]);