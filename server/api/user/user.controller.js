'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'resume.json');
var bodyParser = require('body-parser');
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
