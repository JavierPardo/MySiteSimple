/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var morgan = require('morgan');
var config = require('./config/environment');
var utils = require("./utils")
var localconfig = require('./config/local.env.sample'); // get our config file
var mongoose    = require('mongoose');
 
// Setup server
var app = express();
//mongoose.connect(localconfig.database); // connect to database
app.set('superSecret', localconfig.secret); 
app.set('encryptationKey', localconfig.encKey); 
var server = require('http').createServer(app);
require('./config/express')(app);
app.use(morgan('dev'));

utils.getInstance();
utils.setApp(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;