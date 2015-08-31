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


    Auth.isLoggedInAsync(function (value) {

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





  });
