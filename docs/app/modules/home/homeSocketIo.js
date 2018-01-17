(function () {
  'use strict';
  /* angular.module('improved-github-analytics')
      .factory('mySocket', mySocket); */
  angular.module('improved-github-analytics').factory('socketio', socketFactory);

  socketFactory.$inject = ['$rootScope', '$window'];
  function socketFactory($rootScope, $window) {
    /** Version comme l'exemple bird */
    let socket;
    const services = {
      on,
      emit,
      init,
    };

    return services;

    function init() {
      const ioUrl = 'https://improved-github-analytics-srv.herokuapp.com';
      $window.socket = io(ioUrl);
    }

    function on(eventName, callback) {
      $window.socket.on(eventName, function () {
        const args = arguments;
        $rootScope.$apply(() => {
          callback.apply($window.socket, args);
        });
      });
    }

    function emit(eventName, data, callback) {
      $window.socket.emit(eventName, data, function () {
        const args = arguments;
        $rootScope.$apply(() => {
          if (callback) {
            callback.apply($window.socket, args);
          }
        });
      });
    }
  }
}());
