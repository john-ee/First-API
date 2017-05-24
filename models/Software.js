var mongoose = require('mongoose');
var SoftwareSchema = new mongoose.Schema({
  name: { String, unique: true },
  description: String
});
mongoose.model('Software', SoftwareSchema);

module.exports = mongoose.model('Software');
