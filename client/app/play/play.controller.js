'use strict';

angular.module('shrdApp')
  .controller('PlayCtrl', function ($scope, $http, socket, $routeParams) {
    $scope.message = 'Hello';



    //TODO: this is for testing only.
    var pre = ['Test', 'Basic', 'Random'];
    var sub = ['User', 'Player', 'Person'];
    function genPlayerName(){
      return pre[~~(Math.random()*pre.length)] + '' + sub[~~(Math.random()*sub.length)] + (Math.floor(Math.random() * (999 - 111 + 1)) + 111);
    }


    $scope.name = genPlayerName();


    $http.post('/api/rooms/' + $routeParams.roomID + '/' + $scope.name, {name: $scope.name, active: true})
      .success(function (data) {
        console.log("newPlayer", data);
    });


    $scope.playerData = '';

    $scope.updatePlayerData = function () {
      if ($scope.playerData == '') {
        return;
      }
      console.log("$scope.playerData", $scope.playerData);
      //socket.broadcast.to($routeParams.roomID).emit('updatePlayerData', $scope.playerData);
      var obj = {
        name: $scope.name,
        data: $scope.playerData,
        room: $routeParams.roomID
      };
      //socket.playerUpdates('room-' + $routeParams.roomID, obj, function (event, newData) {
      //
      //})
      socket.playerUpdates('playerUpdate', obj)
    }




  });
