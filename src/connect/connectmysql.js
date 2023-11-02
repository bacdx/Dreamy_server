var mysql = require('mysql');

 const con =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dreamy"
  });
 
  module.exports = con;


  
