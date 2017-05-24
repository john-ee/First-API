var express = require('express');
var morgan = require('morgan');
var app = express();
var db = require('./db');

app.use(morgan('dev'));

var UserController = require('./controllers/UserController');
app.use('/users', UserController);
var SoftwareController = require('./controllers/SoftwareController');
app.use('/softwares', SoftwareController);
var DeviceController = require('./controllers/DeviceController');
app.use('/devices', DeviceController);
var ApiController = require('./controllers/ApiController');
app.use('/api', ApiController);

module.exports = app;
