'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManageExpenditureCtrl
 * @description
 * # ManageExpenditureCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManageExpenditureCtrl', [ '$rootScope', '$scope', 'ExpenditureService', 'CleaningMaterialService', '$location', '$stateParams',
    function ($rootScope, $scope, ExpenditureService, CleaningMaterialService, $location, $stateParams) {
    $scope.expenditure = {};
    $scope.purchasedDate = new Date();
    $scope.cleaningMaterials = {};
    $scope.submitCreateExpenditureForm = false;
    $scope.update = false;

    var dateToString = function(date){
      var dateString = date.getTime();
      return dateString;
    };

    var stringToDate = function(dateString){
      var date = new Date(dateString);
      return date;
    };

   CleaningMaterialService.getAllCleaningMaterials(
      function(data){
        $scope.cleaningMaterials=data;
        $scope.expenditure.cleaningMaterial = data[0];
      }, function(){
        console.log("Could not get cleaning materials");
        $scope.cleaningMaterials= {};
      });

    $scope.createExpenditure = function(){
      $scope.submitCreateExpenditureForm = true;
      if ($scope.expenditure.cleaningMaterial && $scope.expenditure.quantity && $scope.purchasedDate && $scope.depreciationDate) {
        $scope.expenditure.purchasedDate = dateToString($scope.purchasedDate);
        $scope.expenditure.depreciationDate = dateToString($scope.depreciationDate);
        ExpenditureService.createExpenditure($scope.expenditure,
          function(){
            console.log("Expenditure created");
            $rootScope.successMessageE = true;
            $location.path('/expenditures');
          }, function(){
            $rootScope.successMessageE = false;
            console.log("Could not create expense");
          });
      } else {
        console.log("Fill in all input fields");
      }
    };

    if ($stateParams.id) {
      $scope.currentDate = new Date();
      $scope.update = true;
      ExpenditureService.getExpenditure($stateParams.id,
        function(data){
          $scope.expenditure = data;
          $scope.cleaningMaterial = data.cleaningMaterial;
          $scope.purchasedDate = stringToDate(data.purchasedDate);
          $scope.depreciationDate = stringToDate(data.depreciationDate);
        }, function(){
          $scope.expenditure = {};
          console.log("Could not get expenditure");
          $scope.update = false;
          $location.path('/expenditures');
        });

      $scope.back = function(){
        $location.path('/expenditures');
      }

      $scope.updateExpenditure = function(){
        $scope.submitCreateExpenditureForm = true;
        if($scope.expenditure.quantity && $scope.depreciationDate){
          $scope.expenditure.depreciationDate = dateToString($scope.depreciationDate);
          ExpenditureService.updateExpenditure($stateParams.id, $scope.expenditure,
          function(){
            console.log("Expenditure updated");
            $rootScope.successMessageE = true;
            $location.path('/expenditures');
          }, function(){
            $rootScope.successMessageE = false;
            console.log("Fill all input fields");
          });
        }
      };
    }

    $scope.viewExpenditure = function(id){
      $location.path('/expenditures/' + id);
    };


  }]);