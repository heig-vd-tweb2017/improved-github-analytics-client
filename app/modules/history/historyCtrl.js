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
    .controller('historyCtrl', History);

  History.$inject = ['socketio', '$scope', '$window', 'historyService'];

  /*
		* recommend
		* Using function declarations
		* and bindable members up top.
		*/

  function History(socketio, $scope, $window, historyService) {
    /* jshint validthis: true */
	const vm = this;
	
	socketio.on('number-of-issues-by-authors-old-results', (data) => {
		console.log('Results for "number-of-issues-by-authors-old-results" are: ');
		console.log(data);
		historyService.setData(data.data);
	});

	vm.history = historyService.getData();
	vm.repo = historyService.getRepo();

    vm.refresh = function () {
      console.log('DATA REFRESH');
      const vart = historyService.getData();
      console.log(vart);
	};

  }
}());
