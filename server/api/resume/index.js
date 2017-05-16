'use strict';

var express = require('express');
var controller = require('./resume.controller');

var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'resume.json');

var router = express.Router();

router.get('/gen-info', controller.getGeneralInformation);
router.get('/per-obj', controller.getPersonalObjectives);
router.get('/education/college', controller.collegeHistory);
router.get('/education/certification', controller.certifications);
//router.put('/:id', controller.put);
//router.post('/:id', controller.post);
//router.delete('/:id', controller.delete);

module.exports = router;