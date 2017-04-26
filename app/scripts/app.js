'use strict';

/**
 * @ngdoc overview
 * @name pressingUiApp
 * @description
 * # pressingUiApp
 *
 * Main module of the application.
 */
angular
  .module('pressingUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'gridshore.c3js.chart',
    'angularUtils.directives.dirPagination'
  ])
  .config(['$stateProvider','$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // Set headers and enable CORS
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.get = {};
    $httpProvider.defaults.headers.delete = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('dashboard',{
        url: '/dashboard',
        templateUrl:'views/main/dashboard.html',
        controller: 'DashboardCtrl',
        resolve:{
                  readyItems: function(TransactionService) {
                    return TransactionService.getTransactionbyStatus("clean");
                  },
                  unreadyItems: function(TransactionService) {
                    return TransactionService.getTransactionbyStatus("dirty");
                  }
                }
      })
      .state('deposited_item', {
        url: '/deposited_items',
        templateUrl: 'views/items/depositItem.html',
        controller: 'DepositedItemCtrl'
      })
      .state('item', {
        url: '/items',
        templateUrl: 'views/items/item.html',
        controller: 'ItemCtrl'
      })
      .state('updateDepositeItem', {
        url: '/deposited_items/update/:id',
        templateUrl: 'views/items/updateDepositedItem.html',
        controller: 'ManageDepositedItemCtrl'
      })
      .state('createDepositeItem', {
        url: '/deposited_items/create',
        templateUrl: 'views/items/updateDepositedItem.html',
        controller: 'ManageDepositedItemCtrl'
      })
      .state('viewDepositeItem', {
        url: '/deposited_items/view/:id',
        templateUrl: 'views/items/viewDepositedItem.html',
        controller: 'ViewDepositedItemCtrl'
      })
      .state('manageItem', {
        url: '/items/:id',
        templateUrl: 'views/items/manageItem.html',
        controller: 'ManageItemCtrl'
      })
      .state('cleaningMaterial', {
        url: '/cleaning_materials',
        templateUrl: 'views/cleaningMaterials/cleaningMaterial.html',
        controller: 'CleaningMaterialCtrl'
      })
      .state('manageCleaningMaterial', {
        url: '/cleaning_materials/:id',
        templateUrl: 'views/cleaningMaterials/manageCleaningMaterial.html',
        controller: 'ManageCleaningMaterialCtrl'
      })
      .state('expenditure', {
        url: '/expenditures',
        templateUrl: 'views/cleaningMaterials/expenditure.html',
        controller: 'ExpenditureCtrl'
      })
      .state('manageExpenditure', {
        url: '/expenditures/:id',
        templateUrl: 'views/cleaningMaterials/manageExpenditure.html',
        controller: 'ManageExpenditureCtrl'
      })
      .state('user', {
        url: '/users',
        templateUrl: 'views/users/user.html',
        controller: 'UserCtrl'
      })
      .state('manageUser', {
        url: '/users/:id',
        templateUrl: 'views/users/manageUser.html',
        controller: 'ManageUserCtrl',
        resolve:{
                  allRoles: function($http, $cookieStore) {
                    var loggedInUser = $cookieStore.get('userData');
                    var config = {headers:  {
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + loggedInUser.token
                      }
                    };
                    return $http.get( 'http://localhost:8080/api/v1/roles', config);
                  }
                }
      })
      .state('customer', {
        url: '/customers',
        templateUrl: 'views/customers/customer.html',
        controller: 'CustomerCtrl'
      })
      .state('manageCustomer', {
        url: '/customers/:id',
        templateUrl: 'views/customers/manageCustomer.html',
        controller: 'ManageCustomerCtrl'
      })
      .state('role', {
        url: '/roles',
        templateUrl: 'views/roles/role.html',
        controller: 'RoleCtrl'
      })
      .state('manageRole', {
        url: '/roles/:id',
        templateUrl: 'views/roles/manageRole.html',
        controller: 'ManageRoleCtrl',
        resolve:{
                  allPermissions: function($http, $cookieStore) {
                    var loggedInUser = $cookieStore.get('userData');
                    var config = {headers:  {
                        'Content-Type': 'application/json',
                        'Authorization': "Basic " + loggedInUser.token
                      }
                    };
                    return $http.get( 'http://localhost:8080/api/v1/permissions', config);
                  }
                }
      })
      .state('permission', {
        url: '/permissions',
        templateUrl: 'views/permissions/permission.html',
        controller: 'PermissionCtrl'
      })
      .state('managePermission', {
        url: '/permissions/:id',
        templateUrl: 'views/permissions/managePermission.html',
        controller: 'ManagePermissionCtrl'
      })
      .state('notification', {
        url: '/notification',
        templateUrl: 'views/main/notification.html',
        controller: 'NotificationCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/main/profile.html',
        controller: 'ProfileCtrl'
      });
      $urlRouterProvider.otherwise('/login');
  }])
  .run(function($rootScope, $location, $cookieStore, $http){
    $rootScope.location = $location;

    /*Toggling side bar*/
    $rootScope.showSideBar = false;
    $rootScope.toggleSideBar = function(){
      return $rootScope.showSideBar;
    }

    /*Side bar menu acitivator*/
    $rootScope.isActive = function (viewLocation) {
      if ($location.path().search(viewLocation) >= 0) {
        return true;
      }
      return false;
    };

    /*Logout*/
    $rootScope.logout = function(){
      $cookieStore.remove('userData');
      $cookieStore.remove('notification');
      $location.path('/login');
    };

    /* Determine which menu to display on side nav*/
    $rootScope.sideBar = function (){
      if( ($location.path().search('/users') >= 0) || ($location.path().search('/customers') >= 0) ||
          ($location.path().search('/roles') >= 0) || ($location.path().search('/permissions') >= 0)) {
            return 'administration';
      }
    };
  });
