'use strict';

(function() {

  /**
   * Reusable functions for Local Storage
   */
  function LocStorageService(Util) {
    const safeCb = Util.safeCb;
    const findKey = (key, callback) => localStorage.getItem(key) ? true : false;


    var LocalStorage = {

        /**
         * Create key with value
         * @param {String}  key
         * @param {String}  value
         * @return {Function} callback
         */
      create(key, value, callback) {
          angular.isString(value) ? localStorage.setItem(key, value) : localStorage.setItem(key, JSON.stringify(value));
          return safeCb(callback)(true);
        },



        /**
         * Read value at key
         * @param {String} key
         * @return {Function|Boolean} callback - false when no value is found
         */
      read(key, callback) {
          let value = localStorage.getItem(key);
          return value ? safeCb(callback)(value) : safeCb(callback)(false);
        },

        /**
         * Update key with value
         * @param {String} key
         * @param {String} value
         * @return {Function|Boolean} callback - false when no key is found
         */
      update(key, value, callback) {
          if (findKey(key)) {
            localStorage.setItem(key, value);
            return safeCb(callback)(true)
          } else {
            return safeCb(callback)(false)
          }
        },

        /**
         * Delete key and value
         * @param {String}  key
         * @param {Function}  callback
         */
      delete(key, callback) {
          if (findKey(key)) {
            localStorage.removeItem(key);
            return safeCb(callback)(true);
          } else {
            return safeCb(callback)(false);
          }
        },

        /**
         * Clear all local storage
         * @param {Function} callback
         */
      clear(callback) {
          localStorage.clear();
          return safeCb(callback)()
      }

    };

    return LocalStorage;
  }

  angular.module('shrd2App')
    .factory('LocStorage', LocStorageService);

})();
