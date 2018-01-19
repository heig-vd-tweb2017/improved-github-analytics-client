(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:apiCtrl
	* @description
	* # apiCtrl
	* Controller of the app
	*/

  	angular
		.module('api')
		.controller('ApiCtrl', Api);

		Api.$inject = ['$scope', 'ApiService', 'mySocket'];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function Api($scope, ApiService, mySocket) {

			/*jshint validthis: true */
			var vm = this;

			$scope.filters = {
				gitHubRepository: null,
				urlError: false,
				dataAge: {
					availableOptions: [
						{ id: '0', name: 'One day', value: 1, unit: 'day' },
						{ id: '1', name: 'One week', value: 1, unit: 'week' },
						{ id: '1', name: 'Two weeks', value: 2, unit: 'week' },
						{ id: '2', name: 'One month', value: 1, unit: 'month' },
						{ id: '3', name: 'Three months', value: 3, unit: 'months' },
						{ id: '4', name: 'Six months', value: 6, unit: 'months' },
						{ id: '5', name: 'One year', value: 1, unit: 'year' },
						{ id: '6', name: 'Three years', value: 3, unit: 'years' },
						{ id: '7', name: 'Ten years', value: 10, unit: 'years' },
					],
					selectedOption: { id: '0', name: 'One day', value: 1, unit: 'day' },
				},
				dataGrouping: {
					availableOptions: [
						{ id: '0', name: 'Group by days', value: 'days' },
						{ id: '1', name: 'Group by weeks', value: 'weeks' },
						{ id: '2', name: 'Group by months', value: 'months' },
						{ id: '3', name: 'Group by years', value: 'years' },
					],
					selectedOption: { id: '0', name: 'Group by days', value: 'days' },
				},
			}

			$scope.query = function() {
				const filters = $scope.filters;

				const { gitHubRepository, dataAge, dataGrouping } = filters;

				if (gitHubRepository == null) {
					filters.urlError = true;
				} else {
					filters.urlError = false;

					const filledGithubRepository = gitHubRepository.replace('https', 'http').replace('http://github.com/', '');
					const infos = filledGithubRepository.split('/');

					const owner = infos[0];
					const repo = infos[1];
			
					const queryNumberOfIssuesByAuthors = {
					  owner: owner,
					  repo: repo,
					  dataAgeValue: dataAge.selectedOption.value,
					  dataAgeUnit: dataAge.selectedOption.unit,
					};

					const queryNumberOfIssuesByGrouping = {
						owner: owner,
						repo: repo,
						dataAgeValue: dataAge.selectedOption.value,
						dataAgeUnit: dataAge.selectedOption.unit,
						dataAgeGrouping: dataGrouping.selectedOption.value,
					};
			  
					mySocket.emit('number-of-issues-by-authors', queryNumberOfIssuesByAuthors);	
					mySocket.emit('number-of-issues-by-grouping', queryNumberOfIssuesByGrouping);
				}
			};

            mySocket.on('number-of-issues-by-authors-results', function (results) {
				console.log(results);
				if (results.error != null) {
					$scope.filters.urlError = true;
				} else {
					$scope.filters.urlError = false;
					ApiService.numberOfIssuesByAuthorsResults = results.data;
				}
			});
			
			mySocket.on('number-of-issues-by-authors-old-results', function (results) {
				if (results.error != null) {
					$scope.filters.urlError = true;
				} else {
					$scope.filters.urlError = false;
					ApiService.numberOfIssuesByAuthorsOldResults = results.data;
				}
            });

            mySocket.on('number-of-issues-by-grouping-results', function (results) {
				if (results.error != null) {
					$scope.filters.urlError = true;
				} else {
					$scope.filters.urlError = false;
					ApiService.numberOfIssuesByGroupingResults = results.data;
				}
            });
		}
})();
