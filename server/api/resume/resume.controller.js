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
  res.json({
    data: generalInformation,
    errors: []
  });
};

exports.getPersonalObjectives = function (req, res) {
  var personalObjectives = [
    "Expand and improve my knowledge and my skills to solve problems efficiently, both in the workplace and personal.",
    "Learn new technologies with courses or on my own in order to be updated."
  ];
  res.json({
    data: personalObjectives,
    errors: []
  });
};


exports.collegeHistory = function (req, res) {
  var collegeHistory = [{
      'collegeName': 'Colegio Argentino Boliviano',
      'location': 'Santa Cruz de la Sierra - Boliviano',
      'startYear': '1995',
      'endYear': '2002'
    },
    {
      'collegeName': 'Centro Educativo Integral Cochabamba',
      'location': 'Cochabamba - Boliviano',
      'startYear': '2003',
      'endYear': '2003'
    },
    {
      'collegeName': 'Unidad Educativa “La Salle”',
      'location': 'Cochabamba - Boliviano',
      'startYear': '2004',
      'endYear': '2006'
    },
  ];
  res.json({
    data: collegeHistory,
    errors: []
  });
};



exports.certifications = function (req, res) {
  var certifications = [{
      'name': 'Scrum Master',
      'description': 'Scrum Master Certification',
      'instructor': 'Martin Alaimo ',
      'date': '2013 - 2015',
      'institution': 'Kleer',
    },
    {
      'name': 'Angular',
      'description': 'Angular Certification ',
      'instructor': 'Luis Aviles',
      'date': '2016',
      'institution': 'Tekhne',
    }
  ];
  res.json({
    data: certifications,
    errors: []
  });
};
