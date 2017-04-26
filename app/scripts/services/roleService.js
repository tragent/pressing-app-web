'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:RoleService
 * @description
 * # RoleService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('RoleService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var roleUrl = '/roles';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllRoles: function(onSuccess, onFailure){
        $http.get( BASE_URL + roleUrl, config)
        .then(function(response) {
          if(onSuccess){
            onSuccess(response.data);
          } else {
            return response.data;
          }
        }, function(response) {
          if(onFailure) {
            onFailure(response.data);
          }
        });
      },
      getRole: function(rolesId, onSuccess, onFailure){
        $http.get( BASE_URL + roleUrl + '/' + rolesId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createRole: function(role, onSuccess, onFailure){
        $http.post( BASE_URL + roleUrl, role, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      },
      putRole: function(rolesId, role, onSuccess, onFailure){
        $http.put( BASE_URL + roleUrl + '/' + rolesId, role, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      }
    };

  }]);
