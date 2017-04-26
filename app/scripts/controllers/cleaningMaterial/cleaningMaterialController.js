'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:CleaningMaterialCtrl
 * @description
 * # CleaningMaterialCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('CleaningMaterialCtrl', [ '$timeout', '$scope', '$rootScope', 'CleaningMaterialService', '$location',
    function ($timeout, $scope, $rootScope, CleaningMaterialService, $location) {
    $scope.cleaningMaterials = [];
    $scope.successMessage = $rootScope.successMessageCM;
    if ($scope.successMessage) {
      $timeout(
        function () {
          $scope.successMessage = false;
          successMessageCM = false;
        }, 3000);
    }

   CleaningMaterialService.getAllCleaningMaterials(
      function(data){
        $scope.cleaningMaterials=data;
      }, function(){
        console.log("Could not get cleaning materials");
        $scope.cleaningMaterials= {};
      });

    $scope.viewMaterial = function(id){
      $location.path('/cleaning_materials/' + id);
    };


  }]);