'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var RoomSchema = new mongoose.Schema({
  name: String,
  game: String,
  players: Array,
  stage: String,
  inProgress: Boolean,
  latestAction: String,
  gameData: Object
});

export default mongoose.model('Room', RoomSchema);
