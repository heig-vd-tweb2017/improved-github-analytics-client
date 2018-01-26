(function () {
    'use strict';

    /**
    * @ngdoc function
    * @name app.service:homeService
    * @description
    * # homeService
    * Service of the app
    */
    angular.module('improved-github-analytics')
        .factory('HomeService', Home);

    Home.$inject = ['$http'];

    function Home($http) {
        return null;
    }

})();
