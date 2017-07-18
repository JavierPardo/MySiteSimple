'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: 'proyectofullstack-secret',

  // Control debug level for modules using visionmedia/debug
  DEBUG: '',
  secret: 'JavierSecretKey',
  encKey: 'encrypt!@#!%%',
  database: 'mongodb://root:root@ds149511.mlab.com:49511/usrsdb',
  uploadFolder: __dirname + '\\uploadFolder',
  imagesUrl:'/Images',
  cloudinary: {
    api_secret: 'O51hmGXG2sGBpjvEwyfsXGvTHkI',
    api_key: '323896856514465',
    cloud_name: 'dbas3m4wb'
  }
};
