var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
