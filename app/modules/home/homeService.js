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
			lineChartOI : [ [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ],
			lineChartCI : [ [65, 59, 80, 81, 56, 12, 40, 76, 98, 10, 28, 9, 76], ],
			lineChartI : [ [10 ,2, 32, 4, 5, 32, 7, 8, 86, 10] ],
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

		var url = 'urlServer';
		var repo = 'repo';
		var owner = 'owner';
		var entpoint1 = 'number-of-issues-by-grouping';
		var entpoint2 = 'number-of-issues-by-authors';

		function getData(repo,period,groupment){
			/* Ici doit se faire la requête au serveur */
			const request = repo.replace('https', 'http').replace('http://github.com/', '');

			const infos = request.split('/');
			const owner = infos[0];
			const repo = infos[1];


			$http({
				method: 'GET',
				url :`${url}/'${entpoint1}/${owner}/${repo}/${period}/${groupment}`
			}).then(function successCallback(response) {
				var resp = response.data;
				console.log(resp);
				// this callback will be called asynchronously
				// when the response is available
			}, function errorCallback(response) {
				console.log('error');
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
			return data;
		}

	}

})();
