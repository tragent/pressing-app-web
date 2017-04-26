'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:PaymentMethodService
 * @description
 * # PaymentMethodService
 * Service of the pressingUiApp
 */
angular.module('pressingUiApp')
	.factory('PaymentMethodService', ['$http', '$cookieStore', function($http, $cookieStore) {
    var BASE_URL = 'http://localhost:8080/api/v1';
    var methodUrl = '/paymentmethods';
    var loggedInUser = $cookieStore.get('userData');
    var config = {headers:  {
        'Content-Type': 'application/json',
        'Authorization': "Basic " + loggedInUser.token
      }
    };

    return {
      getAllPaymentMethods: function(onSuccess, onFailure){
        $http.get( BASE_URL + methodUrl, config)
        .then(function(response) {
          onSuccess(response.data);
        }, function(response) {
          onFailure(response.data);
        });
      }
    };

  }]);
