var localconfig = require('../config/local.env.sample'); // get our config file
var storage = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');
const stream = require("stream");

exports.FileManager = function () {
  var _app;

  this.setApp = function (app) {
    _app = app;
  }

  this.downloadFile = function (fromUrl, toFileName) {
    let http = require('http');
    let fs = require('fs');

    let file = fs.createWriteStream(image.name);
    let request = http.get(image.url, function (response) {
      response.pipe(file);
    });
  }

  this.writeBufferToFile = function (buffer, filePathName) {

    let gcs = storage({
      projectId: 'gymapp-174018',
      keyFilename: path.join(__dirname, '../config/GymApp-acea88cca092.json')
    });

    let bucket = gcs.bucket('lofty-mix-1468');
    let base64Data = buffer.replace(/^data:image\/jpeg;base64,/, ""),
      binaryData = new Buffer(base64Data, 'base64').toString('binary');

    let readStream = new stream.PassThrough();
    readStream.push(base64Data,'base64');
    readStream.end();
    let remoteWriteStream = bucket.file(filePathName).createWriteStream();
    readStream.pipe(remoteWriteStream);
    console.log('uploaded to google storage...');
    return new Promise(function (resolve, reject) {
          resolve();
    });
  }

  this.deleteFile = function (filePath) {
    console.log('--removing: ', filePath)
    require('fs').unlink(filePath, function (error) {
      if (error) {
        throw error;
      }
      console.log('---Deleted ', filePath, '!!');
    });
  };

  this.uploadFile = function (fromUrl, toUrl) {

    return new Promise(function (resolve, reject) {
      resolve();
    });
  }

  this.renameFile = function (oldName, newName) {
    require('fs').renameSync(localconfig.uploadFolder + "/" + oldName, localconfig.uploadFolder + "/" + newName);
  }

  this.storeToCloud = function (filePath) {
    var name = filePath;
    filePath = localconfig.uploadFolder + "/" + filePath;

    return this.uploadFile(filePath, name);
  }

}
