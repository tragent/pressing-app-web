'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ManageItemCtrl
 * @description
 * # ManageItemCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('ManageItemCtrl', [ '$http', '$scope', '$rootScope', 'CategoryService', 'ItemService', '$location', '$stateParams',
    function ($http, $scope, $rootScope, CategoryService, ItemService, $location, $stateParams) {
    $scope.categories = {};
    $scope.item = {};
    $scope.submitCreateItemForm = false;
    $scope.update = false;

    CategoryService.getAllItemCategories(
      function(data){
        $scope.categories=data;
        $scope.item.category = data[1];
      }, function(){
        console.log("Could not get categories");
        $scope.categories = {};
      });

    $scope.createItem = function(){
      $scope.submitCreateItemForm = true;
      if ($scope.item.name && $scope.item.category && $scope.item.cost) {
        ItemService.createItem($scope.item,
          function(){
            console.log("Item created");
            $rootScope.successMessageI = true;
            $location.path('/items');
          }, function(){
            $rootScope.successMessageI = false;
            console.log("Could not create item");
          });
      } else {
        console.log("Fill all input fields");
      }
    };

    if ($stateParams.id) {
      $scope.update = true;
      ItemService.getItem($stateParams.id,
        function(data){
          $scope.item = data;
          $scope.currentItem = data.category;
        }, function(){
          console.log("Could not get item details");
          $location.path('/items');
        });

      $scope.back = function(){
        $location.path('/items');
      }

      $scope.updateItem = function(){
        $scope.submitCreateItemForm = true;
        if ($scope.item.name && $scope.item.category && $scope.item.cost) {
          ItemService.updateItem($stateParams.id, $scope.item,
            function(){
              console.log("Item updated");
              $rootScope.successMessageI = true;
              $location.path('/items');
            }, function(){
              $rootScope.successMessageI = false;
              console.log("Could not update item");
            });
        } else {
          console.log("Fill all input fields")
        }
      };
    }

  }]);