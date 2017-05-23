var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);
var SoftwareController = require('./software/SoftwareController');
app.use('/softwares', SoftwareController);

module.exports = app;
