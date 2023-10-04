var http = require('http');
 const con = require('./src/connect/connectmysql');
var AcessModel=require('./src/model/AcessModel');
const express = require('express');
const {engine} =require('express-handlebars');
const app = express();
const { access } = require('fs');
const path = require('path');
const routes = require('./src/routes/route');



con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
//set view engine
app.engine('hbs', engine({

    extname:'.hbs'
}));
app.set('view engine', 'hbs');
//set path views
app.set('views',path.join(__dirname,"\\src\\app\\views"))

app.use(express.static(path.join(__dirname,"\\src\\materia\\img")))

console.log()
app.use(express.urlencoded({
extended: true
}));



routes(app);

app.listen(3000)
// sửa database them bang anh , bang binh lian danh gia ,
// git commit server_login-ph20234-2/10/2023