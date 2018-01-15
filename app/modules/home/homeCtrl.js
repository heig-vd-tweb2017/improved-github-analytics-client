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
      try {
        vm.majChartBar(data.data.bestOpenedIssuesAuthors, data.data.bestClosedIssuesAuthors);
      } catch(err) {
        vm.error = 'Url does not exist, please retry';
      }
    });

    socketio.on('number-of-issues-by-grouping-results', (data) => {
      try {
        vm.majChartLine(data.data.issues);
      } catch(err) {
        vm.error = 'Url does not exist, please retry';
      }
    });

    socketio.on('number-of-issues-by-authors-old-results', (data) => {
      try {
        historyService.setData(data.data);
      } catch(err) {
        vm.error = 'Url does not exist, please retry';
      }
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
