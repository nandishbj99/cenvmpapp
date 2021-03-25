const express = require ( 'express' );
var nodemailer = require('nodemailer');
var fs = require('fs');

var multer = require("multer");


const userFiles = './uploads/';


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nandishtestmail@gmail.com',
    pass: 'TestMail@2'
  }
});






const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
})

app.use('/users/register',(req, res,next) =>{
  var vv=JSON.parse(req.body.user);

  console.log(vv.email);
  var mailOptions = {
    from: 'nandishtestmail@gmail.com',
    to: 'nandishbj23@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };


   res.json("success response from server")
});


/*app.use('/pan/upload',multer({dest: "./uploads/"}).array("pdf", 12),(req, res,next) =>{
//file=req.file;


//fs.writeFileSync("1111122222.pdf", file);
//console.log(file);
res.json("file  added success  from server")



});*/

app.use('/pan',(req, res,next) =>{
  var vv=req.body;

  console.log(vv.pannumber);



   res.json("success response from server");
});




app.use('/pan/upload',(req, res,next) =>{
const file = req.body;
 const base64data = file.content.replace(/^data:.*,/, '');
 fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
   if (err) {
     console.log(err);
     res.sendStatus(500);
   } else {
     res.set('Location', userFiles + file.name);
     res.status(200);
     res.send(file);
   }
 });
});



app.use('/files', (req, res) => {
  const file = req.body;
  const base64data = file.content.replace(/^data:.*,/, '');
  fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.set('Location', userFiles + file.name);
      res.status(200);
      res.send(file);
    }
  });
 });

module.exports = app;
