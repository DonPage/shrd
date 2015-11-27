'use strict';

angular.module('shrdApp')
  .controller('ControllerEvents', function ($scope, Auth, $http, $routeParams, socket) {
    console.log("ControllerEvents");

    var newPlayer = {
      name: Auth.getCurrentUser().name,
      _id: Auth.getCurrentUser()._id,
      room: $routeParams.roomID,
      direction: null,
      connection: true,
      ready: false
    };
    console.log("newPlayer", newPlayer);

    //creates new player in db.
    $http.post('/api/rooms/' + $routeParams.roomID + '/' + Auth.getCurrentUser()._id, newPlayer)
      .success(function (data) {
        console.log("allPlayers", data);
    });


    $scope.start = function () {
      console.log("start");
    };

    $scope.direction = function (event) {
      newPlayer.direction = event.target.id;

      socket.playerUpdates('playerUpdate', newPlayer)
    };

    $scope.endDirection = function (end) {
      newPlayer.direction = false;

      socket.playerUpdates('playerUpdate', newPlayer)
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
