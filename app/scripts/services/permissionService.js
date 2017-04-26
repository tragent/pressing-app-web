'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:PermissionService
 * @description
 * # PermissionService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('PermissionService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var permissionUrl = '/permissions';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllPermissions: function(onSuccess, onFailure){
        $http.get( BASE_URL + permissionUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getPermission: function(permissionId, onSuccess, onFailure){
        $http.get( BASE_URL + permissionUrl + '/' + permissionId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createPermission: function(permission, onSuccess, onFailure){
        $http.post( BASE_URL + permissionUrl, permission, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      updatePermission: function(permissionId, permission, onSuccess, onFailure){
        $http.put( BASE_URL + permissionUrl + '/' + permissionId, permission, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      }
    };

  }]);
