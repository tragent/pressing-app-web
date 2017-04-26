'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('RoleCtrl', [ '$timeout', '$scope', '$rootScope', 'RoleService', '$location',
    function ($timeout, $scope, $rootScope, RoleService, $location) {
    $scope.roles = [];
    $scope.successMessage = $rootScope.successMessageR;
    if ($scope.successMessage) {
      $timeout(
        function () {
          $scope.successMessage = false;
          $rootScope.successMessageR = false;
        }, 3000);
    }

    $scope.pretty = function(permissionName){
      var prettyName = permissionName.replace(/_/g, ' ').replace("ROLE", "");
      prettyName = prettyName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      return prettyName;
    }

    RoleService.getAllRoles(
      function(data){
        $scope.roles=data;
      }, function(){
        console.log("Could not get roles");
        $scope.roles = [];
    });

    $scope.viewRole = function(id){
      $location.path('/roles/' + id);
    };


  }]);