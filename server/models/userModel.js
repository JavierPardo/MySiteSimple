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

User.findById = function (id, callback) {
  db.get('users', {
    id: id
  }).run(function (err, data) {
    if (err) return callback(err);
    callback(null, new User(data));
  });
}

User.findByEmailOrUserNameAndPassword = function (user, callbackError, callbackSuccess) {
  var userFound;
  var userToFind;  
  if (validator.validate(user.email)) {
    userToFind = {
      email: user.email,
      password: user.pwd
    }
  } else {
    userToFind = {
      userName: user.email,
      password: user.pwd
    };
  }
  return new Promise(function (resolve, reject) {
    UserDb.find(userToFind , function (err, users) {
    if(err && err.length>0)
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
  });
}

User.prototype.validate = function (isNew) {

  var ret = {
    errors: [],
    success: false
  };

  if (!this.name) {
    ret.errors.push("Name is required");
  }
  if (!this.password) {
    ret.errors.push("Password is required");
  }
  if (!this.email) {
    ret.errors.push("Email is required");
  } else if (!validator.validate(this.email)) {
    ret.errors.push("Email is not valid");
  }
  if (ret.errors.length == 0) {
    ret.success = true;
  }
  return ret;
}

module.exports = User;
