(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:apiService
	 * @description
	 * # apiService
	 * Service of the app
	 */

  	angular
		.module('api')
		.factory('ApiService', Api);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Api.$inject = ['$http'];

		function Api ($http) {

			return {
				numberOfIssuesByGroupingResults: null,
				numberOfIssuesByAuthorsResults: null,
				numberOfIssuesByAuthorsOldResults: null,
			};
		}

})();
