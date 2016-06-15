/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/catalogs              ->  index
 * POST    /api/catalogs              ->  create
 * GET     /api/catalogs/:id          ->  show
 * PUT     /api/catalogs/:id          ->  update
 * DELETE  /api/catalogs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Catalog = require('./catalog.model');
var ObjectId = require('mongoose').ObjectID;
var mongo = require('mongoose');
var mongoose = require('mongoose');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
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
      .spread(function(updated) {
        return updated;
      });
  };
}
function catagoryInMenu(catalog) {
  var menu_ids = [catalog._id].concat(menu.children);
  return Catalog
    .find({'parent': { $in: menu_ids } })
    .populate('parent')
    .exec();
}
function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}
exports.menu = function(req, res) {
    console.log("He ehhheee Menu")
var id = mongoose.Types.ObjectId(req.params.id);

  Catalog
    .find({ parent : id })
    .execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};
// Gets a list of Catalogs
exports.index = function(req, res) {
  Catalog.find().sort({_id: 1}).execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Catalog from the DB
exports.show = function(req, res) {
  Catalog.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Catalog in the DB
exports.create = function(req, res) {
  Catalog.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Catalog in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Catalog.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Catalog from the DB
exports.destroy = function(req, res) {
  Catalog.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
