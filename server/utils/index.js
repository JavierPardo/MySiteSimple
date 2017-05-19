var crypt = require('./encryptation');
var tkn = require('./tokenizer');

module.exports = (function () {
  var _instance;
  var _app;

  function createInstance() {
    var object = {
      encryptation: new crypt.Encryptation(),
      tokenizer: new tkn.Tokenizer(),
    };

    return object;
  }

  function setApp(app) {

    if (_instance) {
      _instance.encryptation.setApp(app);
      _instance.tokenizer.setApp(app);
    }

  }
  return {
    getInstance: function () {
      if (!_instance) {
        _instance = createInstance();
      }
      return _instance;
    },
    setApp: setApp
  };
})();
