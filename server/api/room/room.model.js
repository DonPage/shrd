'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var RoomSchema = new mongoose.Schema({
  name: String,
  game: String,
  players: [
    {
      name: String,
      id: String,
      data: String
    }
  ],
  stage: String,
  inProgress: Boolean,
  latestAction: String,
  gameData: Object
});

export default mongoose.model('Room', RoomSchema);
