var strings = require('./strings');
var mongoose = require('mongoose');
console.log(strings.mongoDBuri);
mongoose.connect(strings.mongoDBuri);
//mongoose.connect('mongodb://localhost/test') // Not working
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback() {
  console.log("Opened connection to Database");
});
