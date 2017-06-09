'use strict';

var express = require('express');
var excerciseController = require('./excercise.controller');

var jsonfile = require('jsonfile');
var path = require('path');
var router = express.Router();
var utils = require('../../../utils').getInstance();

var multer = require('multer');
var upload = multer({
  dest: 'uploadFolder'
});

router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['authtoken'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    var token = utils.encryptation.decrypt(token);
    utils.tokenizer.validateToken(token)
      .then(function () {
        next();
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
router.put('/', excerciseController.create);
router.get('/:id', excerciseController.getExcercise);
router.get('/', excerciseController.getAll);
//router.post('/:id', controller.post);
//router.delete('/:id', controller.delete);

module.exports = router;
