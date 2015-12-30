'use strict';

(function() {

  class PlayController {

    constructor($routeParams, $http, socket) {
      this.$roomId = $routeParams.roomId;
      console.log(`this.$roomId  ${this.$roomId}`)
      this.roomData = {};
      this.ready = false;


      $http.get(`/api/rooms/${this.$roomId}`)
        .then(res => {
          this.roomData = res.data;
          console.log(this.roomData.game)

        })
        .catch(res => {
          //TODO: show an error
        });

    }

    readyUp() {
      console.log("ready up");
      this.ready = !this.ready;
    }

  }

  angular.module('shrd2App')
    .controller('PlayController', PlayController);

})();
