'use strict';

var express = require('express');
var excerciseController = require('./excercise.controller');

var jsonfile = require('jsonfile');
var path = require('path');
var router = express.Router();
var utils = require('../../../utils').getInstance();

var multer=require('multer');
var upload = multer({
  dest: 'uploadFolder'
});

// route middleware to verify a token
router.put('/', upload.any(), excerciseController.create);
router.get('/', excerciseController.getAll);
//router.post('/:id', controller.post);
//router.delete('/:id', controller.delete);

module.exports = router;