var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var Device = require('./Device');
var Software = require('../software/Software');

var software_id;
var Blank;
Software.findOne({ name: 'Blank'}, function (err, software) {
  if (err) console.log('Error searching for Blank.');
  if (!software) console.log('Blank not in DB.');
  console.log(software._id + ' ' + software.name + ' ' + software.description);
  Blank = software;
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

// returns all Devices
router.get('/', function (req, res) {
  Device.find({}, function (err, devices) {
    if (err) return res.status(500).send("There was a problem finding the devices.");
    res.status(200).send(devices);
  });
});

module.exports = router;
