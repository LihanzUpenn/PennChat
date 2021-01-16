/* eslint-disable func-names */
/* eslint-disable no-console */

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "database-2.csbfoctizqsu.us-west-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "Cis557eric",
  database: "db",
});

connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
  }
});

connection.end();
