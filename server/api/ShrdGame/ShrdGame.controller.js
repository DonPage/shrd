'use strict';

var _ = require('lodash');
var ShrdGame = require('./ShrdGame.model');

// Get list of ShrdGames
exports.index = function(req, res) {
  ShrdGame.find(function (err, ShrdGames) {
    if(err) { return handleError(res, err); }
    return res.json(200, ShrdGames);
  });
};

// Get a single ShrdGame
exports.show = function(req, res) {
  ShrdGame.findById(req.params.id, function (err, ShrdGame) {
    if(err) { return handleError(res, err); }
    if(!ShrdGame) { return res.send(404); }
    return res.json(ShrdGame);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
