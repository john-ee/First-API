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
        if (err) {
          return res.status(500).send("There was a problem adding the info to the database");
        }
        res.status(200).send(user);
    });
});

// returns all Users
router.get('/', function (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});

// get a single User
router.get('/:id', function (req,res) {
  User.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found");
    res.status(200).send(user);
  });
});

// delete a User
router.delete('/:id', function (req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.status(500).send("There was aproblem deleting the user.");
    if (!user) return res.status(404).send("The user didnt exist.");
    res.status(200).send("User " + user.name + " was deleted.");
  });
});

router.put('/:id', function (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
      if (err) return res.status(500).send("There was a problem updating the user.");
      res.status(200).send(user);
  });
});

module.exports = router;
