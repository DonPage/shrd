'use strict';

angular.module('shrdApp')
  .controller('PlayCtrl', function ($scope, $http, socket, $routeParams, Auth, localStorage, $location) {
    $scope.message = 'Hello';

    /**
     * Test Room: http://localhost:9000/play/55e272e87ccd6cf02635f644
     */

    /*
     * We must determine if the user is logged in.
     */
    $scope.userName = null;
    $scope.stage = null;

    var pre = ['Test', 'Basic', 'Random'];
    var sub = ['User', 'Player', 'Person'];
    function genUser(){
      var name = pre[~~(Math.random()*pre.length)] + '' + sub[~~(Math.random()*sub.length)] + '.' + (Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111);

      /**
       * Test user stuff:
       $promise: Promise
       $resolved: true
       __v: 0
       _id: "55e34842b2dce3bc1e5abdaa"
       email: "test@test.com"
       name: "Test User"
       provider: "local"
       role: "user"
       */

      var user = {
        _id: name.split('.')[1],
        email: false,
        name: name,
        provider: 'local',
        role: 'guess'
      };

      console.log("Guess: ", user);

      return user;
    }

    Auth.isLoggedInAsync(function (value) {
      console.log("isLoggedInAsync:", value);

      if (value) {//if true

        $scope.initController(Auth.getCurrentUser());

      } else { //if false
        console.log("user not logged in.");

        $scope.stage = 'login';

        $scope.loginStage = function (choice) {

          if (choice != 'guess') {
            localStorage.create('redirect', $location.$$path);
            $location.path('/' + choice)
          }

          else if (choice == 'guess') {
            console.log("choice", choice);

            $scope.stage = 'createGuess';

            $scope.user = genUser();




          }

        }

      }//else if false

    });//isLoggedInAsync();

    $scope.initController = function (user) {
      console.log("initController", user);
      if (!user) return false;

      $scope.user = user;
      $scope.stage = 'controller';




    };


    //
    //
    //$http.post('/api/rooms/' + $routeParams.roomID + '/' + $scope.name, {name: $scope.name, active: true})
    //  .success(function (data) {
    //    console.log("newPlayer", data);
    //});
    //
    //
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
