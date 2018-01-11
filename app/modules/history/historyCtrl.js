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
		.module('ang-modular')
		.controller('HistoryCtrl', History);

		History.$inject = [];

		/*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

		function History() {
			/*jshint validthis: true */
			var vm = this;

			vm.history = [
					{ id: '1', title: 'Date de rerche', content :['1 an' ]},
					{ id: '1', title: 'Date de rerche', content :['1 an' ]},
					{ id: '1', title: 'Date de rerche', content :['1 an' ]},
					{ id: '1', title: 'Date de rerche', content :['1 an' ]},
					{ id: '1', title: 'Date de rerche', content :['1 an' ]},
					{ id: '1', title: 'Date de rerche', content :['1 an' ]},
			];

		}

})();
