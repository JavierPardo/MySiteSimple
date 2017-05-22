var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
exports.Tokenizer = function () {
  var _app;
  this.setApp = function (app) {
    _app = app;
  }
  this.validateToken=function(token) {

  // check header or url parameters or post parameters for token
  //var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, _app.get('secret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}
  this.sign = function (obj) {

    return jwt.sign(obj,
      _app.get('superSecret'), {
        expiresIn: "1 days" // expires in 24 hours
      });
  }
}
