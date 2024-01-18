var mysql = require('mysql');

 const con =  mysql.createConnection({

    host: "localhost",
    port:"3306",
    user: "",
    password: "",
    database: "dreamy",


  });
 
  module.exports = con;


  
