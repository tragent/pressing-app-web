'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:TransactionService
 * @description
 * # TransactionService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('TransactionService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var transactionsUrl = '/customertransactions';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllTransactions: function(onSuccess, onFailure){
        $http.get( BASE_URL + transactionsUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getTransaction: function(transactionId, onSuccess, onFailure){
        $http.get( BASE_URL + transactionsUrl + '/' + transactionId, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getTransactionbyDueDate: function(date, onSuccess, onFailure){
        var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" 00:00:00";
        $http.get( BASE_URL + transactionsUrl + '?dueDate=' + dateString, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      getTransactionbyStatus: function(status){
        return $http.get( BASE_URL + transactionsUrl + '?status=' + status, config);
      },
      getTransactionsPastDueDate: function(date, onSuccess, onFailure){
        var dateString = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()+" 00:00:00";
        $http.get( BASE_URL + transactionsUrl + '?greatestDueDate=' + dateString, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      },
      createNewTransaction: function(transaction, onSuccess, onFailure){
        $http.post( BASE_URL + transactionsUrl, transaction, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      },
      depositPayment: function(transactionId, payment, onSuccess, onFailure){
        $http.post( BASE_URL + transactionsUrl + '/' + transactionId + '/' + 'payments', payment, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      },
      updateTransaction: function(transactionId, transaction, onSuccess, onFailure){
        $http.put( BASE_URL + transactionsUrl + '/' + transactionId, transaction, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          console.log(response);
          onFailure(response.data);
        });
      }
    };

  }]);
