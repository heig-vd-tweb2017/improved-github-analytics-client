'use strict';
/**
 * @ngdoc function
 * @name app.route:historyRoute
 * @description
 * # historyRoute
 * Route of the app
 */

angular.module('improved-github-analytics')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home.history', {
        url: '/history',
        templateUrl: 'app/modules/history/history.html',
        controller: 'historyCtrl',
        controllerAs: 'vm',
      });
  }]);
