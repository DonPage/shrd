'use strict';

angular.module('shrdApp')
  .controller('RoomCtrl', function ($scope, $location, $routeParams, $http, socket) {

    console.log("RoomCtrl");



    //We must get data of room so we know what stage to switch to.
    $http.get('/api/rooms/' + $routeParams.roomID).success(function (roomData) {
      $scope.stage = roomData.stage;

      socket.room('room-' + $routeParams.roomID, function (newStage) {
        $scope.stage = newStage;
      })


    });

  });
