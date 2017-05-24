var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var Software = require('../models/Software');

// ********************** Public Routes **********************

// returns all Softwares
router.get('/', function (req, res) {
  Software.find({}, function (err, softwares) {
    if (err) return res.status(500).send("There was a problem finding the Softwares.");
    res.status(200).send(softwares);
  });
});

// get a single Software by id
router.get('/:id', function (req,res) {
  Software.findById(req.params.id, function (err, software) {
    if (err) return res.status(500).send("There was a problem finding the Software.");
    if (!software) return res.status(404).send("No Software found");
    res.status(200).send(software);
  });
});

// get a single Software by name
router.get('/byName/:name', function (req,res) {
  Software.find({ name: req.params.name }, function (err, software) {
    if (err) return res.status(500).send("There was a problem finding the Software.");
    if (!software) return res.status(404).send("No Software found");
    res.status(200).send(software);
  });
});


// ********************** Private Routes **********************

// route middleware to verify a token
router.use(function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err) {
        res.status(400).send("Failed to authenticate token.");
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //there is no token
    return res.status(403).send("No token provided");
  }
});

// creates a new Software
router.post('/', function (req,res) {
  Software.create({
      name : req.body.name,
      description : req.body.description
    },
    function (err, software) {
        if (err) {
          return res.status(500).send("There was a problem adding the info to the database");
        }
        res.status(200).send(software);
    });
});

// delete a Software
router.delete('/:id', function (req, res) {
  Software.findByIdAndRemove(req.params.id, function(err, software) {
    if (err) return res.status(500).send("There was aproblem deleting the software.");
    if (!software) return res.status(404).send("The Software didnt exist.");
    res.status(200).send("Software " + Software.name + " was deleted.");
  });
});

// updates a Software
router.put('/:id', function (req, res) {
  Software.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, software) {
      if (err) return res.status(500).send("There was a problem updating the Software.");
      res.status(200).send(software);
  });
});


module.exports = router;
