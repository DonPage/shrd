/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ShrdGame = require('./ShrdGame.model');

exports.register = function(socket) {
  ShrdGame.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ShrdGame.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('ShrdGame:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('ShrdGame:remove', doc);
}