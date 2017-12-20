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
		vm.title = "Hello, ang-modular!";
		vm.version = "1.0.0";
		vm.listFeatures = homeService.getFeaturesList();

		vm.repoGithub = {
			repo : 'https://github.com/<owner>/<repo>',
			dates :  ['1 an', '6 mois', '3 mois','1 mois','2 semaines','1 semaine'],
			groupments :  ['1 an', '6 mois', '3 mois','1 mois','2 semaines','1 semaine'],
		}

		vm.apply = function(){
			console.log("click");
		}	

		vm.lineChartOppened = {
			
		}


		vm.lineChartClosed = {
			
		}

		/* Encapsulation ne fonctionne pas
		vm.lineChart = {
			labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			series : ['?????'],
			data : [65, 59, 80, 81, 56, 55, 40],
			datasetOverride : { yAxisID: 'y-axis-1' },
			options : {
				responsive: true,
				maintainAspectRatio: true,
			  scales: {
				yAxes: [
				  {
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				  },
				]
			  }
			},
			colors : [
				{
				  backgroundColor: "rgba(159,204,0, 0.2)",
				  pointBackgroundColor: "rgba(159,204,0, 1)",
				  pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
				  borderColor: "rgba(159,204,0, 1)",
				  pointBorderColor: '#fff',
				  pointHoverBorderColor: "rgba(159,204,0, 1)"
				},"rgba(250,109,33,0.5)","#9a9a9a","rgb(233,177,69)"
			  ],
		}*/


		/* LINE CHART VERSION BRUT TEMPORAIRE */
		vm.labelsLineChart = ["January", "February", "March", "April", "May", "June", "July"];
		vm.seriesLineChart = ['Series A'];
		vm.dataLineChart = [
		  [65, 59, 80, 81, 56, 55, 40],
		];
		vm.onClick = function (points, evt) {
		  console.log(points, evt);
		};
		vm.datasetOverrideLineChart = { yAxisID: 'y-axis-1' };
		vm.optionsLineChart = {
			responsive: true,
			maintainAspectRatio: true,
		  scales: {
			yAxes: [
			  {
				id: 'y-axis-1',
				type: 'linear',
				display: true,
				position: 'left'
			  },
			]
		  }
		};
		vm.colorsLineChart = [
            {
              backgroundColor: "rgba(159,204,0, 0.2)",
              pointBackgroundColor: "rgba(159,204,0, 1)",
              pointHoverBackgroundColor: "rgba(159,204,0, 0.8)",
              borderColor: "rgba(159,204,0, 1)",
              pointBorderColor: '#fff',
              pointHoverBorderColor: "rgba(159,204,0, 1)"
            },"rgba(250,109,33,0.5)","#9a9a9a","rgb(233,177,69)"
		  ];
		
		  /* BAR CHART VERSION BRUT TEMPORAIRE*/
		  vm.labelsBarChart = ['2ème', '1er', '3ème'];
		  vm.seriesBarChart = ['Jean', 'Pierre', 'Jack'];
		
		  vm.dataBarChart = [
			[13],
			[18],
			[9],
		  ];

		  vm.optionsBarChart = {
			// All of my other bar chart option here
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:true
					}
				}]
			}
		};
	}

})();
