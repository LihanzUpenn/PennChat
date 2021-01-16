/* eslint-disable no-unused-vars */
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
  if (err) {
    console.log("Error connecting database ... ");
  } else {
    console.log("Database is connected ... ");

    // const sql = [
    //   "DROP TABLE IF EXISTS Users;",
    //   "CREATE TABLE Users (uid VARCHAR(255), username VARCHAR(255), password VARCHAR(255), regidate TIMESTAMP, picture MEDIUMTEXT, lockout BOOLEAN, description VARCHAR(255));",
    //   "DROP TABLE IF EXISTS Friends;",
    //   "CREATE TABLE Friends (fid VARCHAR(255), host VARCHAR(255), friend VARCHAR(255), friend_time TIMESTAMP, last_chat TIMESTAMP);",
    //   "DROP TABLE IF EXISTS Messages;",
    //   "CREATE TABLE Messages (mid VARCHAR(255), from_host VARCHAR(255), to_host VARCHAR(255), message_type VARCHAR(255), message_time TIMESTAMP, message_content MEDIUMTEXT);",
    //   "DROP TABLE IF EXISTS Posts;",
    //   "CREATE TABLE Posts (pid VARCHAR(255), from_host VARCHAR(255), message_type VARCHAR(255), message_time TIMESTAMP, message_content MEDIUMTEXT );",
    //   "DROP TABLE IF EXISTS Last_visit_posts;",
    //   "CREATE TABLE Last_visit_posts (uid VARCHAR(255), username VARCHAR(255), last_seen_time TIMESTAMP);",
    // ];

    // const sql = [
    //   "CREATE TABLE IF NOT EXISTS Users (uid VARCHAR(255), username VARCHAR(255), password VARCHAR(255), regidate TIMESTAMP, picture MEDIUMTEXT, lockout BOOLEAN, description VARCHAR(255));",
    //   "CREATE TABLE IF NOT EXISTS Friends (fid VARCHAR(255), host VARCHAR(255), friend VARCHAR(255), friend_time TIMESTAMP, last_chat TIMESTAMP);",
    //   "CREATE TABLE IF NOT EXISTS Messages (mid VARCHAR(255), from_host VARCHAR(255), to_host VARCHAR(255), message_type VARCHAR(255), message_time TIMESTAMP, message_content MEDIUMTEXT);",
    //   "CREATE TABLE IF NOT EXISTS Posts (pid VARCHAR(255), from_host VARCHAR(255), message_type VARCHAR(255), message_time TIMESTAMP, message_content MEDIUMTEXT );",
    //   "CREATE TABLE IF NOT EXISTS Last_visit_posts (uid VARCHAR(255), username VARCHAR(255), last_seen_time TIMESTAMP);",
    // ];

    const sql = [
      // "DROP TABLE IF EXISTS Users;",
      // "DROP TABLE IF EXISTS Friends;",
      // "DROP TABLE IF EXISTS Messages;",
      // "DROP TABLE IF EXISTS Posts;",
      // "DROP TABLE IF EXISTS Last_visit_posts;",
      "CREATE TABLE IF NOT EXISTS Users (uid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255) PRIMARY KEY, password VARCHAR(255), regidate TIMESTAMP, picture MEDIUMTEXT, lockout BOOLEAN, description VARCHAR(255), last_visit_post_time VARCHAR(255));",
      "CREATE TABLE IF NOT EXISTS Friends (fid INT AUTO_INCREMENT PRIMARY KEY, host VARCHAR(255), friend VARCHAR(255), friend_time TIMESTAMP, last_chat TIMESTAMP);",
      "CREATE TABLE IF NOT EXISTS Messages (mid INT AUTO_INCREMENT PRIMARY KEY, from_host VARCHAR(255), to_host VARCHAR(255), message_type VARCHAR(255), message_time TIMESTAMP, message_content MEDIUMTEXT);",
      "CREATE TABLE IF NOT EXISTS Post (pid INT AUTO_INCREMENT PRIMARY KEY, from_host VARCHAR(255), message_type VARCHAR(255), message_time TIMESTAMP, message_content MEDIUMTEXT, img_content MEDIUMTEXT );",
      "CREATE TABLE IF NOT EXISTS Last_visit_posts (uid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), last_seen_time TIMESTAMP);",
      // "INSERT INTO Last_visit_posts (username, last_seen_time) VALUES ('sb', '2009-05-18')",
      // "INSERT INTO Last_visit_posts (username, last_seen_time) VALUES ('eric', '2020-05-18 20:50:20')",
    ];

    for (let i = 0; i < sql.length; i += 1) {
      console.log(`index = ${i} ... `);
      connection.query(sql[i], function (err1, result) {
        if (err1) {
          console.log(
            `Error creating tables ... index = ${i}, sql = ${sql[i]}`
          );
        } else {
          console.log(`Table created! index = ${i}, sql = ${sql[i]}`);
        }
      });
    }
  }
});

setTimeout(() => {
  connection.end();
}, 2000);

// connection.end();
