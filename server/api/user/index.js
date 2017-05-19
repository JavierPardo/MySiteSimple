'use strict';

var express = require('express');
var userController = require('./user.controller');

var jsonfile = require('jsonfile');
var path = require('path');
var usrController = null;
var router = express.Router();

//router.put('/:id', controller.put);
//router.post('/:id', controller.post);
//router.delete('/:id', controller.delete);

module.exports = function (app) {
  usrController = new userController.userController(app);
  router.get('/authenticate', usrController.authenticate);
  router.get('/validate', usrController.validate);
  return router;
}
