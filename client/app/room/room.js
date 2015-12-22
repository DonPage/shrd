'use strict';

angular.module('shrd2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/room/:roomId', {
        templateUrl: 'app/room/room.html',
        controller: 'RoomController',
        controllerAs: 'room'
      });
  });
