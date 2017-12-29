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

	homeService.$inject = ['$http'];

	function homeService($http) {

		/* Data récupérés sur le serveur */
		var data = {
			lineChartOI : [ [1,2,3,4,5,6,7,8,9,10] ],
			lineChartCI : [ [65, 59, 80, 81, 56, 55, 40], ],
			lineChartI : [ [10 ,2,32,4,5,32 ,7,8,86,10] ],
			BarChartOI : {
				series : ['Jean', 'Pierre', 'Jack'],
				data : [ [32], [56], [4], ],
			},
			BarChartCI : {
				series : ['Jean', 'Pierre', 'Jack'],
				data : [ [2], [3], [1], ],
			},
			BarChartI : {
				series : ['Jean', 'Pierre', 'Jack'],
				data : [ [3], [5], [1], ],
			},
		};

		return {
			getData : getData
		};

		function getData(){
			/* Ici doit se faire la requête au serveur */
			return data;
		}

	}

})();
