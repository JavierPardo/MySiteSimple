'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'resume.json');
var bodyParser = require('body-parser');
var User = require('../../models/userModel');
var utils = require('../../utils').getInstance();


exports.authenticate = function (req, res) {
  console.log(req.query.usr);
  console.log(req.query.psw);
  utils
  var token = utils.tokenizer.sign({
    id: req.query.usr + "-" + req.query.psw
  });
  token = utils.encryptation.encrypt(token);
  res.json({
    data: {
      token: token
    },
    errors: []
  });
}

exports.validate = function (req, res) {
  res.json({
    data: {},
    errors: []
  });
};

exports.register = function (req, res) {

  var newUser = new User(req.body);
  var validUser = newUser.validate(true);
  if (!validUser.success) {
    res.json({
      data: {
        messages: []
      },
      errors: validUser.errors
    });
    return;
  }
  var dataCreate = newUser.create();
  console.log(dataCreate);
  if (dataCreate && dataCreate.success)
    res.json({
      data: {
        messages: ["your Email will be verified soon."]
      },
      errors: []
    });
  else
    res.json({
      data: {
        messages: []
      },
      errors: validUser.errors
    });
};

exports.signin = function (req, res) {

  res.json({
    data: {
      token: {
        value: "mytoken"
      },
      profile: {
        name: "Javier PG",
        lastname: 'PG'
      }
    },
    errors: []
  });
};