'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'resume.json');
var bodyParser = require('body-parser');
var User = require('../../models/userModel');
var utils = require('../../utils').getInstance();


exports.authenticate = function (req, res) {
  console.log(req.body.email);
  console.log(req.body.pwd);
  var userDb = User.findByEmailOrUserNameAndPassword({
      userName: req.body.email,
      password: req.body.pwd,
      email: req.body.email
    })
    .then(function (data) {
      if (data.length != 1) {
        res.json({
          data: {},
          errors: ["Email, Username or Password is wrong"]
        });
        res.statusCode
      } else {
        data = data[0];
        var token = utils.tokenizer.sign({
          id: data._id
        });
        console.log('user logged: ',data._id);
        token = utils.encryptation.encrypt(token);

        res.json({
          data: {
            token: {
              value: token
            },
            profile: {
              name: data.name,
              lastname: 'PG'
            }
          },
          errors: []
        });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.json({
        data: {},
        errors: [err]
      });
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

  var ret = {
    errors: [],
    success: false
  };
  dataCreate.then(function (user) {

      console.log('User saved successfully');
      res.json({
        data: {
          messages: ["your Email will be verified soon."]
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
