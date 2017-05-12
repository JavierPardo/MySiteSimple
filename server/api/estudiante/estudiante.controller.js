'use strict';

var _ = require('lodash');
var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'cursos.json');
var bodyParser = require('body-parser');

exports.get = function (req, res) {
    jsonfile.readFile(FILE, function (err, obj) {
        var array = _.reduce(_.map(obj.cursos, 'inscritos'), function (result, arr) {
            return result.concat(arr);
        }, []);
        var result = _.find(array, function (item) {
            return item.id == req.params.id;
        });
        if (!result) {
            res.status(404).send('Error 404');
        } else {
            res.status(200).type('json').json(result);

//            res.type('.html');              // => 'text/html'
//            res.type('html');               // => 'text/html'
//            res.type('json');               // => 'application/json'
//            res.type('application/json');   // => 'application/json'
//            res.type('png');                // => image/png:
        }
    });
};


exports.put = function (req, res, next) {
    jsonfile.readFile(FILE, function (err, obj) {
        var result = null;
        _.forEach(obj.cursos, function (curso) {
            _.forEach(curso.inscritos, function (estudiante) {
                if (estudiante.id == req.params.id) {
                    estudiante.nombre = req.body.nombre;
                    estudiante.apellido = req.body.apellido;
                    estudiante.fechaNacimiento = req.body.fechaNacimiento;
                    result = estudiante;
                }
            });
        });

        if (!result) {
            res.status(404).send('Error 404');
        } else {
            setTimeout(function() {
                jsonfile.writeFile(FILE, {cursos: obj.cursos}, function (err) {
                    console.error(err);
                    //res.status(500).send('Error 500');
                });
                res.status(200).type('json').json(result);
            }, 2000);//force delay of 2 seconds.
        }

    });
};




