var http = require('http');
var formidable = require('formidable');
 const con = require('./src/connect/connectmysql');
var AcessModel=require('./src/model/AcessModel');
const express = require('express');
const {engine} =require('express-handlebars');
const app = express();
const { access } = require('fs');
const path = require('path');
const routes = require('./src/routes/route');

var session = require('express-session');

// Use the session middleware


con.connect(function(err) {
  
  console.log(err);
});
const exphbs  = require('express-handlebars');

const hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  helpers: {
      inc: function (value, options) {
          return parseInt(value) + 1;
      } ,
      stringify: function (context) {
        return JSON.stringify(context);
      },
      json: function (context) {
        return JSON.stringify(context);
      },
  },
  extname: '.hbs'
});



//set view engine
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
//set path views
app.set('views',path.join(__dirname,"\\src\\app\\views"))
app.use(express.static(__dirname + '../public'))
app.use(express.static(path.join(__dirname,"\\src\\app\\resources")))
app.use(session({
  secret: '12121313',
  resave: false,
  saveUninitialized: true
}));
console.log(path.join(__dirname,"\\src\\app\\resources\\img\\logo.png"))
console.log()
app.use(express.urlencoded({
extended: true
}));




routes(app);

app.listen(3000)
// sửa database them bang anh , bang binh lian danh gia ,
// git commit server_login-ph20234-2/10/2023