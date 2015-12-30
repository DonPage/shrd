'use strict';

angular.module('shrd2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play/:roomId', {
        templateUrl: 'app/play/play.html',
        controller: 'PlayController',
        controllerAs: 'play',
        resolve: {
        }
      });
  });
