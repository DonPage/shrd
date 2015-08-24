'use strict';

angular.module('shrdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/play/:roomID', {
        templateUrl: 'app/play/play.html',
        controller: 'PlayCtrl'
      });
  });
