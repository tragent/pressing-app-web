'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:ExpenditureService
 * @description
 * # ExpenditureService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('ExpenditureService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var expenditureUrl = '/expenditures';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllExpenditures: function(onSuccess, onFailure){
        $http.get( BASE_URL + expenditureUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getExpenditure: function(expenditureId, onSuccess, onFailure){
        $http.get( BASE_URL + expenditureUrl + '/' + expenditureId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createExpenditure: function(expense, onSuccess, onFailure){
        $http.post( BASE_URL + expenditureUrl, expense, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      updateExpenditure: function(expenditureId, expense, onSuccess, onFailure){
        $http.put( BASE_URL + expenditureUrl + '/' + expenditureId, expense, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      }
    };

  }]);
