'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ItemService
 * @description
 * # ItemService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('ItemService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var itemUrl = '/items';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllItems: function(onSuccess, onFailure){
        $http.get( BASE_URL + itemUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getItem: function(itemId, onSuccess, onFailure){
        $http.get( BASE_URL + itemUrl + '/' + itemId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createItem: function(item, onSuccess, onFailure){
        $http.post( BASE_URL + itemUrl, item, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      },
      updateItem: function(itemId, item, onSuccess, onFailure){
        $http.put( BASE_URL + itemUrl + '/' + itemId, item, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      }
    };

  }]);
