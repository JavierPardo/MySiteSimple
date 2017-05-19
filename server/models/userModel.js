var User = function (data) {
  this.name;
  this.password;
  this.admin;
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

module.exports = User;
