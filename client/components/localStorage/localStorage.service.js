'use strict';

(function() {

  /**
   * Reusable functions for Local Storage
   */
  function LocStorageService(Util) {
    var LocalStorage = {

        /**
         * Create key with value
         * @param {String}  key
         * @param {String}  value
         * @return {Function} callback
         */
        create: function (key, value, cb) {
          let cb = Util.safeCb(cb)
        }



        /**
         * Read value at key
         * @param {String} key
         * @param {String} value
         * @return {Function|Boolean} callback - false when no value is found
         */

        /**
         * Update key with value
         * @param {String} key
         * @param {String} value
         * @return {Function|Boolean} callback - false when no key is found
         */

        /**
         * Delete key and value
         * @param {String}  key
         * @param {Function}  callback
         */


    };

    return LocalStorage;
  }

  angular.module('shrd2App.locStorage')
    .factory('LocStorage', LocStorageService);

})();
