/*!
* improved-github-analytics - v0.0.1 - MIT LICENSE 2018-01-17. 
* @author Ludovic Delafontaine & Michela Zucca
*/
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
    'home',
    'analytics',
    'history',
  ]);
})();

(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('improved-github-analytics')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

		
		$urlRouterProvider
			.otherwise('/');
		
	}

	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		'use strict';

		console.log('AngularJS run() function...');
	}


})();

(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.module:analyticsModule
     * @description
     * # analyticsModule
     * Module of the app
     */

    angular.module('analytics', []);

})();

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
    angular.module('home', []);
})();

'use strict';

/**
 * @ngdoc function
 * @name app.route:analyticsRoute
 * @description
 * # analyticsRoute
 * Route of the app
 */

angular.module('analytics')
	.config(['$stateProvider', function ($stateProvider) {
        
        $stateProvider
            .state('analytics', {
                url:'/analytics',
                templateUrl: 'app/modules/analytics/analytics.html',
                controller: 'AnalyticsCtrl',
                controllerAs: 'vm'
            });
        
    }]);

'use strict';

/**
 * @ngdoc function
 * @name app.route:historyRoute
 * @description
 * # historyRoute
 * Route of the app
 */

angular.module('history')
    .config(['$stateProvider', function ($stateProvider) {
        
        $stateProvider
            .state('history', {
                url:'/history',
                templateUrl: 'app/modules/history/history.html',
                controller: 'HistoryCtrl',
                controllerAs: 'vm'
            });
        
    }]);

'use strict';

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
                url: '/',
                templateUrl: 'app/modules/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm'
            });
            
    }]);

(function() {
    'use strict';

    /**
    * @ngdoc function
    * @name app.controller:analyticsCtrl
    * @description
    * # analyticsCtrl
    * Controller of the app
    */

    angular
        .module('analytics')
        .controller('AnalyticsCtrl', Analytics);

        Analytics.$inject = [];

        /*
        * recommend
        * Using function declarations
        * and bindable members up top.
        */

        function Analytics() {
            /*jshint validthis: true */
            var vm = this;
            vm.title = "Repository analytics";
        }

})();

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
        .module('history')
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

        }

})();

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

    Home.$inject = ['homeService'];

    /*
    * recommend
    * Using function declarations
    * and bindable members up top.
    */
    function Home(homeService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = "Improved GitHub Anaytics";
        vm.version = "1.0.0";
        vm.listFeatures = homeService.getFeaturesList();

    }

})();

(function () {
    'use strict';

    /**
    * @ngdoc function
    * @name app.controller:NavBarCtrl
    * @description
    * # NavBarCtrl
    * Controller of the app
    */
    angular
        .module('improved-github-analytics')
        .controller('NavBarCtrl', NavBar);

    NavBar.$inject = ['homeService', 'MenuService'];

    /*
    * recommend
    * Using function declarations
    * and bindable members up top.
    */
    function NavBar(homeService, MenuService) {
        /*jshint validthis: true */
        var vm = this;
        vm.title = "Home";

        vm.menu = MenuService.listMenu();
    }
})();

(function() {
    'use strict';

    /**
     * @ngdoc function
     * @name app.service:analyticsService
     * @description
     * # analyticsService
     * Service of the app
     */

    angular
        .module('analytics')
        .factory('AnalyticsService', Analytics);
        // Inject your dependencies as .$inject = ['$http', 'someSevide'];
        // function Name ($http, someSevide) {...}

        Analytics.$inject = ['$http'];

        function Analytics ($http) {

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
        .module('history')
        .factory('HistoryService', History);
        // Inject your dependencies as .$inject = ['$http', 'someSevide'];
        // function Name ($http, someSevide) {...}

        History.$inject = ['$http'];

        function History ($http) {

        }

})();

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

    homeService.$inject = ['$http'];

    function homeService($http) {

        var list = [
            {"feature": "Implemented Best Practices, following: John Papa's Guide"},
            {"feature": "Using Controller AS syntax"},
            {"feature": "Wrap Angular components in an Immediately Invoked Function Expression (IIFE)"},
            {"feature": "Declare modules without a variable using the setter syntax"},
            {"feature": "Using named functions"},
            {"feature": "Including Unit test with Karma"},
            {"feature": "Including UI options for Bootstrap or Angular-Material"},
            {"feature": "Including Angular-Material-Icons for Angular-Material UI"},
            {"feature": "Dynamic Menu generator for both themes"},
            {"feature": "Grunt task for Production and Development"}
        ];

        return {
            getFeaturesList: getFeaturesList
        };

        function getFeaturesList() {
            return list;
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
                link: 'analytics',
                    name: 'Analytics'
            },
            {
                link: 'history',
                    name: 'History'
            },
        ];

        return {
            listMenu: function () {
                return menu;
            }
        };
    }
})();

(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.directive:navbarDirective
     * @description
     * # navbarDirective
     * Directive of the app
     */
    angular
        .module('improved-github-analytics')
        .directive('navBar', navBar);

    function navBar() {

        var directive = {
            link: link,
            restrict: 'EA',
            scope: {
                menus: '=',
                brand: '='
            },
            controller: control,
            templateUrl: 'app/modules/layouts/nav-bar/navbar-tpl.html'

        };

        return directive;

        function link(scope, element, attrs, $location) {
            // write your code here
            scope.defaults = {
                brand: '',
                menus: [],
                search: {
                    show: false
                }
            }; // end defaults

        }

        function control($scope, $location) {

            $scope.isActive = function (path) {
                var currentPath = $location.path().split('/')[1];
                if (currentPath.indexOf('?') !== -1) {
                    currentPath = currentPath.split('?')[0];
                }
                return currentPath === path.split('/')[1];
            };
        }
    }
})();
