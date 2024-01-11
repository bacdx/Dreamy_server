var mysql = require('mysql');

 const con =  mysql.createConnection({

    host: "localhost",

 // host: "localhost",
   // port:"3308",

    user: "root",
    password: "",
    database: "dreamy"

  });
 
  module.exports = con;


  
