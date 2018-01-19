(function () {
	'use strict';

	/**
	 * @ngdoc function
	 * @name app.test:apiTest
	 * @description
	 * # apiTest
	 * Test of the app
	 */

	describe('api test', function () {
		var controller = null, $scope = null;

		beforeEach(function () {
			module('improved-github-analytics');
		});

		beforeEach(inject(function ($controller, $rootScope) {
			$scope = $rootScope.$new();
			controller = $controller('ApiCtrl', {
				$scope: $scope
			});
		}));

		it('Should controller must be defined', function () {
			expect(controller).toBeDefined();
		});

	});
})();
