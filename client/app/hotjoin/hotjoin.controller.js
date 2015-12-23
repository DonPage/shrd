'use strict';

(function() {

  class HotJoinController {

    constructor($http) {
      this.games = [];
      $http.get('/api/rooms/hotjoin')
        .then(results => this.games = results.data)
    }

  }

  angular.module('shrd2App')
    .controller('HotJoinController', HotJoinController);

})();
