var ObjectImageDb = require("./objectImageDb");
var validator = require("email-validator");
var utils = require('../utils').getInstance();
var fs = require('fs');
var cloudinary = require('cloudinary');
var utils = require('../utils').getInstance();
var localconfig = require('../config/local.env.sample'); // get our config file
var mongoose = require('mongoose');

var ObjectImage = function (data) {

  this.name = data.name;
  this.ObjectId = utils.encryptation.encrypt(data.ObjectId.toString());
  this.ObjectType = data.objectType;
  this.src = data.src;
  if (data._id)
    this.id = utils.encryptation.encrypt(data._id.toString());
}

ObjectImage.prototype.publicId = "";
ObjectImage.prototype.ObjectId = "";
ObjectImage.prototype.ObjectType = "";
ObjectImage.prototype.src = undefined;

ObjectImage.prototype.save = function () {
  var objImgDb = new ObjectImageDb();
  objImgDb.objectType = this.ObjectType;
  objImgDb.name = this.publicId;

  objImgDb.ObjectId = mongoose.mongo.ObjectId(utils.encryptation.decrypt(this.ObjectId));

  objImgDb.save();
}

ObjectImage.prototype.storeSrc = function (imagePath) {
  var self = this;
  return new Promise(function (resolve, rejected) {
    utils.fileManager.writeBufferToFile(self.src, imagePath).then(function () {
      console.log('-uploading:', imagePath)
      utils.fileManager.storeToCloud(imagePath).then(function () {
        console.log('--removing: ', localconfig.uploadFolder + "/" + imagePath)
        utils.fileManager.deleteFile(localconfig.uploadFolder + "/" + imagePath);
        self.publicId = imagePath;
        self.src = cloudinary.utils.url(imagePath);
        resolve();
      });
    });
  });
}

ObjectImage.getImages = function (parametersObject) {
  let self = this;
  let mydata = [];
  let promise = new Promise(function (resolve, reject) {
    ObjectImageDb.promiseFind(parametersObject)
      .then(function (data) {
        data.map(function (data) {
          mydata[mydata.length] = new ObjectImage(data);
        })
        resolve(mydata);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  })
  return promise;
}

module.exports = ObjectImage;
