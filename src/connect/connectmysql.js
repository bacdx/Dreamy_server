var mysql = require('mysql');

 const con =  mysql.createConnection({
    host: "localhost:4788",
    user: "root",
    password: "YES",
    database: "dreamy"
  });
 
  module.exports = con;


  
