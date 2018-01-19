(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.service:analyticsService
     * @description
     * # analyticsService
     * Service of the app
     */

    angular
        .module('analytics')
        .factory('AnalyticsService', Analytics);
        // Inject your dependencies as .$inject = ['$http', 'someSevide'];
        // function Name ($http, someSevide) {...}

        Analytics.$inject = ['$http'];

        function Analytics ($http) {

        }

})();
