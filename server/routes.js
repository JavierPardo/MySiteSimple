/**
 * Main application routes
 */

'use strict';
const path = require('path');
var errors = require('./components/errors');

module.exports = function (app) {

  // Insert routes below
  app.use('/api/resume', require('./api/resume'));
  app.use('/api/user', require('./api/user'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // For all GET requests, send back index.html
  // so that PathLocationStrategy can be used
  app.get('/resume/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/../dist/index.html'));
  });
};
