var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
exports.Tokenizer = function () {
  var _app;
  this.setApp = function (app) {
    _app = app;
  }
  this.sign = function (obj) {

    return jwt.sign(obj,
      _app.get('superSecret'), {
        expiresIn: "1 days" // expires in 24 hours
      });
  }
}
