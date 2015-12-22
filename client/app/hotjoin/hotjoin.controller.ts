'use strict';

class HotjoinController {
  games = [];
  //games: games = [];
  constructor(rooms) {
    console.log("rooms.data", rooms.data);
    this.games = rooms.data;
  }


};

angular.module('shrdApp')
  .controller('HotjoinCtrl', HotjoinController);
