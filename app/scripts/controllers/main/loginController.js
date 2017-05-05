'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .controller('LoginCtrl', [ '$scope', 'AuthenticationService', '$http', 'Role', '$location',
    function ($scope, AuthenticationService, $http, Role, $location ) {
  		$scope.loginCredentials = {};
  		$scope.authenticationFailed = false;
  		$scope.load = false;
  		$scope.submitted = false

  		$scope.login = function () {
  			$scope.loginCredentials.username = $scope.username;
  			$scope.loginCredentials.password = $scope.password;
  			$scope.submitted = true;

  			if($scope.loginCredentials.username && $scope.loginCredentials.password) {
  				$scope.load = true;
  				AuthenticationService.login($scope.loginCredentials,
  					/* Successful login */
  					function (data){
              var roles = [];
              for(var i=0; i<data.roles.length; i++){
                roles[i] = data.roles[i].name;
              }
              Role.setRoles(roles);
  						$location.path('/dashboard');
  					},
  					/* Unsuccessfullogin */
  					function (response){
  						console.log(response);
  						$scope.load = false;
  						$scope.authenticationFailed = true;
  						$scope.submitted = false;
  				});
  			}

  		};
  }]);