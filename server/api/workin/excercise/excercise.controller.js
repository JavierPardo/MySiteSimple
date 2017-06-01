'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var Excercise = require('../../../models/excerciseModel');
var bodyParser = require('body-parser');
var utils = require('../../../utils').getInstance();
var validator = require("email-validator");

exports.create = function (req, res) {
  var excercise = new Excercise(req.body);

  var resJson = excercise.validate();
  if (resJson.success) {
    var dataCreate = excercise.create();
    var ret = {
    errors: [],
    success: false
  };

  dataCreate.then(function (user) {
      console.log('Excersice created successfully');
      res.json({
        data: {
          messages: [{
            key: 'excercise.created',
            params: []
          }]
        },
        errors: []
      });
    })
    .catch(function (err) {
      ret.success = false;
      res.json({
        data: {
          messages: []
        },
        errors: validUser.errors
      });
    })
  }
  
  
}
