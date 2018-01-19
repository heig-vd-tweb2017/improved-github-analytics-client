(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name app.test:analyticsTest
     * @description
     * # analyticsTest
     * Test of the app
     */

    describe('analytics test', function () {
        var controller = null, $scope = null;

        beforeEach(function () {
            module('improved-github-analytics');
        });

        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('AnalyticsCtrl', {
                $scope: $scope
            });
        }));

        it('Should controller must be defined', function () {
            expect(controller).toBeDefined();
        });

    });
})();
