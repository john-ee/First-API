var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true}));
var Device = require('./Device');
var Software = require('../software/Software');

Software.findOne({ name: 'Blank'}, function (err, software) {
  if (err) console.log('Error searching for Blank.');
  if (!software) console.log('Blank not in DB.');
  console.log(software.id + ' ' + software.name + ' ' + software.description);
});

router.post('/', function (req, res) {
  if (!req.body.software) {
    var software_id = Blank._id;
    console.log('Using blank soft ' + Blank._id);
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

// returns all Users
router.get('/', function (req, res) {
  Device.find({}, function (err, devices) {
    if (err) return res.status(500).send("There was a problem finding the devices.");
    res.status(200).send(devices);
  });
});

module.exports = router;
