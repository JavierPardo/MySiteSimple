'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'resume.json');
var bodyParser = require('body-parser');
var utils = require('../../utils');


exports.userController = function () {
  this.authenticate = function (req, res) {
    console.log(req.query.usr);
    console.log(req.query.psw);

    var token = utils.getInstance().tokenizer.sign({
      id: req.query.usr + "-" + req.query.psw
    });
    token = utils.getInstance().encryptation.encrypt(token);
    console.log(token);
    res.json({
      data: {
        token: token
      },
      errors: []
    });
  }

  this.validate = function (req, res) {
    console.log(req.query.tkn);
    console.log("-+-");

    console.log(utils.getInstance().encryptation.decrypt(req.query.tkn));
    res.json({
      data: {},
      errors: []
    });
  }


};
