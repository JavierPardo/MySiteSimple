var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise =Promise;

var _objectImageDb =mongoose.model('ObjectImage', {
    ObjectId:{
      type: Schema.ObjectId
    }, 
    objectType: String, 
    name: String,
});

_objectImageDb.promiseFind = function (objectImage){

var promise= new Promise(function (resolve, reject) {

    _objectImageDb.find(objectImage, function (err, objectImages) {        
      if (err && err.length > 0)
        reject(err);
      else
        resolve(objectImages);
    });

  });
  return promise;
}

  
module.exports = _objectImageDb;