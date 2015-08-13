'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name: String,
  game: String,
  players: Array,
  active: Boolean
});

module.exports = mongoose.model('Room', RoomSchema);
