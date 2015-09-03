/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */
'use strict';

var _ = require('lodash');
var Room = require('./room.model');

// Get list of rooms
exports.index = function(req, res) {
  Room.find(function (err, rooms) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(rooms);
  });
};

// Get a single room
exports.show = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    return res.json(room);
  });
};

// Creates a new room in the DB.
exports.create = function(req, res) {

  req.body.inProgress = false;
  req.body.stage = 'waitingRoom';

  Room.create(req.body, function(err, room) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(room);
  });
};

// Creates a new player in the roomId.
exports.createPlayer = function(req, res) {
  //console.log("req", req.body);
  //console.log("req", req.params.roomID);
  //console.log("CREATE PLAYER@@@@@@@@@@@@@@");

  Room.findById(req.params.roomID, function (err, room) {
    //console.log("req.params.roomID", req.params.roomID);
    if (err) return handleError(res, err);
    if (!room) return res.status(404).send('Not Found');

    var newPlayer = req.body;
    var allPlayers = room.players;

    var find = _.findIndex(allPlayers, function(chr) {//This var fixes mutiple players.
       return chr._id == newPlayer._id
    });

    console.log("find", find);

    if (find == -1) {//found nothing.
      allPlayers.push(req.body);

      var updated = _.merge(room.players, allPlayers);
      room.players = updated;

      console.log("updated", updated);

      room.latestAction = 'newPlayer';

      room.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(room.players);
      });
    }




  });

  //Room.create(req.body, function(err, room) {
  //  if(err) { return handleError(res, err); }
  //  return res.status(201).json(room);
  //});
};

// Updates an existing room in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Room.findById(req.params.id, function (err, room) {
    if (err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    var updated = _.merge(room, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(room);
    });
  });
};

// Deletes a room from the DB.
exports.destroy = function(req, res) {
  Room.findById(req.params.id, function (err, room) {
    if(err) { return handleError(res, err); }
    if(!room) { return res.status(404).send('Not Found'); }
    room.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
