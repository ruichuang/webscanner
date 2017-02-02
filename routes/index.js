var express = require('express');
var router = express.Router();
var fs = require('fs');

var dlInfo;
var fname, lname, expirationDate, dob, issueDate, postCode, sex, address, city, province, dlNum;
var sessionKey;
var dataSet = {};



/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(dataSet);
  var key = req.query.key;

  if (dataSet[key]) {
    var data = dataSet[key];
    //console.log(data);

    var regex1 = /DBA(.*)\nDCS(.*)\nDCT(.*)\nDBD(.*)\nDBB(.*)\nDBC(.*)\n/g;
    var regex2 = /DAG(.*)\n/g; //DAI(.*)\nDAJ(.*)\nDAQ(.*)\n
    var regex3 = /DAI(.*)\nDAJ(.*)\n/g;
    var regex4 = /DAQ(.*)\n/g;
    var regex5 = /DAK(.*)\n/g;
    var match1 = regex1.exec(data);
    var match2 = regex2.exec(data);
    var match3 = regex3.exec(data);
    var match4 = regex4.exec(data);
    var match5 = regex5.exec(data);
    expirationDate = [match1[1].slice(0, 4), '-', match1[1].slice(4, 6), '-', match1[1].slice(6)].join('');;
    lname = match1[2].replace(/,/g, '');
    fname = match1[3];
    issueDate = [match1[4].slice(0, 4), '-', match1[4].slice(4, 6), '-', match1[4].slice(6)].join('');
    dob = [match1[5].slice(0, 4), '-', match1[5].slice(4, 6), '-', match1[5].slice(6)].join('');;
    if (match1[6] === '1') {
      sex = 'Male';
    } else {
      sex = 'Female'
    }
    address = match2[1].replace(/,/g, '');
    city = match3[1];
    province = match3[2];
    postCode = match5[1];
    dlNum = match4[1];


    res.render('index', { title: 'Driver Licence Info Display',fname: fname, lname: lname, expirationDate: expirationDate, dob: dob, issueDate: issueDate, postCode: postCode, sex: sex, address: address, city: city, province: province, dlNum: dlNum });

    delete dataSet[key];

  } else {
    res.render('error', { message: 'No data to present... Please scan a Driver Licence first!'});
  }



});

router.post('/', function (req, res, next) {

  dlInfo = req.body.dlInfo;
  sessionKey = req.body.key;
  dataSet[sessionKey] = dlInfo;

  res.send('goood!')
  //console.log(dataSet);

})


module.exports = router;
