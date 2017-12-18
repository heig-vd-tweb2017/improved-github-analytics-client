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
		.module('ang-modular')
		.controller('HomeCtrl', Home);

	Home.$inject = ['homeService'];

	
	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Home(homeService) {
		/*jshint validthis: true */
		var vm = this;		

		vm.repoGithub = {
			repo : 'https://github.com/<organisation>/<repo>',
			dates :  ['1 an', '6 mois', '3 mois','1 mois','2 semaines','1 semaine'],
			groupments :  ['1 an', '6 mois', '3 mois','1 mois','2 semaines','1 semaine'],
		}
	}	
})();
