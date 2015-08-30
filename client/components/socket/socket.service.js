/* global io */
'use strict';

angular.module('shrdApp')
  .factory('socket', function(socketFactory) {

    // socket.io now auto-configures its connection when we ommit a connection url
    var ioSocket = io('', {
      // Send auth token on connection, you will need to DI the Auth service above
      // 'query': 'token=' + Auth.getToken()
      path: '/socket.io-client'
    });

    var socket = socketFactory({
      ioSocket: ioSocket
    });

    return {
      socketIO: function (name,cb) {
        console.log("socketIO", name, cb);
        cb = cb || angular.noop;

        socket.on(name, function (data) {
          console.log("socket callback");
          cb(data)
        })

      },

      socket: socket,

      /**
       * Register listeners to sync an array with updates on a model
       *
       * Takes the array we want to sync, the model name that socket updates are sent from,
       * and an optional callback function after new items are updated.
       *
       * @param {String} modelName
       * @param {Array} array
       * @param {Function} cb
       */
      syncUpdates: function (modelName, array, cb) {
        cb = cb || angular.noop;

        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (item) {
          var oldItem = _.find(array, {_id: item._id});
          var index = array.indexOf(oldItem);
          var event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(modelName + ':remove', function (item) {
          var event = 'deleted';
          _.remove(array, {_id: item._id});
          cb(event, item, array);
        });
      },



      roomUpdates: function (modelName, obj, cb) {
        //console.log("modelName", modelName);
        //console.log("obj", obj);
        cb = cb || angular.noop;



        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(modelName + ':save', function (newData) {
          var event = 'created';
          //console.log("item", item);
          //console.log("obj", obj);

          cb(event, newData, obj);
        });

      },

      playerUpdates: function (modelName, obj, cb) {
        cb = cb || angular.noop;

        //sending to server
        socket.emit('playerUpdate', obj);


      },

      syncPlayerEvents: function (modelName, obj, cb) {
        console.log("syncPlayerEvents:", modelName, obj);
        cb = cb || angular.noop;

        socket.on(modelName, function (data) {
          console.log("back from server:", data);
          cb(data);
        })

      },

      /**
       * Removes listeners for a models updates on the socket
       *
       * @param modelName
       */
      unsyncUpdates: function (modelName) {
        socket.removeAllListeners(modelName + ':save');
        socket.removeAllListeners(modelName + ':remove');
      }
    };
  });
