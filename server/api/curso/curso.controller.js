'use strict';

var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'cursos.json');

// Get list of cursos
exports.getAll = function (req, res) {
    jsonfile.readFile(FILE, function (err, obj) {
        res.json(obj);
    });
};

exports.get = function (req, res) {
    jsonfile.readFile(FILE, function (err, obj) {
        res.json(obj.cursos[req.params.id]);
    });
};


