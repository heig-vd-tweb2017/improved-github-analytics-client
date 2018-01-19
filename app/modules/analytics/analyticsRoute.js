'use strict';

/**
 * @ngdoc function
 * @name app.route:analyticsRoute
 * @description
 * # analyticsRoute
 * Route of the app
 */

angular.module('analytics')
	.config(['$stateProvider', function ($stateProvider) {
        
        $stateProvider
            .state('analytics', {
                url:'/analytics',
                templateUrl: 'app/modules/analytics/analytics.html',
                controller: 'AnalyticsCtrl',
                controllerAs: 'vm'
            });
        
    }]);
