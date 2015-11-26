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

// Creates a new ShrdGame in the DB.
exports.create = function(req, res) {
  ShrdGame.create(req.body, function(err, ShrdGame) {
    if(err) { return handleError(res, err); }
    return res.json(201, ShrdGame);
  });
};

// Updates an existing ShrdGame in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ShrdGame.findById(req.params.id, function (err, ShrdGame) {
    if (err) { return handleError(res, err); }
    if(!ShrdGame) { return res.send(404); }
    var updated = _.merge(ShrdGame, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, ShrdGame);
    });
  });
};

// Deletes a ShrdGame from the DB.
exports.destroy = function(req, res) {
  ShrdGame.findById(req.params.id, function (err, ShrdGame) {
    if(err) { return handleError(res, err); }
    if(!ShrdGame) { return res.send(404); }
    ShrdGame.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}