var mongoose = require('mongoose');
var DeviceSchema = new mongoose.Schema({
  name: String,
  MACaddress: String,
  _software_id : Schema.Types.ObjectId
});
mongoose.model('Device', DeviceSchema);

module.exports = mongoose.model('Device');
