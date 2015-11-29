'use strict';

angular.module('shrdApp')
  .controller('ControllerEvents', function ($scope, Auth, $http, $routeParams, socket) {
    console.log("ControllerEvents");

    var Player = {
      name: Auth.getCurrentUser().name,
      _id: Auth.getCurrentUser()._id,
      room: $routeParams.roomID,
      direction: null,
      connection: true,
      ready: false
    };
    console.log("Player", Player);

    //creates new player in db.
    $http.post('/api/rooms/' + $routeParams.roomID + '/' + Auth.getCurrentUser()._id, Player)
      .success(function (data) {
        console.log("allPlayers", data);
    });


    $scope.startButton = function () {
      Player.ready = !Player.ready;
      console.log("Player.ready:", Player.ready);

      socket.playerUpdates('playerUpdate', Player);
    };

    $scope.direction = function (event) {
      Player.direction = event.target.id;

      socket.playerUpdates('playerUpdate', Player)
    };

    $scope.endDirection = function (end) {
      Player.direction = false;

      socket.playerUpdates('playerUpdate', Player)
    };





    //$scope.playerData = '';
    //
    //$scope.updatePlayerData = function () {
    //  if ($scope.playerData == '') {
    //    return;
    //  }
    //  console.log("$scope.playerData", $scope.playerData);
    //  //socket.broadcast.to($routeParams.roomID).emit('updatePlayerData', $scope.playerData);
    //  var obj = {
    //    name: $scope.name,
    //    data: $scope.playerData,
    //    room: $routeParams.roomID
    //  };
    //  //socket.playerUpdates('room-' + $routeParams.roomID, obj, function (event, newData) {
    //  //
    //  //})
    //  socket.playerUpdates('playerUpdate', obj)
    //}
  });
