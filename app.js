var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./controllers/UserController');
app.use('/users', UserController);
var SoftwareController = require('./controllers/SoftwareController');
app.use('/softwares', SoftwareController);
var DeviceController = require('./controllers/DeviceController');
app.use('/devices', DeviceController);

module.exports = app;
