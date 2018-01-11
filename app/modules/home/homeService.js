(function () {
	'use strict';
  /**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

  angular.module('ang-modular')
    .factory('homeService', homeService);

  homeService.$inject = ['$http', '$rootScope', '$window'];

  function homeService($http) {
    return {
    };
  }
}());
