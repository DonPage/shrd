'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RoomSchema = new Schema({
  name: String,
  game: String,
  players: Array,
  stage: String,
  inProgress: Boolean,
  latestAction: String
});

module.exports = mongoose.model('Room', RoomSchema);
