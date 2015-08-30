'use strict';

angular.module('shrdApp')
  .service('localStorage', function () {


    /**
     * CRUD for LocalStorage.
     * Create
     * Read
     * Update
     * Delete
     */

    function stringy(value) {
      return JSON.stringify(value);
    }

    return {

      create: function (key, value) {
        console.log("localStorage create:", key);

        if (typeof value == 'string') {
          return localStorage.setItem(key, value);
        } else {
          return localStorage.setItem(key, stringy(value));
        }

      },

      read: function (key, cb) {
        cb = cb || angular.noop;
        console.log("localStorage read:", key);

        var value = localStorage.getItem(key);

        if (!value) {
          return false;
        } else {
          cb(value);
        }
      },

      update: function (key, value) {
        console.log("localStorage update:", key);

        var oldValue = localStorage.getItem(key);

        if (oldValue) {
          return localStorage.setItem(key, value);
        }

      },


      delete: function (key) {
        console.log("localStorage delete:", key);
        localStorage.removeItem(key);
      }

    }
  });
