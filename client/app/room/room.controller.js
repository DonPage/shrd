'use strict';

angular.module('shrdApp')
  .controller('RoomCtrl', function ($scope) {

    //http://localhost:9000/room/55cc0346c82d70f43c10ec38

    console.log("room controller");
    $scope.message = 'Hello';
  });
