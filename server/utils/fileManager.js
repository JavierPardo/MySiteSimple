var localconfig = require('../config/local.env.sample'); // get our config file
var storage = require('@google-cloud/storage');
const path = require('path');

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

    var gcs = storage({
      projectId: 'gymapp-174018',
      keyFilename: path.join(__dirname, '../config/GymApp-acea88cca092.json')
    });

var bucket = gcs.bucket('lofty-mix-1468');
    var filePath = localconfig.uploadFolder + "/dontdelete";// + filePath;
    base64Data = buffer.replace(/^data:image\/jpeg;base64,/, ""),
      binaryData = new Buffer(base64Data, 'base64').toString('binary');

    return new Promise(function (resolve, reject) {
      require("fs").writeFile(filePath, binaryData, "binary", function (err) {
        if (err) reject(err)
        else {
          
var localReadStream = fs.createReadStream(filePath);
var remoteWriteStream = bucket.file(filePathName).createWriteStream();
localReadStream.pipe(remoteWriteStream);
          resolve();
        }
      });
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
