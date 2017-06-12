'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var Excercise = require('../../../models/excerciseModel');
var User = require('../../../models/userModel');
var bodyParser = require('body-parser');
var utils = require('../../../utils').getInstance();
var validator = require("email-validator");

exports.create = function (req, res, user) {
  var excercise = new Excercise(req.body);
  
  var resJson = excercise.validate();
  if (resJson.success) {
    excercise.user=user;
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

exports.getAll = function (req, res) {
  var excercises = Excercise.getAllExcercises(
    function (data) {

      res.json({
        data: {
          excercises: data
        },
        messages: [],
        errors: []
      });
    }
  );
}

exports.getExcercise = function (req, res,user) {
  var excercise = Excercise.getExcercise({
      _id: utils.encryptation.decrypt(req.params.id.toString())
    },
    function (excer) {
      console.log(excer, user)
      if (excer.User != user) {
        excer.Id = undefined;
      }
      excer.UserId = undefined;
      res.json({
        data: {
          excercise: excer
        },
        messages: [],
        errors: []
      });
    }
  );
}
