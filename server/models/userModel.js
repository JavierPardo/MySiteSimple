var UserDb = require("./userDb");
var validator = require("email-validator");

var User = function (data) {

  this.userName = data.userName;
  this.name = data.name;
  this.password = data.password
  this.email = data.email;
  this.admin = false;
}

User.prototype.userName = "";
User.prototype.name = "";
User.prototype.password = "";
User.prototype.admin = "";

User.findById = function (id) {
  return new Promise(function (resolve, reject) {
    UserDb.findById(id, function (err, user) {
      if (err && err.length > 0)
        reject(err);
      else
        resolve(user);
    });
  });
}

User.findByEmailOrUserNameAndPassword = function (user) {
  return new Promise(function (resolve, reject) {
    UserDb.find(user, function (err, users) {
      if (err && err.length > 0)
        reject(err);
      else
        resolve(users);
    });
  });
}

User.prototype.create = function () {

  var newUser = new UserDb({
    name: this.name,
    password: this.password,
    email: this.email,
    userName: this.userName,
    admin: false
  });

  return newUser.save(function (err, product, numAffected) {

    if (err) {
      console.log(err);
      throw err;
    }
    else{
      console.log('userCreated!!');
    }
  });
}

User.prototype.validate = function (isNew) {

  var ret = {
    errors: [],
    success: false
  };

  if (!this.name) {
    ret.errors.push("user.register.nameRequired");
  }
  if (!this.password) {
    ret.errors.push("user.register.passwordRequired");
  }
  if (!this.email) {
    ret.errors.push("user.register.emailRequired");
  } else if (!validator.validate(this.email)) {
    ret.errors.push({key:"user.emailNotValid"});
  }
  if (ret.errors.length == 0) {
    ret.success = true;
  }
  return ret;
}

module.exports = User;
