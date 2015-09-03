/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Room = require('./room.model');

exports.register = function(socket) {
  Room.schema.post('save', function (doc) {
    console.log("ROOM SAVE");
    onSave(socket, doc);
  });

  //Room.schema.post('update', function (doc) {
  //  console.log("ROOM UPDATE");
  //
  //});

  Room.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  console.log("doc.latestAction", doc.latestAction);

  //different latestAction have specific sockets it needs to broadcast to.

  switch(doc.latestAction) {
    case 'newPlayer':
          socket.emit('room-' + doc._id + ':newPlayer', doc);
          break;
    case 'stageChange':
          socket.emit('room-' + doc._id + ':stageChange', doc.stage)
  }

  //socket.emit('room-' + doc._id+':' + doc.latestAction, doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('room:remove', doc);
}
