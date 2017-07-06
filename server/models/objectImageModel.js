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

ObjectImage.downloadImages = function (images) {

  images.forEach(function (image) {
    if (image.url) {
      utils.fileManager.downloadFile(image.url,image.name);
    }
  });

}

ObjectImage.deleteImagesFromObject = function (object) {

  ObjectImageDb.find(object, function (err, objs) {
    objs.forEach(function (objImg) {
      ObjectImageDb.findByIdAndRemove(objImg.id, function (err, offer) {
        if (err) {
          throw err;
        }
      });
    });
  });
}

ObjectImage.prototype.save = function () {
  var objImgDb = new ObjectImageDb();
  objImgDb.objectType = this.ObjectType;
  objImgDb.name = this.name;

  objImgDb.ObjectId = mongoose.mongo.ObjectId(utils.encryptation.decrypt(this.ObjectId));

  objImgDb.save();
}


ObjectImage.prototype.storeSrc = function (imagePath1) {
  var self = this;
  
    cloudinary.config({
      cloud_name: localconfig.cloudinary.cloud_name,
      api_key: localconfig.cloudinary.api_key,
      api_secret: localconfig.cloudinary.api_secret
    });
  return new Promise(function (resolve, rejected) {
    utils.fileManager.writeBufferToFile(self.src, imagePath1).then(function () {
      console.log('-uploading:', imagePath1)
      utils.fileManager.storeToCloud(imagePath1).then(function () {
         utils.fileManager.deleteFile(localconfig.uploadFolder + "/" + imagePath1 );
         self.name = imagePath1;
         self.src = cloudinary.utils.url(imagePath1);
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
