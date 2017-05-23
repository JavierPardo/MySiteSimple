// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise =Promise;
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('UserDb', {
    userName:String, 
    name: String, 
    password: String, 
    admin: Boolean , 
    email: String 
});