angular.module('pressingUiApp')
  .directive('hasRole', [ 'Role', function (Role) {
    return {
      link: function($scope, element, attrs) {
        if(typeof attrs.hasRole !== 'string') {
        	throw 'hasRole value must be a string';
        }
        var value = attrs.hasRole.trim();
        var notRoleFlag = value[0] === '!';
        if(notRoleFlag) {
        	value = value.slice(1).trim();
        }

        function toggleVisibilityBasedOnPermission() {
        	var hasRole = Role.hasRole(value);
        	if(hasRole && !notRoleFlag || !hasRole && notRoleFlag) {
        		element[0].style.display = 'block';
        	} else {
        		element[0].style.display = 'none';
        	}
        }

        toggleVisibilityBasedOnPermission();
        $scope.$on('roleChanged', toggleVisibilityBasedOnPermission);
      }
    };
  }]);