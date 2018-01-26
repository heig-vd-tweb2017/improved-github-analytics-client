(function () {
    'use strict';

    /**
    * @ngdoc function
    * @name app.controller:HomeCtrl
    * @description
    * # HomeCtrl
    * Controller of the app
    */

    angular
        .module('improved-github-analytics')
        .controller('HomeCtrl', Home);

    Home.$inject = ['HomeService'];

    /*
    * recommend
    * Using function declarations
    * and bindable members up top.
    */
    function Home(HomeService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = "Improved GitHub Anaytics";

    }

})();
