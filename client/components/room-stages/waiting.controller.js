'use strict';

angular.module('shrdApp')
  .controller('WaitRoomCtrl', function ($scope, $location, $routeParams, $http, socket) {

    console.log("WaitRoomCtrl");


    $scope.getWaitingRoomLink = function () { //This gets id from path and returns waiting room link.
      return $location.host() + ':' + $location.port() + '/play/' + $routeParams.roomID;
    };


    $scope.roomData = {};

    $http.get('/api/rooms/' + $routeParams.roomID).success(function (roomData) {
      console.log("roomData: ", roomData);
      $scope.roomData = roomData;
      socket.waitingRoom('room-' + roomData._id, $scope.roomData, function (event, newData, obj) {
        $scope.roomData = newData;

        for (var t = 0; t < newData.players.length; t++) {
          var player = newData.players[t];
          //sync room id with player id.
          socket.syncPlayerEvents('room-' + $routeParams.roomID + ':player-' + player._id, player, function (data) {

            var playerIdx = _.findIndex($scope.roomData.players, function(chr){
              return chr._id == data._id;
            });

            $scope.roomData.players[playerIdx] = data;

          })
        }


      });
    });




    //startgame
    $scope.startGame = function () {
      console.log("startGame()");
      $scope.roomData.stage = 'start';
      $scope.roomData.inProgress = true;
      $scope.roomData.latestAction = 'stageChange';
      console.log("$scope.roomData", $scope.roomData);

      $http.put('/api/rooms/' + $routeParams.roomID, $scope.roomData).success(function (roomData) {
        console.log("roomData", roomData);
      })
    }

  });
