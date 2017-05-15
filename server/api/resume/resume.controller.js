'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'resume.json');
var bodyParser = require('body-parser');


exports.getGeneralInformation = function (req, res) {
  var generalInformation = {
    'name': 'Javier P G',
    'location': 'Cochabamba - Bolivia',
    'email': [
      'javier_p_g1989@hotmail.com',
      'javier.p.g1989@gmail.com'
    ],
    'birthdate': 'September, 1989'
  };
  res.json({data:generalInformation, errors:[]});
};
exports.getPersonalObjectives = function (req, res) {
  var personalObjectives = 
  [
    "Expand and improve my knowledge and my skills to solve problems efficiently, both in the workplace and personal.",
    "Learn new technologies with courses or on my own in order to be updated."
  ];
  res.json({data:personalObjectives, errors:[]});
};
