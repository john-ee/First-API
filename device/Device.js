var mongoose = require('mongoose');
var DeviceSchema = new mongoose.Schema({
  name: String,
  MACaddress: String,
  software : { type: mongoose.Schema.Types.ObjectId, ref: 'Software' }
});
mongoose.model('Device', DeviceSchema);

module.exports = mongoose.model('Device');
