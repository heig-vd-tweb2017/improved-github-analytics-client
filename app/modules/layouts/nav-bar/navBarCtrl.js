(function () {
    'use strict';

    /**
    * @ngdoc function
    * @name app.controller:NavBarCtrl
    * @description
    * # NavBarCtrl
    * Controller of the app
    */
    angular
        .module('improved-github-analytics')
        .controller('NavBarCtrl', NavBar);

    NavBar.$inject = ['homeService', 'MenuService'];

    /*
    * recommend
    * Using function declarations
    * and bindable members up top.
    */
    function NavBar(homeService, MenuService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = "Home";

        vm.menu = MenuService.listMenu();
    }
})();
