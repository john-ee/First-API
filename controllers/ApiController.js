var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var User = require('../models/User');

router.post('/authenticate', function(req, res) {
  User.findOne({
    name : req.body.name
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.status(404).send("Authentication failed. User not found.");
    } else if (user) {
      if (user.password != req.body.password) {
        res.status(400).send("Authentication failed. Wrong password.");
      } else {
        var token = jwt.sign(user, 'secret', {
          expiresIn: 60*10
        });
        res.status(200).json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  })
});

module.exports = router;
