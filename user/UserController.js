var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var User = require('./User');

// creates a new User
router.post('/', function (req,res) {
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password
  },
  function (err, user) {
      if (err) return res.status(500).send("There was a problem adding the info to the database");
      res.status(200).send(user);
  });
});

// returns all Users
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("There was a proleme finding the users.");
    res.status(200).send(users);
  })
})

module.exports = router;
