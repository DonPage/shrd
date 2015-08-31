'use strict';

angular.module('shrdApp')
  .controller('RoomCtrl', function ($scope, $location, $routeParams, $http, socket) {
    console.log("$location", $location);
    console.log("$routeParams", $routeParams);

    /**
     * TestRoom: http://localhost:9000/room/55e272e87ccd6cf02635f644
     */

    console.log("room controller");


    $scope.getWaitingRoomLink = function () { //This gets id from path and returns waiting room link.
      return $location.host() + ':' + $location.port() + '/play/' + $routeParams.roomID;
    };


    $scope.roomData = {};
    $scope.roomPlayers = {};

    $scope.testEvent = '';

    $http.get('/api/rooms/' + $routeParams.roomID).success(function (roomData) {
      console.log("roomData: ", roomData);
      $scope.roomData = roomData;
      socket.roomUpdates('room-' + roomData._id, $scope.roomData, function (event, newData, obj) {
        //console.log(event, newData, obj);
        $scope.roomData = newData;

        for (var t = 0; t < newData.players.length; t++) {
          var player = newData.players[t];
          $scope.roomPlayers[player._id] = player

        }

        console.log("$scope.roomPlayers", $scope.roomPlayers);

        for (var userID in $scope.roomPlayers) {
          if ($scope.roomPlayers.hasOwnProperty(userID)) {
            console.log("user", userID);
            socket.syncPlayerEvents('room-' + $routeParams.roomID + ':player-' + userID, $scope.roomPlayers[userID], function (data) {
              //console.log("event", event);
              console.log("player:", data.name, data.direction);
              $scope.roomPlayers[data._id].direction = data.direction;
              console.log($scope.roomPlayers[data._id]);

            });
          }
        }

        //for (var i = 0; i < newData.players.length; i++) {
        //  var player = newData.players[i];
        //
        //  console.log("FRONT:", 'room-' + roomData._id + ':player-' + player.name);
        //  socket.syncPlayerEvents('room-' + roomData._id + ':player-' + player.name, player, function (data) {
        //    //console.log("event", event);
        //    console.log("player:", data.name, data.direction);
        //
        //  });
        //
        //}
      });
    });

    //socket.syncPlayerEvents('playerEvent',{room: $routeParams.roomID}, function (data) {
    //  console.log("back from server:", data);
    //  $scope.testEvent = data;
    //});
    //
    //socket.socketIO('playerEvent', function (data) {
    //  console.log("data", data);
    //  $scope.testEvent = data.data;
    //});


  });
