'use strict';

angular.module('shrdApp')
  .controller('RoomCtrl', function ($scope, $location, $routeParams, $http, socket) {
    console.log("$location", $location);
    console.log("$routeParams", $routeParams);

    /**
     * TestRoom: http://localhost:9000/room/55dbaf74e8a2a36c2e0b47a6
     */

    console.log("room controller");


    $scope.getWaitingRoomLink = function () { //This gets id from path and returns waiting room link.
      return $location.host() + ':' + $location.port() + '/play/' + $routeParams.roomID;
    };


    $scope.roomData = null;

    $http.get('/api/rooms/' + $routeParams.roomID).success(function (roomData) {
      console.log("roomData: ", roomData);
      $scope.roomData = roomData;
      socket.roomUpdates('room', $scope.roomData, function (event, newData, obj) {
        console.log(event, newData, obj);
        $scope.roomData = newData;
      });
    });





  });
