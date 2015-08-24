'use strict';

angular.module('shrdApp')
  .controller('PlayCtrl', function ($scope, $http, socket, $routeParams) {
    $scope.message = 'Hello';



    //TODO: this is for testing only.
    var pre = ['test', 'basic', 'random'];
    var sub = ['user', 'player', 'person'];
    function genPlayerName(){
      return pre[~~(Math.random()*pre.length)] + ' ' + sub[~~(Math.random()*sub.length)];
    }


    $scope.name = genPlayerName();


    $http.post('/api/rooms/' + $routeParams.roomID + '/' + $scope.name, {name: $scope.name, active: true})
      .success(function (data) {
        console.log("data", data);

    })








  });
