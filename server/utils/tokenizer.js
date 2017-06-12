var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
exports.Tokenizer = function () {
  var _app;
  this.setApp = function (app) {
    _app = app;
  }
  this.validateToken = function (token) {
    return new Promise(function (resolve, reject) {
      if (token) {
        validation = jwt.verify(token, _app.get('superSecret'), function (err, decoded) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });

      } else {
        reject();
      }
    });
  }
  this.sign = function (obj) {
    return jwt.sign(obj,
      _app.get('superSecret'), {
        expiresIn: "1 days" // expires in 24 hours
      });
  }
  this.decode = function (tkn) {
    return jwt.decode(tkn);;
  }
}
