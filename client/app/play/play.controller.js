'use strict';

(function() {

  class PlayController {

    constructor(mobileCheck) {
      console.log("mobileCheck", mobileCheck);

    }

  }

  angular.module('shrd2App')
    .controller('PlayController', PlayController);

})();
