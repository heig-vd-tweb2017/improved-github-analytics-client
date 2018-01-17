/*!
* improved-github-analytics - v0.0.1 - MIT LICENSE 2018-01-17. 
* @author Ludovic Delafontaine & Michela Zucca
*/
(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.module:historyModule
	 * @description
	 * # historyModule
	 * Module of the app
	 */

  	angular.module('history', []);

})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.module:homeModule
	* @description
	* # homeModule
	* Module of the app
	*/

	angular.module('home', ['chart.js']);

})();

'use strict';
/**
 * @ngdoc function
 * @name app.route:historyRoute
 * @description
 * # historyRoute
 * Route of the app
 */

angular.module('improved-github-analytics')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('home.history', {
        url: '/history',
        templateUrl: 'app/modules/history/history.html',
        controller: 'historyCtrl',
        controllerAs: 'vm',
      });
  }]);

/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/
angular.module('improved-github-analytics')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider

      .state('home', {
        url: '',
        abstract: true,
        templateUrl: 'app/modules/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm',
      })
      .state('home.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/home/dashboard.html',
      });
  }]);

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
    .module('improved-github-analytics')
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
		historyService.setData(data.data);
	});

	vm.history = historyService.getData();
	vm.repo = historyService.getRepo();

  }
}());

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
    .module('improved-github-analytics')
    .controller('HomeCtrl', Home);

  Home.$inject = ['socketio', '$scope', '$window', 'historyService'];

  function Home(socketio, $scope, $window, historyService) {
    /* jshint validthis: true */
    const vm = this;

    /* Data des BarChart, configuration par défaut */
    vm.seriesBarChartOI = ['Second', 'First', 'Third'];
    vm.dataBarChartOI = [[2], [3], [1]];
    vm.labelsChartOI = ['Second', 'First', 'Third'];
    vm.seriesBarChartCI = ['Second', 'First', 'Third'];
    vm.labelsChartCI = ['Second', 'First', 'Third'];
    vm.dataBarChartCI =  [[2], [3], [1]];
    vm.seriesBarChartI = ['Second', 'First', 'Third'];
    vm.dataBarChartI =  [[2], [3], [1]];
    vm.labelsChartI = ['Second', 'First', 'Third'];
    /* Data des lineChart, configuration par défaut */
    vm.dataLineChartOI = [[1, 2, 0, 4, 10, 20, 8]];
    vm.dataLineChartCI = [[40, 32, 93, 81, 4, 4, 7]];
    vm.dataLineChartI = [[10, -30, 2, 51, 0, -10, 20]];
    /* Tableau des meilleurs */
    vm.tableBestOI = [];
    vm.tableBestCI = [];
    /* Nessage d'erreur du serveur */
    vm.error = '';

     /* Formulaire */
     vm.form = {
      repoGitHub: {
        selectedRepo: 'https://github.com/<owner>/<repo>',
      },
      period: {
        availableOptions: [
          { id: '0', name: '> 1 year', value: '10', unit: 'years'},
          { id: '1', name: '1 year', value: '1', unit: 'years' },
          { id: '2', name: '6 months', value: '6', unit: 'months' },
          { id: '3', name: '3 months', value: '2', unit: 'months' },
          { id: '4', name: '1 months', value: '1', unit: 'months' },
          { id: '5', name: '1 week', value: '1', unit: 'week'},
          { id: '6', name: '1 day', value: '1', unit: 'day'},
        ],
        selectedOption: { id: '0', name: '> 1 year', value: '10', unit: 'years'}, // default option
      },
      groupment: {
        availableOptions: [
          { id: '1', name: 'years', value: 'years' },
          { id: '2', name: 'months', value: 'months' },
          { id: '3', name: 'weeks', value: 'weeks' },
          { id: '4', name: 'days', value: 'days' },
        ],
        selectedOption: { id: '1', name: 'years', value: 'years' }, // default option
      },

      /* Fonction appelée au clique du bouton search
        Utilise socket io pour récupérer les données */
      apply() {
        vm.error = '';
        const repoGithub = vm.form.repoGitHub.selectedRepo.replace('https', 'http').replace('http://github.com/', '');
        const infos = repoGithub.split('/');

        const ownerSelected = infos[0];
        const repoSelected = infos[1];

        const dataLine = {
          owner: ownerSelected,
          repo: repoSelected,
          dataAgeValue: vm.form.period.selectedOption.value,
          dataAgeUnit: vm.form.period.selectedOption.unit,
        };

        const dataBar = {
          owner: ownerSelected,
          repo: repoSelected,
          dataAgeValue: vm.form.period.selectedOption.value,
          dataAgeUnit: vm.form.period.selectedOption.unit,
          dataAgeGrouping: vm.form.groupment.selectedOption.value,
        };
        historyService.setRepo(ownerSelected, repoSelected);

        socketio.emit('number-of-issues-by-authors', dataLine);
        socketio.emit('number-of-issues-by-grouping', dataBar);
      },
    };

    /* évenements  */
    socketio.on('number-of-issues-by-authors-results', (data) => {
      vm.majChartBar(data.data.bestOpenedIssuesAuthors, data.data.bestClosedIssuesAuthors);
      
    });

    socketio.on('number-of-issues-by-grouping-results', (data) => {
      vm.majChartLine(data.data.issues);
    });

    socketio.on('number-of-issues-by-authors-old-results', (data) => {
      
        historyService.setData(data.data);
      
    });

    /** Traitement des données pour les barChart */
    vm.dataBarChartTraitment = function (dataTable) {
      const size = dataTable.length;
      const listTables = {};

      if (size >= 3) {
        listTables.series = [dataTable[1].author, dataTable[0].author, dataTable[2].author];
        listTables.data = [[dataTable[1].issues], [dataTable[0].issues], [dataTable[2].issues]];
        listTables.labels = ['Second', 'First', 'Third'];
      }
      if (size == 2) {
        listTables.series = [dataTable[1].author, dataTable[0].author];
        listTables.data = [[dataTable[1].issues], [dataTable[0].issues]];
        listTables.labels = ['Second', 'First'];
      }
      if (size == 1) {
        listTables.series = [dataTable[0].author];
        listTables.data = [[dataTable[0].issues]];
        listTables.labels = ['First'];
      }
      return listTables;
    };

    /* Mise à jour des barChart */
    vm.majChartBar = function (tabOpened, tabClosed) {
      const tabBestOpen = [];
      const tabBestClose = [];
      const tabBestAll = [];

      tabOpened.forEach((element) => {
        const bestOpen = {
          author: element.author,
          issues: element.openedIssues,
        };
        tabBestOpen.push(bestOpen);
      });

      tabClosed.forEach((element) => {
        const bestClose = {
          author: element.author,
          issues: element.closedIssues,
        };
        tabBestClose.push(bestClose);
      });

      const listOpen = vm.dataBarChartTraitment(tabBestOpen);

      vm.seriesBarChartOI = listOpen.series;
      vm.dataBarChartOI = listOpen.data;
      vm.labelsChartOI = listOpen.labels;

      const listClose = vm.dataBarChartTraitment(tabBestClose);

      vm.seriesBarChartCI = listClose.series;
      vm.dataBarChartCI = listClose.data;
      vm.labelsChartCI = listClose.labels;

      vm.tableBestOI = tabBestOpen;
      vm.tableBestCI = tabBestClose;
    };

    /** Mise à jour des lineChart */
    vm.majChartLine = function (tab) {
      let sommeOpen = 0;
      let sommeClose = 0;
      const diff = 0;

      // Reset les labels
      vm.lineChart.labels = [];

      // tableau temporaire pour la création du graphe
      const tabClosed = [];
      const tabOpened = [];
      const tabTendance = [];
      tab.forEach((element) => {
        const currentClose = element.closedIssues;
        const currentOpen = element.openedIssues;
        const newClose = currentClose + sommeClose;
        const newOpen = currentOpen + sommeOpen;
        sommeClose = newClose;
        sommeOpen = newOpen;

        const tend = (currentOpen - currentClose);

        vm.lineChart.labels.push(element.date);
        tabClosed.push(newClose);
        tabOpened.push(newOpen);
        tabTendance.push(tend);
      });

      // injecte dans les graphes
      vm.dataLineChartCI = [tabClosed];
      vm.dataLineChartOI = [tabOpened];
      vm.dataLineChartI = [tabTendance];
    };

    /* Configurations des linesChart */
    vm.lineChart = {
      series: ['issues'],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
      colors: [
        {
          backgroundColor: 'rgba(159,204,0, 0.2)',
          pointBackgroundColor: 'rgba(159,204,0, 1)',
          pointHoverBackgroundColor: 'rgba(159,204,0, 0.8)',
          borderColor: 'rgba(159,204,0, 1)',
          pointBorderColor: '#fff',
          pointHoverBorderColor: 'rgba(159,204,0, 1)',
        },
      ],
      onClick(points, evt) {
        console.log(points, evt);
      },
    };

    /* Configuration des BarChart */
    vm.BarChart = {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 10,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
        scales: {
          xAxes: [
            {
              barPercentage: 0.8,
              categoryPercentage: 1,
            },
          ],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              
            },
          }],
        },
      },
      colors: [
        {
          backgroundColor: 'rgba(192, 192, 192,0.3)',
          borderColor: 'rgba(192, 192, 192, 0.5)',
          hoverBackgroundColor: 'rgba(192, 192, 192, 0.9)',
        },
        {
          backgroundColor: 'rgba(255, 215, 0, 0.3)',
          borderColor: 'rgba(255, 215, 0, 0.5)',
          hoverBackgroundColor: 'rgba(255, 215, 0, 0.9)',
        },
        {
          backgroundColor: 'rgba(205, 127, 50, 0.3)',
          borderColor: 'rgba(205, 127, 50, 0.3)',
          hoverBackgroundColor: 'rgba(205, 127, 50, 0.9)',
        },
      ],
    };
    
  }
}());

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:LayoutCtrl
	* @description
	* # LayoutCtrl
	* Controller of the app
	*/

	angular
		.module('improved-github-analytics')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog ) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.changePassword = function () {
			$mdToast.show(
				$mdToast.simple()
				.content('Password clicked!')
				.position('top right')
				.hideDelay(2000)
			);
		};

		vm.changeProfile = function (ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'tabDialog.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true
			})
			.then(function(answer) {
				$mdToast.show(
					$mdToast.simple()
					.content('You said the information was "' + answer + '".')
					.position('top right')
					.hideDelay(2000)
				);

			}, function() {
				$mdToast.show(
					$mdToast.simple()
					.content('You cancelled the dialog.')
					.position('top right')
					.hideDelay(2000)
				);
			});

			function DialogController($scope, $mdDialog) {
				$scope.hide = function() {
					$mdDialog.hide();
				};

				$scope.cancel = function() {
					$mdDialog.cancel();
				};

				$scope.answer = function(answer) {
					$mdDialog.hide(answer);
				};
			}
		};


		vm.logOut = function () {

			alert('Implement your Function Here');
			// $cookies.put('dev_appserver_login', ' ');
			//$state.go('out', {}, {reload: true});

		};

		var originatorEv;
		vm.openMenu = function ($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:SidenavCtrl
	* @description
	* # SidenavCtrl
	* Controller of the app
	*/
	angular
		.module('improved-github-analytics')
		.controller('SidenavCtrl', SidenavCtrl)
		.controller('SettingsCtrl', SettingsCtrl);

	// Injecting Denpendencies

	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope'];
	SettingsCtrl.$inject = ['$mdBottomSheet'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function SidenavCtrl($mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.closeSidenav = function() {
			$mdSidenav('left').close();
		};

		// Close menu on small screen after click on menu item.
		// Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
		$scope.$on('$stateChangeSuccess', vm.closeSidenav);

		vm.menu = MenuService.listMenu();

		vm.admin = [
			{
				link: 'showListBottomSheet($event)',
				title: 'Settings',
				icon: 'settings'
			}
		];

		vm.navigateTo = function (target) {

			var page = target;

			$state.go(page);

		};

		vm.showSettingsBottom = function ($event) {
			vm.alert = '';
			$mdBottomSheet.show({
				template: '<md-bottom-sheet class="md-grid" layout="column" ng-cloak><div layout="row" layout-align="center center"><h4>With clickOutsideToClose option, drag down or press ESC to close</h4></div><md-list flex layout="row" layout-align="center center"><md-list-item ng-repeat="item in vm.items"><md-button class="md-grid-item-content" ng-click="vm.listItemClick($index)"><md-icon class="md-48">{{item.icon}}</md-icon><div class="md-grid-text"> {{ item.name }} </div></md-button></md-list-item></md-list></md-bottom-sheet>',
				controller: 'SettingsCtrl',
				controllerAs: 'vm',
				targetEvent: $event
			}).then(function (clickedItem) {
				$mdToast.show(
					$mdToast.simple()
					.content(clickedItem.name + ' clicked!')
					.position('top right')
					.hideDelay(2000)
				);
			});
		};

	}

	function SettingsCtrl($mdBottomSheet) {
		/*jshint validthis: true */
		var vm = this;

		vm.items = [
			{name: 'Roles', icon: 'assignment_ind'},
			{name: 'Notes', icon: 'speaker_notes'},
			{name: 'Tasks', icon: 'view_list'},
			{name: 'Inbox', icon: 'inbox'}
		];

		vm.listItemClick = function ($index) {
			var clickedItem = vm.items[$index];
			$mdBottomSheet.hide(clickedItem);
		};
	}

})();

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

(function () {
	'use strict';
  /**
	* @ngdoc function
	* @name app.service:homeService
	* @description
	* # homeService
	* Service of the app
	*/

  angular.module('improved-github-analytics')
    .factory('homeService', homeService);

  homeService.$inject = ['$http', '$rootScope', '$window'];

  function homeService($http) {
    return {
    };
  }
}());

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

  	angular
		.module('improved-github-analytics')
		.factory('MenuService', Menu);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Menu.$inject = ['$http'];

		function Menu ($http) {

			var menu = [
				
					{
						link: 'history',
							name: 'History'
					},
			    
		  	];

			return {
				listMenu: function () {
					return menu;
				}
		  	}

		}

})();

(function() {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.service:menuService
	 * @description
	 * # menuService
	 * Service of the app
	 */

  	angular
		.module('improved-github-analytics')
		.factory('MenuService', Menu);
		// Inject your dependencies as .$inject = ['$http', 'someSevide'];
		// function Name ($http, someSevide) {...}

		Menu.$inject = ['$http'];

		function Menu ($http) {

			var menu = [
				
					{
						link: 'history',
							name: 'History'
					},
			    
		  	];

			return {
				listMenu: function () {
					return menu;
				}
		  	}

		}

})();
