'use strict';

(function() {

  class ScreenController {

    constructor(socket, $routeParams, $http) {
      this.$roomId = $routeParams.roomId;
      this.roomData = {};

      $http.get(`/api/rooms/${this.$roomId}`)
        .then(res => {
          this.roomData = res.data;
          socket.syncRoomUpdates($routeParams.roomId, res.data, (newData) => {
            console.log("screen: ", newData);
          })

        })
        .catch(res => {
          //TODO: show an error
        })

    }

  }

  angular.module('shrd2App')
    .controller('ScreenController', ScreenController);

})();
