var ExcerciseDb = require("./excerciseDb");
var validator = require("email-validator");

var Excercise = function (data) {

  this.name = data.name;
  this.description = data.description;
  this.recommendation = data.recommendation;
}

Excercise.prototype.name = "";
Excercise.prototype.description = "";
Excercise.prototype.recommendation = "";

Excercise.prototype.create = function () {

  var newExcercise = new ExcerciseDb({
    name: this.name,
    description: this.description,
    recommendation: this.recommendation
  });

  return newExcercise.save(function (err, excercise, numAffected) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
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
Excercise.getAllExcercises = function (handleResponse) {
  var mydata = [];
  ExcerciseDb.promiseFind({})
    .then(function (data) {
      data.map(function (data) {

        mydata[mydata.length] = new Excercise(data);
      })
      handleResponse(mydata);
    })
    .catch(function (error) {
      console.log(error);
    });
  return mydata;
}
module.exports = Excercise;
