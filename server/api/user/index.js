'use strict';

var express = require('express');
var userController = require('./user.controller');

var jsonfile = require('jsonfile');
var path = require('path');
var router = express.Router();

  router.get('/authenticate', userController.authenticate);
  router.get('/validate', userController.validate);
  router.post('/signin', userController.signin);
//router.put('/:id', controller.put);
//router.post('/:id', controller.post);
//router.delete('/:id', controller.delete);

module.exports = router;