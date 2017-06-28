'use strict';

var express = require('express');
var excerciseController = require('./excercise.controller');
var User = require('../../../models/userModel');

var jsonfile = require('jsonfile');
var path = require('path');
var router = express.Router();
var utils = require('../../../utils').getInstance();

var multer = require('multer');
var upload = multer({
  dest: 'uploadFolder'
});
var user = undefined;
router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authtoken'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    var token = utils.encryptation.decrypt(token);
    utils.tokenizer.validateToken(token)
      .then(function () {
        var userId = utils.tokenizer.decode(token).id;
        User.findById(userId)
          .then(function (data) {
            user = data;
            next();
          });
      })
      .catch(function (erro) {
        console.log(erro);
        return res.status(403).send({
          success: false,
          message: 'invalid token.'
        });

      })
  } else {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

router.put('/Images/', function (req, res) {
  excerciseController.uploadImages(req, res, user);
});
router.put('/', function (req, res) {
  excerciseController.create(req, res, user);
});
router.post('/', function (req, res) {
  excerciseController.update(req, res, user);
});
router.get('/:id', function (req, res) {
  excerciseController.getExcercise(req, res, user);
});
router.get('/', excerciseController.getAll);
//router.post('/:id', controller.post);
//router.delete('/:id', controller.delete);

module.exports = router;
