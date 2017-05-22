var UserDb = require("./userDb");

var User = function (data) {

  this.name = data.usrName;
  this.password = data.pwd
  this.admin = data.email;
}

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

User.prototype.create = function () {

  var ret = {
    errors: [],
    success: false
  };

  var newUser = new UserDb({
    name: this.name,
    password: this.password,
    email: this.email,
    admin: false
  });

  var saving = newUser.save(function (err, product, numAffected) {

    }).then(function (user) {

      console.log('User saved successfully');
      ret.success = true;
    })
    .catch(function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
      ret.success = false;
    });
  return ret;
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
  }
  if (ret.errors.length == 0) {
    ret.success = true;
  }
  return ret;
}

module.exports = User;
