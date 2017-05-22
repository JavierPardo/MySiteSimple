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

User.prototype.create = function (res) {

  var newUser = new UserDb({
    name: this.name,
    password: this.password,
    admin: false
  });

  // save the sample user
  newUser.save(function (err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({
      success: true
    });
  });
}

module.exports = User;
