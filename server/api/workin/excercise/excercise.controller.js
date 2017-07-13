'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var Excercise = require('../../../models/excerciseModel');
var User = require('../../../models/userModel');
var ObjectImage = require('../../../models/objectImageModel');
var bodyParser = require('body-parser');
var utils = require('../../../utils').getInstance();
var validator = require("email-validator");

exports.create = function (req, res, user) {
  var excercise = new Excercise(req.body);

  var resJson = excercise.validate();
  if (resJson.success) {
    excercise.user = user;
    var dataCreate = excercise.create();
    var ret = {
      errors: [],
      success: false
    };

    dataCreate.then(function (excer) {
        console.log('Excersice created successfully');
        res.json({
          data: {
            messages: [{
              key: 'excercise.created',
              params: []
            }],
            excerciseId: utils.encryptation.encrypt(excer._id.toString())
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
          errors: err
        });
      })
  }
}

exports.update = function (req, res, user) {
  var excercise = new Excercise(req.body);

  var resJson = excercise.validate();
  if (resJson.success) {
    excercise.user = user;
    var ret = {
      errors: [],
      success: false
    };
    excercise.update()
      .then(function (user) {
        console.log('Excersice updated successfully');
        res.json({
          data: {
            messages: [{
              key: 'excercise.updated',
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
          errors: err
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

exports.getExcerciseImages = function (req, res, user) {
  var excercise = Excercise.getExcercise({
      _id: utils.encryptation.decrypt(req.params.id.toString())
    },
    function (excer) {
      var images = excer.getImages()
        .then(function (images) {
          res.json({
            data: {
              images: images
            },
            messages: [],
            errors: []
          });
        });
    }
  );
}

exports.getExcercise = function (req, res, user) {
  var excercise = Excercise.getExcercise({
      _id: utils.encryptation.decrypt(req.params.id.toString())
    },
    function (excer) {
      if (excer) {
        if (user._id.toString() !== excer.user.toString()) {
          delete excer.id;
        }
        delete excer.user;
        res.json({
          data: {
            excercise: excer
          },
          messages: [],
          errors: []
        });
      } else {
        return res.status(404).send({
          success: false,
          message: 'invalid token.'
        });

      }
    }
  );
}
exports.uploadImages = function (req, res, user) {
  var excercise = Excercise.getExcercise({
      _id: utils.encryptation.decrypt(req.body.id.toString())
    },
    function (excer) {
      delete excer.user;
      excer.SaveImages(req.body.images);
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
