var mongoose = require('mongoose');
mongoose.connect('mongodb://root:password@ds149431.mlab.com:49431/jnapi')
//mongoose.connect('mongodb://localhost/test') // Not working
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback() {
  console.log("Open connection to Database");
});
