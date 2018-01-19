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

        Analytics.$inject = ['$scope', 'ApiService'];

        /*
        * recommend
        * Using function declarations
        * and bindable members up top.
        */

        function Analytics($scope, ApiService) {

            const barChartsOptions = {
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
            };

            const barChartsColors = [
                {
                    backgroundColor: 'rgba(192, 192, 192,0.3)',
                    borderColor: 'rgba(192, 192, 192, 0.5)',
                    hoverBackgroundColor: 'rgba(192, 192, 192, 0.9)',
                }
            ];

            const lineChartsOptions = {
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        },
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ],
                }
            };

            const lineChartsColors = [
                {
                    backgroundColor: 'rgba(192, 192, 192,0.3)',
                    borderColor: 'rgba(192, 192, 192, 0.5)',
                    hoverBackgroundColor: 'rgba(192, 192, 192, 0.9)',
                },
            ];

            /*jshint validthis: true */
            var vm = this;
            vm.title = "Repository analytics";

            // Watch the number-of-issues-by-grouping-results
            $scope.$watch(function() {
                return ApiService.numberOfIssuesByGroupingResults
            }, function(newResults) {
                if (newResults != null) {

                    const { format, issues } = newResults;

                    const process = {
                        labels: [],
                        openedIssues: [],
                        closedIssues: [],
                        remainingOpenedIssues: [],
                        differenceOpenedClosedIssues: [],
                        numberOfOpenedIssues: 0,
                        numberOfClosedIssues: 0,
                    }

                    issues.reverse();

                    issues.forEach(issue => {

                        process.labels.push(issue.date);

                        process.numberOfOpenedIssues += issue.openedIssues;
                        process.numberOfClosedIssues += issue.closedIssues;

                        process.openedIssues.push(process.numberOfOpenedIssues);
                        process.closedIssues.push(process.numberOfClosedIssues);
                        process.remainingOpenedIssues.push(process.numberOfOpenedIssues - process.numberOfClosedIssues);
                        process.differenceOpenedClosedIssues.push(issue.openedIssues - issue.closedIssues);
                    });
                    
                    $scope.openedIssuesChart.labels = process.labels;
                    $scope.closedIssuesChart.labels = process.labels;
                    $scope.remainingOpenedIssuesChart.labels = process.labels;
                    $scope.differenceOpenedClosedIssuesChart.labels = process.labels;

                    $scope.openedIssuesChart.data = [
                        process.openedIssues
                    ];

                    $scope.closedIssuesChart.data = [
                        process.closedIssues
                    ];

                    $scope.remainingOpenedIssuesChart.data = [
                        process.remainingOpenedIssues
                    ];

                    $scope.differenceOpenedClosedIssuesChart.data = [
                        process.differenceOpenedClosedIssues
                    ];
                }
            });

            // Watch the number-of-issues-by-authors-results
            $scope.$watch(function() {
                return ApiService.numberOfIssuesByAuthorsResults
            }, function(newResults) {
                if (newResults != null) {

                    console.log(newResults);

                    const { bestOpenedIssuesAuthors, bestClosedIssuesAuthors } = newResults;

                    const process = {
                        bestOpenedLabels: [],
                        bestClosedLabels: [],
                        bestOpenedData: [],
                        bestClosedData: [],
                    }

                    const podiumBestOpenedIssuesAuthors = bestOpenedIssuesAuthors
                                                            .sort((author1, author2) => author2.openedIssues - author1.openedIssues)
                                                            .slice(0, 3);
                    const podiumBestClosedIssuesAuthors = bestClosedIssuesAuthors
                                                            .sort((author1, author2) => author2.closedIssues - author1.closedIssues)
                                                            .slice(0, 3);
                    
                    podiumBestOpenedIssuesAuthors.forEach(author => {
                        process.bestOpenedLabels.push(`${author.author}: ${author.openedIssues}`);
                        process.bestOpenedData.push(author.openedIssues);
                    });

                    podiumBestClosedIssuesAuthors.forEach(author => {
                        process.bestClosedLabels.push(`${author.author}: ${author.closedIssues}`);
                        process.bestClosedData.push(author.closedIssues);
                    });

                    $scope.bestContribOpenedIssuesChart.labels = process.bestOpenedLabels;
                    $scope.bestContribClosedIssuesChart.labels = process.bestClosedLabels;

                    $scope.bestContribOpenedIssuesChart.data = process.bestOpenedData;
                    $scope.bestContribClosedIssuesChart.data = process.bestClosedData;

                    $scope.bestContribOpenedIssues = bestOpenedIssuesAuthors;
                    $scope.bestContribClosedIssues = bestClosedIssuesAuthors;
                }
            });

            $scope.openedIssuesChart = {
                labels: [],
                series: ['# of opened issues'],
                data: [
                    [0],
                ],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: lineChartsOptions,
                colors: lineChartsColors,
            };

            $scope.closedIssuesChart = {
                labels: [],
                series: ['# of closed issues'],
                data: [
                    [0],
                ],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: lineChartsOptions,
                colors: lineChartsColors,
            };

            $scope.remainingOpenedIssuesChart = {
                labels: [],
                series: ['Remaining # of opened issues'],
                data: [
                    [0],
                ],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: lineChartsOptions,
                colors: lineChartsColors,
            };

            $scope.differenceOpenedClosedIssuesChart = {
                labels: [],
                series: ['# of opened issues - # of closed issues'],
                data: [
                    [0],
                ],
                datasetOverride: [{ yAxisID: 'y-axis-1' }],
                options: lineChartsOptions,
                colors: lineChartsColors,
            };

            $scope.bestContribOpenedIssuesChart = {
                labels: [],
                series: ['# of opened issues'],
                data: [
                    [0],
                ],
                datasetOverride: [],
                options: barChartsOptions,
                colors: barChartsColors,
            };

            $scope.bestContribClosedIssuesChart = {
                labels: [],
                series: ['# of closed issues'],
                data: [
                    [0],
                ],
                datasetOverride: [],
                options: barChartsOptions,
                colors: barChartsColors,
            };
            
        }

})();
