'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ShrdGameSchema = new Schema({
  name: String,
  info: String,
  minPlayers: Number,
  maxPlayers: Number,
  version: String

});

module.exports = mongoose.model('ShrdGame', ShrdGameSchema);
