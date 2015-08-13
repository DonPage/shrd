'use strict';

angular.module('shrdApp')
  .controller('RoomCtrl', function ($scope, $location, $routeParams) {
    console.log("$location", $location);
    console.log("$routeParams", $routeParams);

    /**
     * TestRoom: http://localhost:9000/room/55cc0346c82d70f43c10ec38
     */

    console.log("room controller");


    $scope.getWaitingRoomLink = function () { //This gets id from path and returns waiting room link.
      return $location.host() + ':' + $location.port() + '/play/' + $routeParams.roomID;

    }
  });
