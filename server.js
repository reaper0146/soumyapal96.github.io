var express = require("express");
var app = express();
var formidable = require('formidable');
const multer = require('multer');
const path = require('path');
const helpers = require('./helper');
const exec = require('child_process').exec;//.spawn;
var fs = require('fs');


var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('./src'));

//var path = __dirname + '/src/';

var time = [];
var timetest = {};

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, '/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-ML' + path.extname(file.originalname));
    }
});



function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum;
};

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

app.post("/sendTime", function(req,res){
  //console.log('Post a Customer: ' + JSON.stringify(req.body));

  timetest.timeStart = toTimestamp(req.body.timeStart);
  timetest.timeEnd = toTimestamp(req.body.timeEnd);
  console.log(timetest.timeStart)


  //var strt="./influxdata.py";
  //const python = spawn("python", ["influxdata.py",timetest.timeStart, timetest.timeEnd]);
  var cmd = "python influxdata.py " + timetest.timeStart + " " + timetest.timeEnd
  console.log(cmd)
  exec(cmd, function(err, stdout, stderr) {
if (err) {
console.error(err);
return;
}
console.log(stdout);
});

  //var process = spawn('python3',["influxdata.py",timetest.timeStart,timetest.timeEnd]);

 // Takes stdout data from script which executed
 // with arguments and send this data to res object
 //process.stdout.on('data', function(data) {
//     console.log(data.toString());
//   });




  //customers.push(customer);
  //goto1="http://localhost:3000/d/5_8OLaVGk/home?orgId=1&from="+timetest.timeStart+"&to="+timetest.timeEnd //1599067885670&to=1599068185670";
  //console.log(goto)
  //console.log(goto1)
  //res.writeHead(301,{Location: goto1});
  res.end();

//  return res.send(timetest);
});

app.post("/fileUpload", function(req,res){
  //console.log('Post a Customer: ' + JSON.stringify(req.body));

  let upload = multer({ storage: storage, fileFilter: helpers.typeFilter }).single('file');

upload(req, res, function(err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select a python file to upload');
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    else if (err) {
        return res.send(err);
    }

 });


 //var strt="./file-ML.py";
 //var dataToSend;
 //const python = spawn(python3, 'file-ML.py');
  //python.stdout.on('data', function (data) {
  //console.log('Pipe data from python script ...');
  //dataToSend = data.toString();
 //});
 //python.on('close', (code) => {
 //console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 //goto="http://localhost:3000/d/5_8OLaVGk/home?orgId=1&from=1599067885670&to=1599068185670";
 //goto1="http://localhost:3000/d/5_8OLaVGk/home?orgId=1&from="+startstamp+"&to="+endstamp //1599067885670&to=1599068185670";
 //console.log(goto)
 //console.log(goto1)
 //res.writeHead(301,{Location: goto1});
 //var process = spawn('python3',["influxdata.py",timetest.timeStart,timetest.timeEnd]);

// Takes stdout data from script which executed
// with arguments and send this data to res object
//process.stdout.on('data', function(data) {
  //  console.log(data.toString());
  //});


 //var strt="./influxdata.py";
 //const python = spawn(strt, [timetest.timeStart, timetest.timeEnd]);
  //python.stdout.on('data', function (data) {
  //console.log('Pipe data from python script ...');
  //dataToSend = data.toString();
 //});
// process.on('close', (code) => {
 //console.log(`child process close all stdio with code ${code}`);
//});

// var process = spawn('python3',["file-ML.py"] );

 // Takes stdout data from script which executed
 // with arguments and send this data to res object
 //process.stdout.on('data', function(data) {
  //  console.log(data.toString());
   //});

 res.end();
});

  //}
//  return res.send(timetest);
//);


/*app.get("/sendTime1", function(req,res){
  console.log("Get All Customers");
  return res.send("hi");
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html");
});
*/
app.listen(8081, function () {
  console.log('Example app listening on port 8081!')
})
