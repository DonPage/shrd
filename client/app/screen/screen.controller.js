'use strict';

(function() {

  class ScreenController {

    constructor(Auth, $routeParams, $http) {
      this.$roomId = $routeParams.roomId;
      this.roomData = {};

      $http.get(`/api/rooms/${this.$roomId}`)
        .then(res => {
          this.roomData = res.data;

        })
        .catch(res => {
          //TODO: show an error
        })

    }

  }

  angular.module('shrd2App')
    .controller('ScreenController', ScreenController);

})();
