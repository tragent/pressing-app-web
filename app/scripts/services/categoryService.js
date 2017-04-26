'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:CategoryService
 * @description
 * # CategoryService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('CategoryService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var categoryUrl = '/categories';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllItemCategories: function(onSuccess, onFailure){
        $http.get( BASE_URL + categoryUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      }
    };

  }]);
