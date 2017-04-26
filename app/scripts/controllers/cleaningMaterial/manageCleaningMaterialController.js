'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManageCleaningMaterialCtrl
 * @description
 * # ManageCleaningMaterialCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManageCleaningMaterialCtrl', [ '$rootScope', '$scope', 'CleaningMaterialService', '$location', '$stateParams',
    function ($rootScope, $scope, CleaningMaterialService, $location, $stateParams) {
    $scope.cleaningMaterial = {};
    $scope.submitCleaningMaterialForm = false;
    $scope.update = false;

    $scope.createCleaningMaterial = function(){
      $scope.submitCleaningMaterialForm = true;
      if($scope.cleaningMaterial.name && $scope.cleaningMaterial.cost){
        CleaningMaterialService.createCleaningMaterial($scope.cleaningMaterial,
          function(){
            console.log("Cleaning material created");
            $rootScope.successMessageCM = true;
            $location.path('/cleaning_materials');
          }, function(){
            $rootScope.successMessageCM = false;
            console.log("Could not create cleaning material");
          });
      } else {
        $scope.submitCleaningMaterialForm = false;
        console.log("Fill in all input fields");
      }
    };

    if($stateParams.id){
      $scope.update = true;
      CleaningMaterialService.getCleaningMaterial($stateParams.id,
        function(data){
          $scope.cleaningMaterial = data;
        }, function(){
          console.log("could not get cleaning material's details");
          $location.path('/cleaning_materials');
        });

      $scope.back = function(){
         $location.path('/cleaning_materials');
      }

      $scope.updateCleaningMaterial = function(){
        $scope.submitCleaningMaterialForm = true;
        if ($scope.cleaningMaterial.cost) {
          CleaningMaterialService.updateCleaningMaterial($stateParams.id, $scope.cleaningMaterial,
            function(data){
              console.log("cleaning material updated");
              $rootScope.successMessageCM = true;
              $location.path('/cleaning_materials');
            }, function(){
              console.log("could not update cleaning material");
              $rootScope.successMessageCM = false;
            });
        } else {
          $scope.submitCleaningMaterialForm = false;
          console.log("Fill in all input fields");
        }
      };
    }

  }]);