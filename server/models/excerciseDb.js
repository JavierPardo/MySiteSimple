// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise =Promise;
// set up a mongoose model and pass it using module.exports
var _excerciseDb =mongoose.model('excercise', {
    name:String, 
    description: String, 
    recommendation: String
});

_excerciseDb.promiseFind = function (excercise){

var promise= new Promise(function (resolve, reject) {

    _excerciseDb.find(excercise, function (err, excercises) {        
      if (err && err.length > 0)
        reject(err);
      else
        resolve(excercises);
    });

  });
  return promise;
}

  
module.exports = _excerciseDb;