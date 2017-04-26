'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:CleaningMaterialService
 * @description
 * # CleaningMaterialService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('CleaningMaterialService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var materialUrl = '/materials';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllCleaningMaterials: function(onSuccess, onFailure){
        $http.get( BASE_URL + materialUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getCleaningMaterial: function(materialId, onSuccess, onFailure){
        $http.get( BASE_URL + materialUrl + '/' + materialId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createCleaningMaterial: function(material, onSuccess, onFailure){
        $http.post( BASE_URL + materialUrl, material, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      updateCleaningMaterial: function(materialId, material, onSuccess, onFailure){
        $http.put( BASE_URL + materialUrl + '/' + materialId, material, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      }
    };

  }]);
