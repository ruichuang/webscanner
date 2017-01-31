var express = require('express');
var router = express.Router();
var fs = require('fs');

var dlInfo;
var fname, lname, expirationDate, dob, issueDate, postCode, sex, address, city, province, dlNum;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Driver Licence Info Display',fname: fname, lname: lname, expirationDate: expirationDate, dob: dob, issueDate: issueDate, postCode: postCode, sex: sex, address: address, city: city, province: province, dlNum: dlNum });

});

router.post('/', function (req, res, next) {

  console.log(req.body);
  dlInfo = req.body.dlInfo;

  var regex1 = /DBA(.*)\nDCS(.*)\nDCT(.*)\nDBD(.*)\nDBB(.*)\nDBC(.*)\n/g;
  var regex2 = /DAG(.*)\n/g; //DAI(.*)\nDAJ(.*)\nDAQ(.*)\n
  var regex3 = /DAI(.*)\nDAJ(.*)\n/g;
  var regex4 = /DAQ(.*)\n/g;
  var match1 = regex1.exec(dlInfo);
  var match2 = regex2.exec(dlInfo);
  var match3 = regex3.exec(dlInfo);
  var match4 = regex4.exec(dlInfo);
  expirationDate = match1[1];
  lname = match1[2];
  fname = match1[3];
  issueDate = match1[4];
  dob = match1[5];
  sex = match1[6];
  address = match2[1];
  console.log(address);
  city = match3[1];
  province = match3[2];
  dlNum = match4[1];

})

module.exports = router;