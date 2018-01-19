(function() {
	'use strict';

	/**
	 * @ngdoc index
	 * @name app
	 * @description
	 * # app
	 *
	 * Main modules of the application.
	 */
	angular.module('improved-github-analytics', [
		'ngResource',
		'ngAria',
		'ui.bootstrap',
		'ngTouch',
		'ui.router',
		'btford.socket-io',
		'chart.js',
		'home',
		'history',
		'analytics',
		'api',
	]).factory('mySocket', function (socketFactory) {
	  	var myIoSocket = io.connect('http://improved-github-analytics-srv.herokuapp.com/');
	  
	  	var mySocket = socketFactory({
			ioSocket: myIoSocket
	  	});
	
	  	return mySocket;
	});

})();
