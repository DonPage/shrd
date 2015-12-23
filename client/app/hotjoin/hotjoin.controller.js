'use strict';

(function() {

  class HotJoinController {

    constructor($http, $location) {
      this.$location = $location;
      this.rooms = $http.get('/api/rooms/hotjoin')
        .then(results => this.rooms = results.data)
        .catch(() => this.rooms = [])//TODO: make error response
    }

    join(id) {
      this.$location.path(`/room/${id}`)
    }
  }

  angular.module('shrd2App')
    .controller('HotJoinController', HotJoinController);

})();
