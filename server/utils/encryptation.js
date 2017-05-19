
var crypto = require('crypto'),
  algorithm = 'aes-256-ctr';
  
exports.Encryptation = function () {
 var _app;
    this.setApp=function(app) {
        _app=app;
    }
 
  this.encrypt=function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, _app.get('encryptationKey'))
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
  }

  this.decrypt=function (text) {
    var decipher = crypto.createDecipher(algorithm, _app.get('encryptationKey'))
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}