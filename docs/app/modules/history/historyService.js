(function() {
	'use strict';
  /**
	 * @ngdoc function
	 * @name app.service:historyService
	 * @description
	 * # historyService
	 * Service of the app
	 */

  	angular
    .module('improved-github-analytics')
    .factory('historyService', History);
  // Inject your dependencies as .$inject = ['$http', 'someSevide'];
  // function Name ($http, someSevide) {...}

  History.$inject = [];

  function History() {
    // Sera rempli par le homeCtrl au moment de la recherche sur github
    let dataHistory =[];/*
		[{
			age: "2 months",
			date: "2018-01-11T09:24:58.091Z",
			end: "2017-11-11T00:00:00.000Z",
			owner: "google",
			repo: "WebFundamentals",
			start: "2018-01-11T00:00:00.000Z"
		}
		];*/

	let repo =  'https://github.com/<owner>/<repo>';


    return {
      getData: getData,
	    setData : setData,
	    getRepo : getRepo,
	    setRepo : setRepo
  	};
	
	function setRepo(owner, repo2){
		repo = 'https://github.com/' + owner + '/' + repo2;
	}
	function getRepo(){
		return repo;
	}
    function setData(data) {
		//dataHistory = dataHistory.concat(data);
		dataHistory = data;
    }
    function getData() {
	  return dataHistory;
    }
  }
}());
