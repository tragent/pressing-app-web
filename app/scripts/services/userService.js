'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:UserService
 * @description
 * # UserService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
  .factory('UserService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var userUrl = '/users';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllUsers: function(onSuccess, onFailure){
        $http.get( BASE_URL + userUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getUser: function(userId, onSuccess, onFailure){
        $http.get( BASE_URL + userUrl + '/' + userId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createUser: function(user, onSuccess, onFailure){
        $http.post( BASE_URL + userUrl, user, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      },
      updateUser: function(userId, user, onSuccess, onFailure){
        $http.put( BASE_URL + userUrl + '/' + userId, user, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      }
    };

  }]);
