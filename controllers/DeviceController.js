var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var Device = require('../models/Device');
var Software = require('../models/Software');

var software_id;
var Blank;
Software.findOne({ name: 'Blank'}, function (err, software) {
  if (err) console.log('Error searching for Blank.');
  if (!software) console.log('Blank not in DB.');
  console.log(software._id + ' ' + software.name + ' ' + software.description);
  Blank = software;
});


// ********************** Public Routes **********************

// returns all Devices
router.get('/', function (req, res) {
  Device
    .find({}, function (err, devices) {
      if (err) return res.status(500).send("There was a problem finding the devices.");
      res.status(200).send(devices);
    })
    .populate('software');
});

// get a single Device by id
router.get('/:id', function (req,res) {
  Device
    .findById(req.params.id, function (err, device) {
      if (err) return res.status(500).send("There was a problem finding the device.");
      if (!device) return res.status(404).send("No Device found");
      res.status(200).send(device);
    })
    .populate('software');
});

// get a single Device by name
router.get('/byName/:name', function (req,res) {
  Device
    .find({ name: req.params.name }, function (err, device) {
      if (err) return res.status(500).send("There was a problem finding the Device.");
      if (!device) return res.status(404).send("No Device found");
      res.status(200).send(device);
    })
    .populate('software');
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

router.post('/', function (req, res) {
  console.log(req.body.software);
  if (!req.body.software) {
    software_id = Blank._id;
    console.log('Using blank soft ' + Blank._id);
  }
  else {
    Software.findOne({ name: req.body.software}, function (err, software) {
      if (err || !software) software_id = Blank._id;
      else software_id = software._id;
      console.log('Soft id ' + software_id);
    });
  }
  Device.create ({
      name : req.body.name,
      MACaddress : req.body.MACaddress,
      software : software_id
  },
  function (err, device) {
      if (err) {
        return res.status(500).send("There was a problem adding the info to the database");
      }
      res.status(200).send(device);
  });
});

// delete a Device
router.delete('/:id', function (req, res) {
  Device.findByIdAndRemove(req.params.id, function(err, device) {
    if (err) return res.status(500).send("There was aproblem deleting the device.");
    if (!device) return res.status(404).send("The Software didnt exist.");
    res.status(200).send("Device " + device.name + " was deleted.");
  });
});

// updates a Device
router.put('/:id', function (req, res) {
  Device.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, device) {
      if (err) return res.status(500).send("There was a problem updating the device.");
      res.status(200).send(device);
  });
});

router.put('/:id/software/:name', function (req, res) {
  if (!req.params.name) {
    software_id = Blank._id;
    console.log('Using blank soft ' + Blank._id);
  }
  else {
    Software.findOne({ name: req.params.name}, function (err, software) {
      if (err || !software) software_id = Blank._id;
      else software_id = software._id;
      console.log('Soft id ' + software_id);
    });
  }
  Device
    .findOneAndUpdate({_id: req.params.id}, { software: software_id }, function (err, device) {
      if (err) return res.status(500).send("There was a problem updating the device.");
      res.status(200).send(device);
    });
});

module.exports = router;
