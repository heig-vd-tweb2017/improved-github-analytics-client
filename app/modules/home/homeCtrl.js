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

  Home.$inject = ['socketio', '$scope', '$window','historyService'];

  function Home(socketio,$scope,$window,historyService) {
    /* jshint validthis: true */
    const vm = this;

    socketio.on('number-of-issues-by-authors-results', (data) => {
      console.log('Results for "number-of-issues-by-authors-results" are: ');
     // console.log(data);
    });

    socketio.on('number-of-issues-by-grouping-results', (data) => {
      console.log('Results for "number-of-issues-by-grouping-results" are: ');
     // console.log(data);
    });

    socketio.on('number-of-issues-by-authors-old-results', (data) => {
    console.log('Results for "number-of-issues-by-authors-old-results" are: ');
	  console.log(data);
    historyService.setData(data.data);
  });

    /* Formulaire */
    vm.form = {
      repoGitHub: {
        selectedRepo: 'https://github.com/<owner>/<repo>',
      },
      period: {
        availableOptions: [
          { id: '0', name: '> 1 an', value:'2' },
          { id: '1', name: '1 an', value:'2' },
          { id: '2', name: '6 mois', value:'2' },
          { id: '3', name: '3 mois' , value:'2'},
          { id: '4', name: '1 mois', value:'2' },
          { id: '5', name: '1 semaine', value:'2' },
          { id: '6', name: '1 jour', value:'2' },
        ],
        selectedOption: { id: '0', name: '> 1 an', value:'2' }, // default option
      },
      groupment: {
        availableOptions: [
          { id: '1', name: '1 an', value:'months' },
          { id: '2', name: '6 mois',value:'months'  },
          { id: '3', name: '3 mois' ,value:'months' },
          { id: '4', name: '1 mois' ,value:'months' },
          { id: '5', name: '2 semaines',value:'months' },
          { id: '6', name: '1 semaine' ,value:'months' },
        ],
        selectedOption: { id: '1', name: '1 an' , value: 'months'}, // default option
      },

      /* Fonction appelée au clique du bouton search
				Utilise socket io pour récupérer les données */
      apply() {
        const repoGithub = vm.form.repoGitHub.selectedRepo.replace('https', 'http').replace('http://github.com/', '');
        const infos = repoGithub.split('/');

        const owner = infos[0];
        const repo = infos[1];

        const dataLine = {
          owner: 'google',
          repo: 'WebFundamentals',
          dataAgeValue: 2,
          dataAgeUnit:'months',
        }
        const dataBar={
          owner : 'google',
          repo : 'WebFundamentals',
          dataAgeValue : 2,
          dataAgeUnit : 'months',
          dataAgeGrouping : 'days',
      }
       historyService.setRepo(owner, repo);

        socketio.emit('number-of-issues-by-authors', dataLine);
        socketio.emit('number-of-issues-by-grouping', dataBar);
      },
    };

    /* Data des lineChart */
    vm.dataLineChartOI = [[65, 59, 80, 81, 56, 55, 40]];
    vm.dataLineChartCI = [[40, 32, 93, 81, 20, 55, 40]];
    vm.dataLineChartI = [[21, 43, 67, 81, 56, 55, 40]];

    /* Configurations des linesChart */
    vm.lineChart = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      series: ['Series A'],
      datasetOverride: { yAxisID: 'y-axis-1' },
      options: {
        responsive: true,
        maintainAspectRatio: true,
			  scales: {
          yAxes: [
				  {
              id: 'y-axis-1',
              type: 'linear',
              display: true,
              position: 'left',
				  },
          ],
			  },
      },
      colors: [
        {
				  backgroundColor: 'rgba(159,204,0, 0.2)',
				  pointBackgroundColor: 'rgba(159,204,0, 1)',
				  pointHoverBackgroundColor: 'rgba(159,204,0, 0.8)',
				  borderColor: 'rgba(159,204,0, 1)',
				  pointBorderColor: '#fff',
				  pointHoverBorderColor: 'rgba(159,204,0, 1)',
        }, 'rgba(250,109,33,0.5)', '#9a9a9a', 'rgb(233,177,69)',
      ],
      onClick(points, evt) {
        console.log(points, evt);
      },
    };

    /* Data des BarChart */
    vm.seriesBarChartOI = ['Jean', 'Pierre', 'Jack'];
    vm.dataBarChartOI = [[3], [5], [1]];
    vm.seriesBarChartCI = ['Anne', 'Jack', 'Fred'];
    vm.dataBarChartCI = [[2], [18], [9]];
    vm.seriesBarChartI = ['Joe', 'Pascal', 'Charlie'];
    vm.dataBarChartI = [[13], [14], [9]];

    /* Configuration des BarChart */
    vm.BarChart = {
      labels: ['2ème', '1er', '3ème'],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
      },
    };
  }
}());
