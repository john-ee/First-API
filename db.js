var mongoose = require('mongoose');
mongoose.connect('mongodb://root:password@ds149431.mlab.com:49431/jnapi')
var conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:')); 
