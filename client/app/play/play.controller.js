'use strict';

angular.module('shrdApp')
  .controller('PlayCtrl', function ($scope, $http, socket, $routeParams, Auth, localStorage, $location, $window) {
    $scope.message = 'Hello';

    /**
     * Test Room: http://localhost:9000/play/55e272e87ccd6cf02635f644
     */

    /*
     * We must determine if the user is logged in.
     */
    $scope.userName = null;
    $scope.stage = null;

    console.log("PlayController", Auth.getCurrentUser());

    Auth.isLoggedInAsync(function (value) {
      console.log("isLoggedInAsync:", value);

      if (value) {//if true

        $scope.initController(Auth.getCurrentUser());

      } else { //if false
        console.log("user not logged in.");

        $scope.stage = 'login';

        //If user is not logged in they much choose whether to login, register, or continue as guest.
        $scope.loginStage = function (choice) {

          if (choice != 'guess') {
            localStorage.create('redirect', $location.$$path);
            $location.path('/' + choice);
          }

          else if (choice == 'guess') {
            console.log("choice", choice);

            Auth.createGuest(function (guest) {
              console.log("guest", guest);
              $scope.initController(Auth.getCurrentUser())
            })

          }

        }

      }//else if false

    });//isLoggedInAsync();

    $scope.initController = function (user) {
      console.log("initController", user);
      if (!user) return false;

      //delete any redirects:
      localStorage.delete('redirect');

      $scope.user = user;

      //switch stage
      $scope.stage = 'controller';

      //choose default controller:
      $scope.controllerType = 'nes-controller';
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
