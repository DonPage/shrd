'use strict';

(function() {

  /**
   * Reusable functions for Local Storage
   */
  function LocStorageService(Util) {
    var safeCb = Util.safeCb;

    var LocalStorage = {

        /**
         * Create key with value
         * @param {String}  key
         * @param {String}  value
         * @return {Function} callback
         */
      create(key, value, callback) {
          if (typeof value === 'string') {
            localStorage.setItem(key, value)
          } else {
            localStorage.setItem(key, JSON.stringify(value));
          }



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

  angular.module('shrd2App')
    .factory('LocStorage', LocStorageService);

})();
