/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/rooms              ->  index
 * GET     /api/rooms/hotjoin      ->  index
 * POST    /api/rooms              ->  create
 * GET     /api/rooms/:id          ->  show
 * PUT     /api/rooms/:id          ->  update
 * DELETE  /api/rooms/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Room = require('./room.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode=200) {
  return function(entity) {
    console.log("entity", entity);
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function addPlayer(room) {
  return function(entity) {
    let roomPlayers = room.players;
    let newPlayer = entity;
    console.log(`roomPlayers  ${roomPlayers}`);
    console.log(`newPlayer  ${newPlayer}`);
  }
}

// Gets a list of Rooms
export function index(req, res) {
  Room.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a list of 'joinable' Rooms
export function indexHotjoin(req, res) {
  Room.findAsync({inProgress: false})
    .then(responseWithResult(res))
    .catch(handleError(res))
}

// Gets a single Room from the DB
export function show(req, res) {
  Room.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Room in the DB
export function create(req, res) {

  req.body.stage = 'waitingRoom';
  req.body.inProgress = false;

  Room.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Room in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Room.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Room from the DB
export function destroy(req, res) {
  Room.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Adds new player to Room
export function newPlayer(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Room.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then
}
