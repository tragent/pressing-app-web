'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:CustomerService
 * @description
 * # CustomerService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('CustomerService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var customerUrl = '/customers';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllCustomers: function(onSuccess, onFailure){
        $http.get( BASE_URL + customerUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getActiveCustomers: function(isActive, onSuccess, onFailure){
        $http.get( BASE_URL + customerUrl + '?active=' + isActive, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getCustomer: function(customerId, onSuccess, onFailure){
        $http.get( BASE_URL + customerUrl + '/' + customerId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createCustomer: function(customer, onSuccess, onFailure){
        $http.post( BASE_URL + customerUrl, customer, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      updateCustomer: function(customerId, customer, onSuccess, onFailure){
        $http.put( BASE_URL + customerUrl + '/' + customerId, customer, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      }
    };

  }]);
