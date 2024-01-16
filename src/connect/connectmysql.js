var mysql = require('mysql');

 const con =  mysql.createConnection({

    host: "localhost:3306",
    user: "root",
    password: "YES",
    database: "dreamy",


  });
 
  module.exports = con;


  
