'use strict';

angular.module('shrdApp')
  .controller('SpaceInvadersCtrl', function ($scope, $routeParams, $http, socket) {

    console.log("Space Invaders Controller");

    $scope.roomData = null;

    //We must get the player data from db.
    $http.get('/api/rooms/' + $routeParams.roomID).success(function (roomData) {


      //game logic
      var Game = function (canvasID) {
        var canvas = document.getElementById(canvasID);

        //draw context
        var screen = canvas.getContext('2d');
        var gameSize = {x: canvas.width, y: canvas.height};

        //bodies will hold all players and NPCs
        //this.bodies = [new Player(this, gameSize)];
        this.bodies = [];

        var self = this;

        //loop through all the players.
        for (var i = 0; i < roomData.players.length; i++) {
          var player = roomData.players[i];

          //console.log("gameSize", gameSize);
          this.bodies.push(new Player(self.game, gameSize, player));

          //sync player
          socket.syncPlayerEvents('room-' + $routeParams.roomID + ':player-' + player._id, player, function (data) {

            var playerIdx = _.findIndex(self.bodies, function (chr) {
              return chr._id == data._id;
            });

            console.log("player:", data.name, data.direction);
            //$scope.roomData.players[playerIdx] = data;

            console.log("self.bodies[playerIdx]", self.bodies[playerIdx]);

            self.bodies[playerIdx].direction = data.direction;

            //if (data.direction == 'left') {
            //  self.bodies[playerIdx].center.x -= 2;
            //}
            //if (data.direction == 'right') {
            //  self.bodies[playerIdx].center.x += 2;
            //}

          })

        }


        var tick = function () {
          self.update();
          self.draw(screen, gameSize);
          requestAnimationFrame(tick);
        };

        tick();
      };



      Game.prototype = {

        update: function () {
          for (var i = 0; i < this.bodies.length; i++) {
            this.bodies[i].update();
          }
        },

        draw: function (screen, gameSize) {
          //clear screen
          screen.clearRect(0,0,gameSize.x, gameSize.y)
          //screen.fillRect(30, 30, 40, 40)
          for (var i = 0; i < this.bodies.length; i++) {
            drawRect(screen, this.bodies[i])
          }
        }

      };

      var Player = function (game, gameSize, playerData) {
        console.log("Player() playerData", playerData);
        console.log("gameSize", gameSize);
        this.game = game;
        this.size = {x: 15, y: 15};
        this.center = {x: gameSize.x /2, y: gameSize.y - this.size.x};
        this._id = playerData._id;
        this.name = playerData.name;
        this.direction = false;
      };

      Player.prototype = {
        update: function () {
          if (this.direction == 'left') {
            this.center.x -= 2;
          }
          else if (this.direction == 'right'){
            this.center.x += 2;
          }

        }
      };

      var drawRect = function (screen, body) {
        //console.log("drawRect", body);
        screen.fillRect(
          body.center.x - body.size.x / 2,
          body.center.y - body.size.y / 2,
          body.size.x, body.size.y
        );

      };


      //start game
      new Game('screen');


    });

  });
