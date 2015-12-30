'use strict';

(function() {

  class PlayController {

    constructor(mobileCheck, $routeParams, $http) {
      this.isMobile = mobileCheck;
      this.$roomId = $routeParams.roomId;
      this.roomData = {};

      $http.get(`/api/rooms/${this.$roomId}`)
        .then(res => {
          this.roomData = res.data;
          console.log(this.roomData.game)

        })
        .catch(res => {
          //TODO: show an error
        })

    }

  }

  angular.module('shrd2App')
    .controller('PlayController', PlayController);

})();
