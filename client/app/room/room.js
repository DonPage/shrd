'use strict';

angular.module('shrdApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/room/:roomID', {
        templateUrl: 'app/room/room.html',
        controller: 'RoomCtrl'
      })
  });
