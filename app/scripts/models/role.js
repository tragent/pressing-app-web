'use strict';

/**
 * @ngdoc function
 * @name pressingUiApp.controller:Role
 * @description
 * # Role
 * Controller of the pressingUiApp
 */
angular.module('pressingUiApp')
  .factory('Role', [ '$rootScope', '$cookieStore', function ($rootScope, $cookieStore) {
    var userRole = [];
    if($cookieStore.get('userRole')) {
    	userRole = $cookieStore.get('userRole')
    }
    return {
      setRoles: function(roles) {
        userRole = roles;
        $cookieStore.put('userRole', roles);
        $rootScope.$broadcast('rolesChanged');
      },
      hasRole: function(role) {
      	role = role.trim();
      	for (var i = userRole.length - 1; i >= 0; i--) {
      		return (userRole[i] == role?true:false);
      	}
      }
    };
  }]);