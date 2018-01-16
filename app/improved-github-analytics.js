(function () {
	'use strict';

	/**
	* @ngdoc index
	* @name app
	* @description
	* # app
	*
	* Main module of the application.
	*/
	angular.module('improved-github-analytics', [
		'ngResource',
		'ngAria',
		'ui.bootstrap',
		'ngMaterial',
		'ngMdIcons',
		'ngMessages',
		'ngCookies',
		'ngAnimate',
		'ngTouch',
		'ngSanitize',
		'ui.router',
		'home',
	]).run(setupSocketIO);

	function setupSocketIO(socketio, $rootScope) {
		console.log("setup socket io factory");
		console.log(socketio);
		socketio.init();
	}
})();
