'use strict';

angular.module('shrdApp')
  .controller('ControllerEvents', function ($scope, Auth, $http, $routeParams, socket) {
    console.log("ControllerEvents");

    var newPlayer = {
      name: Auth.getCurrentUser().name,
      _id: Auth.getCurrentUser()._id,
      direction: false
    };
    console.log("newPlayer", newPlayer);

    //creates new player in db.
    $http.post('/api/rooms/' + $routeParams.roomID + '/' + Auth.getCurrentUser()._id, newPlayer)
      .success(function (data) {
        console.log("allPlayers", data);
    });



    $scope.direction = function (event) {
      var obj = {
        name: Auth.getCurrentUser().name,
        direction: event.target.id,
        room: $routeParams.roomID,
        _id: Auth.getCurrentUser()._id
      };
      console.log("obj", obj);
      socket.playerUpdates('playerUpdate', obj)
    };

    $scope.endDirection = function (end) {
      console.log("end.target.id", end.target.id);
      var obj = {
        name: Auth.getCurrentUser().name,
        direction: false,
        room: $routeParams.roomID,
        _id: Auth.getCurrentUser()._id
      };

      socket.playerUpdates('playerUpdate', obj)
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