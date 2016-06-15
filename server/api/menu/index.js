'use strict';

var express = require('express');
var controller = require('./menu.controller');

var router = express.Router();
var auth = require('../../auth/auth.service');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/getall', controller.getall);

router.post('/',  auth.hasRole('admin'), controller.create);
router.put('/:id',  auth.hasRole('admin'), controller.update);
router.patch('/:id',  auth.hasRole('admin'), controller.update);
router.delete('/:id',  auth.hasRole('admin'), controller.destroy);

module.exports = router;
