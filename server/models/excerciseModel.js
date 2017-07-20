var ExcerciseDb = require("./excerciseDb");
var validator = require("email-validator");
var utils = require('../utils').getInstance();
var fs = require('fs');
var ObjectImageModel = require('./objectImageModel');
var ObjectType = require('./objectTypeEnum');
var localconfig = require('../config/local.env.sample'); // get our config file
var storage = require('@google-cloud/storage');
var path = require("path");
var Excercise = function (data) {

  this.name = data.name;
  this.description = data.description;
  this.recommendation = data.recommendation;
  this.user = data.User;
  if (data._id)
    this.id = utils.encryptation.encrypt(data._id.toString());
}

Excercise.prototype.name = "";
Excercise.prototype.description = "";
Excercise.prototype.recommendation = "";
Excercise.prototype.id = 0;
Excercise.prototype.user = undefined;

Excercise.prototype.create = function () {

  var newExcercise = new ExcerciseDb({
    name: this.name,
    description: this.description,
    recommendation: this.recommendation,
    User: this.user
  });

  return newExcercise.save(function (err, excercise, numAffected) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}

Excercise.prototype.update = function () {

  var self = this;

  var promise = new Promise(function (resolve, reject) {
    ExcerciseDb.find({}, function (err, excercises) {
      if (excercises.length != 1)
        reject(err);
      else {
        var excer = excercises[0];

        excer.name = self.name;
        excer.description = self.description;
        excer.recommendation = self.recommendation;
        excer.save(function (err, excercise, numAffected) {
          if (err) {
            console.log(err);
            throw err;
          }
          resolve();
        });
      }
    })
  });
  return promise;
}


Excercise.prototype.getImages = function () {

  var self = this;
  var promise = new Promise(function (resolve, reject) {
    ObjectImageModel.getImages({
      ObjectId: utils.encryptation.decrypt(self.id),
      objectType: ObjectType.Excercise
    }).then(function (images) {
      resolve(images);
    })
  });
  return promise;

}

Excercise.prototype.validate = function (isNew) {

  var ret = {
    errors: [],
    success: false
  };

  if (!this.name) {
    ret.errors.push("Name is required");
  }

  if (ret.errors.length == 0) {
    ret.success = true;
  }
  return ret;
}
Excercise.prototype.deleteAllImages = function () {
  var self = this;
  ObjectImageModel.deleteImagesFromObject({
    ObjectId: utils.encryptation.decrypt(self.id),
    objectType: ObjectType.Excercise
  });
}

Excercise.prototype.SaveImages = function (images) {
  var self = this;
  //ObjectImageModel.downloadImages(images);
  self.deleteAllImages();
  for (var i = 0; i < images.length; i++) {
    let imageURL = self.id + "-" + i;

    let objectImage = new ObjectImageModel({
      name: imageURL,
      ObjectId: utils.encryptation.decrypt(self.id),
      objectType: ObjectType.Excercise
    });

    if (images[i].url) {
      objectImage.src = images[i].url
      objectImage.storeSrc(imageURL).then(
        function () {
          objectImage.save();
        });
    } else {
      console.log('renaming ', images[i].src, ' to ', imageURL);

      var options = {
        destination: imageURL
      };
      let gcs = storage({
        projectId: localconfig.googleCloudStorage.projectId,
        keyFilename: path.join(__dirname, '../config/GymApp-acea88cca092.json')
      });

      let bucket = gcs.bucket(localconfig.googleCloudStorage.bucket);
      if (imageURL != images[i].name) {
        console.log('delete:', images[i].name);
        bucket.deleteFiles({
          prefix: images[i].name
        }, console.log)
        console.log('upload:', images[i].src, " as ", imageURL);
        bucket.upload(images[i].src, options, function (err, file) {});
      }
      objectImage.save();
    }
  }
}

Excercise.getAllExcercises = function (handleResponse) {
  let mydata = [];
  ExcerciseDb.promiseFind({})
    .then(function (data) {
      data.map(function (data) {
        data.UserId = undefined;
        mydata[mydata.length] = new Excercise(data);
      })
      handleResponse(mydata);
    })
    .catch(function (error) {
      console.log(error);
    });
  return mydata;
}

Excercise.getExcercise = function (excerciseToFind, handleResponse) {
  var mydata = null;
  ExcerciseDb.promiseFind(excerciseToFind)
    .then(function (data) {
      data.map(function (data) {
        mydata = new Excercise(data);
      })
      handleResponse(mydata);
    })
    .catch(function (error) {
      console.log(error);
    });
  return mydata;
}
module.exports = Excercise;
