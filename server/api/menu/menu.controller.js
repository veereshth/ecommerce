/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/menus              ->  index
 * POST    /api/menus              ->  create
 * GET     /api/menus/:id          ->  show
 * PUT     /api/menus/:id          ->  update
 * DELETE  /api/menus/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Menu from './menu.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Menus
export function index(req, res) {
    console.log("Menu : "+req);
  return Menu.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Menu from the DB
export function show(req, res) {
  return Menu.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Menu in the DB
export function create(req, res) {
  return Menu.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Menu in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Menu.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function getall(req, res) {
    console.log("Hello  I am in");
    return Menu.aggregate([{
    $lookup: {
            from: "catalogs",
            localField: "_id",
            foreignField: "parent",
            as: "catalogs"
        }
    }]).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Menu from the DB
export function destroy(req, res) {
  return Menu.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
