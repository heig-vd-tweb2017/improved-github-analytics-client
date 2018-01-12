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
      console.log(data);
    });

    socketio.on('number-of-issues-by-grouping-results', (data) => {
      console.log('Results for "number-of-issues-by-grouping-results" are: ');
      console.log(data);
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
          { id: '0', name: '> 1 an', value:'10', unit:'years' },
          { id: '1', name: '1 an', value:'1', unit:'years' },
          { id: '2', name: '6 mois', value:'6', unit:'months' },
          { id: '3', name: '3 mois' , value:'2', unit:'months'},
          { id: '4', name: '1 mois', value:'1', unit:'months' },
          { id: '5', name: '1 semaine', value:'1', unit:'week' },
          { id: '6', name: '1 jour', value:'1', unit:'day' },
        ],
        selectedOption: {id: '0', name: '> 1 an', value:'10', unit:'years' }, // default option
      },
      groupment: {
        availableOptions: [
          { id: '1', name: 'années', value: 'years' },
          { id: '2', name: 'mois',value:'months'  },
          { id: '3', name: 'semaines' ,value:'weeks' },
          { id: '4', name: 'jours' ,value:'days' },
        ],
        selectedOption: {id: '1', name: 'années', value: 'years'}, // default option
      },

      /* Fonction appelée au clique du bouton search
				Utilise socket io pour récupérer les données */
      apply() {
        const repoGithub = vm.form.repoGitHub.selectedRepo.replace('https', 'http').replace('http://github.com/', '');
        const infos = repoGithub.split('/');

        const ownerSelected = infos[0];
        const repoSelected = infos[1];

        const dataLine = {
          owner: ownerSelected,
          repo: repoSelected,
          dataAgeValue: vm.form.period.selectedOption.value,
          dataAgeUnit: vm.form.period.selectedOption.unit,
        }

        const dataBar={
          owner : ownerSelected,
          repo : repoSelected,
          dataAgeValue : vm.form.period.selectedOption.value,
          dataAgeUnit : vm.form.period.selectedOption.unit,
          dataAgeGrouping : vm.form.groupment.selectedOption.value,
      }
       historyService.setRepo(ownerSelected, repoSelected);

       console.log('DataLine : ');
       console.log(dataLine);
       console.log('DataBar');
       console.log(dataBar);

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
          xAxes:[
            {
              type: 'time',
              time: {
                displayFormats:{
                  wuarter: 'MM YYYY',
                },
              },
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
