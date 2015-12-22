'use strict';

angular.module('shrd2App')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/create-room', {
        templateUrl: 'app/createRoom/createRoom.html',
        controller: 'CreateRoomController',
        controllerAs: 'cr',
        authenticate: true
      });
  });
