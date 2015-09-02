'use strict';

angular.module('shrdApp')
  .controller('RoomCtrl', function ($scope, $location, $routeParams, $http, socket) {

    /**
     * TestRoom: http://localhost:9000/room/55e76b36c826dbe82bab9636
     */

    console.log("room controller");


    $scope.getWaitingRoomLink = function () { //This gets id from path and returns waiting room link.
      return $location.host() + ':' + $location.port() + '/play/' + $routeParams.roomID;
    };


    $scope.roomData = {};

    $scope.testEvent = '';

    $http.get('/api/rooms/' + $routeParams.roomID).success(function (roomData) {
      console.log("roomData: ", roomData);
      $scope.roomData = roomData;
      socket.roomUpdates('room-' + roomData._id, $scope.roomData, function (event, newData, obj) {
        //console.log(event, newData, obj);
        $scope.roomData = newData;

        for (var t = 0; t < newData.players.length; t++) {
          var player = newData.players[t];
          console.log("player", player);
          //sync room id with player id.
          socket.syncPlayerEvents('room-' + $routeParams.roomID + ':player-' + player._id, player, function (data) {

            console.log("data", data);
            var playerIdx = _.findIndex($scope.roomData.players, function(chr){
              return chr._id == data._id;
            });

            $scope.roomData.players[playerIdx] = data;

          })
        }


      });
    });

    


  });
