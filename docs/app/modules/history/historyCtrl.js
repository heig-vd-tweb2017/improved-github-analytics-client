(function() {
    'use strict';

    /**
    * @ngdoc function
    * @name app.controller:historyCtrl
    * @description
    * # historyCtrl
    * Controller of the app
    */

    angular
        .module('history')
        .controller('HistoryCtrl', History);

        History.$inject = ['$scope', 'ApiService'];

        /*
        * recommend
        * Using function declarations
        * and bindable members up top.
        */

        function History($scope, ApiService) {
            /*jshint validthis: true */
            var vm = this;

            $scope.apiService = ApiService;

        }

})();
