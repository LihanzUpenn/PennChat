/* eslint-disable*/

const mysql = require("mysql");

// Create express app
const express = require("express");

// Cross-origin resource sharing https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
const cors = require("cors");

// security feature. JSON web token - https://jwt.io
const jwt = require("jsonwebtoken");

const multer = require("multer");

const webapp = express();

// web socket
const WebSocket = require("ws");

// enable cors in our express app
webapp.use(cors());
// Help with parsing body of HTTP requests
const bodyParser = require("body-parser");
webapp.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
// Server port
const port = process.env.PORT || 8080;

// JSON web token creation
const serverToken = jwt.sign(
  {
    name: "webserver",
  },
  "this_is_a_secret",
  { expiresIn: "1h" }
);

// websocket server url
const url = "ws://localhost:8085/";
// const url = "https://wsserver557.herokuapp.com/";
// websocket connection with jwt
const connection = new WebSocket(url, {
  headers: { token: serverToken },
});

connection.onopen = () => {
  connection.send('["webserver"]');
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  // console.log(e.data);
};

// Set of users
const users = new Set();

// for AWS database
const connectiondb = mysql.createPool({
  host: "database-2.csbfoctizqsu.us-west-2.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "Cis557eric",
  database: "db",
});

webapp.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

webapp.use(
  express.json({ limit: "50mb" })
  // express.urlencoded({limit:'50mb'})
);

// Start web server
const serverFD = webapp.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

// Root endpoint
webapp.get("/", (_req, res) => {
  res.json({ message: "Welcome to our chat app" });
});

webapp.post("/register", (req, res) => {
  console.log("CREATE a user");
  console.log(req.body);
  if (!req.body.username) {
    res.sendStatus(400);
    res.json({ error: "missing username" });
  }
  if (!req.body.password) {
    res.sendStatus(400);
    res.json({ error: "missing password" });
  }
  if (!req.body.securityCode) {
    res.sendStatus(400);
    res.json({ error: "missing security Code" });
  }

  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };

  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const nullPic = "test";
  const lockOutDefault = false;
  const descriptionDefault = "test";
  const sql =
    "INSERT INTO Users (`username`, `password`, `regidate`, `picture`, `lockout`, `description`, `securityCode`) VALUES ('" +
    req.body.username +
    "', '" +
    req.body.password +
    "', '" +
    sqlDate +
    "', '" +
    nullPic +
    "', '" +
    lockOutDefault +
    "', '" +
    descriptionDefault +
    "', '" +
    req.body.securityCode +
    "');";
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      res.sendStatus(400);
    } else {
      res.json(result);
    }
  });
});

// login endpoint - returns the user's jwt
// adds the user to the set of users if first time
webapp.post("/login", (req, res) => {
  // console.log(req.body);

  if (!req.body.username) {
    res.status(400).json({ error: "missing username" });
    return;
  }
  const username = req.body.username;
  const password = req.body.password;

  let userToken;

  // create and send JWT to a the user
  userToken = jwt.sign(
    {
      name: username,
    },
    "this_is_a_secret",
    { expiresIn: "1h" }
  );

  const sql =
    "SELECT * FROM Users WHERE (`username` = '" +
    username +
    "' AND `password` = '" +
    password +
    "');";
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(err1);
      // console.log(`Error retrive text message ... sql = ${sql}`);
    } else {
      if (result.length === 0) {
        res.sendStatus(400);
      } else {
        // console.log(result[0]);
        const msg = { type: "new user", data: username };
        connection.send(JSON.stringify(msg));
        res.json(result);
      }
    }
  });

  // Notify WS Server to update all connected clients
  // const msg = { type: "new user", data: username };
  // connection.send(JSON.stringify(msg));
  // res.json({ user: username, token: userToken });
});

webapp.post("/checkin", (req, res) => {
  console.log("xxxxxxxxxxx");
  if (!req.body.username) {
    res.status(400).json({ error: "missing username" });
    return;
  }
  console.log(`Register user: ${req.body.username}`);
  const username = req.body.username;
  if (!users.has(username)) {
    users.add(username);
  }
  let userToken;

  // create and send JWT to a the user
  userToken = jwt.sign(
    {
      name: username,
    },
    "this_is_a_secret",
    { expiresIn: "1h" }
  );

  // Notify WS Server to update all connected clients
  const msg = { type: "new user", data: username };
  connection.send(JSON.stringify(msg));
  res.json({ user: username, token: userToken });
});

// users endpoint
webapp.get("/users", (_req, res) => {
  console.log("READ all users");
  res.json({
    data: Array.from(users),
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// video endpoints
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const upload1 = multer({ limits: { fieldSize: 50 * 1024 * 1024 } });
// has to write  the word "file" here
webapp.post("/video", upload1.single("file"), (req, res) => {
  console.log("Received a video");
  console.log(req.file);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`,`time_raw` ) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'video', '" +
    sqlDate +
    "', '" +
    JSON.stringify(req.file) +
    "', '" +
    sqlDate +
    "');";

  const debugsql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`,`time_raw`) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'video', '" +
    sqlDate +
    "', some message);";
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      res.sendStatus(400);
      res.json({ error: err1 });
    } else {
      // console.log(`Insert video message! sql = ${debugsql}`);
    }
  });

  const msg = {
    type: "video",
    data: {
      to: req.body.to,
      from: req.body.from,
      videofile: req.file,
      time: sqlDate,
    },
  };
  connection.send(JSON.stringify(msg));
  res.json({
    message: "video message received",
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// audio endpoint
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const upload = multer();
// has to write  the word "file" here
webapp.post("/audio", upload.single("file"), (req, res) => {
  console.log("Received a audio");
  console.log(req.file);
  console.log(req.body.to);
  console.log(req.body.from);
  // if (!req.to || !req.from || !req.file) {
  //   res.status(400).json({ error: "missing to or from or message" });
  //   return;
  // }
  // // check if user is valid
  // if (!users.has(req.from)) {
  //   res.status(401).json({ error: "unauthorized user" });

  //   return;
  // }
  // console.log("**********");

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`, `time_raw`) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'audio', '" +
    sqlDate +
    "', '" +
    JSON.stringify(req.file) +
    "', '" +
    sqlDate +
    "');";

  const debugsql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`, `time_raw`) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'audio', '" +
    sqlDate +
    "', some message);";
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error insert audio message ... sql = ${debugsql}`);
    } else {
      // console.log(`Insert audio message! sql = ${debugsql}`);
    }
  });

  const msg = {
    type: "audio",
    data: {
      to: req.body.to,
      from: req.body.from,
      audiofile: req.file,
      time: sqlDate,
    },
  };
  // Notify WS Server
  // console.log(JSON.stringify(msg));
  // console.log(JSON.parse(JSON.stringify(msg)).data.audiofile.buffer);
  connection.send(JSON.stringify(msg));
  res.json({
    message: "audio message received",
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// image endpoint
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const upload2 = multer({ limits: { fieldSize: 50 * 1024 * 1024 } });
webapp.post("/image", upload2.single("file"), (req, res) => {
  console.log("Received a image");
  console.log(req.file);
  // if (!req.body.to || !req.body.from || !req.body.imgUrl) {
  //   res.status(400).json({ error: "missing to or from or message" });
  //   return;
  // }
  // // check if user is valid
  // if (!users.has(req.body.from)) {
  //   res.status(401).json({ error: "unauthorized user" });
  //   return;
  // }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`, `time_raw`) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'image', '" +
    sqlDate +
    "', '" +
    JSON.stringify(req.file) +
    "','" +
    sqlDate +
    "');";

  const debugsql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`, `time_raw`) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'image', '" +
    sqlDate +
    "', some message);";
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error insert image message ... sql = ${debugsql}`);
    } else {
      // console.log(`Insert image message! sql = ${debugsql}`);
    }
  });

  const msg = {
    type: "image",
    data: {
      to: req.body.to,
      from: req.body.from,
      imgUrl: req.file,
      time: sqlDate,
    }, //!!!!!!!!!!!!!!! Kai Jin modified !!
  };
  // Notify WS Server
  connection.send(JSON.stringify(msg));
  res.json({
    message: "image message received",
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// message endpoint
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/message/", (req, res) => {
  console.log("Received a message");
  if (!req.body.to || !req.body.from || !req.body.message) {
    res.status(400).json({ error: "missing to or from or message" });
    return;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  // const sql = `INSERT INTO Messages (from_host, to_host, message_type, message_time, message_content) VALUES ('${req.body.from}', '${req.body.to}', 'text', '${sqlDate}', '${req.body.message}');`;
  const sql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`, `time_raw`) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'text', '" +
    sqlDate +
    "', '" +
    req.body.message +
    "','" +
    sqlDate +
    "');";

  const debugsql =
    "INSERT INTO Messages (`from_host`, `to_host`, `message_type`, `message_time`, `message_content`, `time_raw`) VALUES ('" +
    req.body.from +
    "', '" +
    req.body.to +
    "', 'text', '" +
    sqlDate +
    "', some message);";
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error insert text message ... sql = ${debugsql}`);
    } else {
      // console.log(`Insert text message! sql = ${debugsql}`);
    }
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // save a message notifaction
  saveNotifactation(req.body.from, req.body.to, "message", sqlDate);
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const msg = {
    type: "message",
    data: {
      to: req.body.to,
      from: req.body.from,
      message: req.body.message,
      time: sqlDate,
    },
  };
  // Notify WS Server
  connection.send(JSON.stringify(msg));
  res.json({
    message: "message received",
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get method
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// message
webapp.get("/messagetest/:data", (req, res) => {
  const dataObj = JSON.parse(req.params.data);
  console.log(dataObj);

  console.log("retrive message");

  if (!dataObj.to || !dataObj.from) {
    res.status(400).json({ error: "missing to or from or message" });
    return;
  }
  // // check if user is valid
  // if (!users.has(dataObj.from)) {
  //   res.status(401).json({ error: "unauthorized user" });
  //   return;
  // }

  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql = `SELECT * FROM Messages WHERE ((from_host = '${dataObj.from}' AND to_host = '${dataObj.to}') OR (from_host = '${dataObj.to}' AND to_host = '${dataObj.from}'));`;
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error retrive text message ... sql = ${sql}`);
    } else {
      // console.log(`retrive text message! sql = ${sql}`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// post story
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const upload3 = multer({ limits: { fieldSize: 50 * 1024 * 1024 } });
webapp.post("/poststory", upload3.single("file"), (req, res) => {
  console.log("Received a Post Story");
  console.log(req.body.from);
  console.log(req.file);
  console.log("text:", req.body.text);

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const timeNow = new Date();
  timeNow.setHours(timeNow.getHours() - 5);
  const sqlDate = timeNow.toISOString();

  const sql =
    "INSERT INTO Post (`from_host`, `message_type`, `message_time`, `message_content`, `img_content`) VALUES ('" +
    req.body.from +
    "', 'post', '" +
    sqlDate +
    "', ? , '" +
    JSON.stringify(req.file) +
    "');";
  values = [req.body.text];
  connectiondb.query(sql, values, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error insert Post Story `);
    } else {
      // console.log(`Post Story inserted into Database`);
    }
  });
  res.json({
    message: "post received",
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get story
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.get("/getstory/:hostname", (req, res) => {
  console.log("get Story");
  const hostName = req.params.hostname;
  console.log(hostName);

  const sql = `Select * from
  Post join (
  Select friend
  from Friends
  where  host = "${hostName}") A on
  Post.from_host = A.friend;`;

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error Get Story `);
    } else {
      // console.log(`Get Stroy from Database successfully`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get story 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.get("/getstory2/:hostname", (req, res) => {
  console.log("get Story2");
  const hostName = req.params.hostname;
  console.log(hostName);

  const sql = `SELECT * FROM
    (SELECT * FROM (Select * from Post join (
    Select friend
    from Friends
    where host = "${hostName}") A on
    Post.from_host = A.friend )) B 
    JOIN 
    (SELECT username, last_visit_post_time_2 FROM Users WHERE username = "${hostName}") C
    ON B.from_host = C.username 
    WHERE B.message_time > C.last_visit_post_time_2;`;

  connectiondb.query(sql, function (err, result, fields) {
    if (err) {
      // console.log(`Error Get Story `);
      res.json(err);
    } else {
      // console.log(`Get Stroy from Database successfully`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete story
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.post("/deletestory", (req, res) => {
  console.log("Delete All C");
  const sql = `Truncate Post;`;
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error Delete all Stories `);
    } else {
      // console.log(`Delete all Stroies from Database successfully`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////
// getFriends
///////////////////////////////////////////

webapp.get("/getfriends/:username", (req, res) => {
  console.log("in chatserver getfriends");
  const tempUsername = req.params.username;
  // console.log(tempUsername);

  // const sql = `Select *
  // from Friends
  // where host = "${tempUsername}"
  // join (
  // Select *
  // from Friends
  // where friend = "${tempUsername}") A on
  // Friends.host = A.friend AND Friends.friend = A.host;`;

  // const sql = `Select * From Friends Where host = "${tempUsername}"`
  const sql = `Select * From Friends Where host = "${tempUsername}" AND friend IN (Select username As friend From Users) order by last_chat DESC`;
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(err1);
      // console.log(`Error getFriends`);
    } else {
      console.log(`getFriends Successful`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////
// getstrangers
///////////////////////////////////////////

webapp.get("/getstrangers/:username", (req, res) => {
  console.log("in chatserver getstrangers");
  const tempUsername = req.params.username;
  // console.log(tempUsername);

  // const sql = `Select *
  // from Friends
  // where host = "${tempUsername}"
  // join (
  // Select *
  // from Friends
  // where friend = "${tempUsername}") A on
  // Friends.host = A.friend AND Friends.friend = A.host;`;

  const sql = `Select * From Users Where username != "${tempUsername}" AND lockout = 0`;

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(err1);
      // console.log(`Error getstrangers`);
    } else {
      console.log(`getstrangers Successful`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////
// deletefriend
///////////////////////////////////////////

webapp.delete("/deletefriend", (req, res) => {
  console.log("in chatserver deletefriend");
  const tempUsername = req.body.username;
  const tempFriend = req.body.friend;
  // console.log(tempUsername);
  // console.log(tempFriend);

  const sql = `Delete From Friends Where host = "${tempUsername}" AND friend = "${tempFriend}"`;

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      res.json(err1);
    } else {
      // console.log(`deletefriend Successful`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////
// addfriend
///////////////////////////////////////////

webapp.get("/addfriend/:username&:friend", (req, res) => {
  console.log("in chatserver addfriend");
  const tempUsername = req.params.username;
  const tempFriend = req.params.friend;
  console.log(tempUsername);
  console.log(tempFriend);

  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql =
    "Insert INTO Friends (`host`, `friend`, `friend_time`, `last_chat`) VALUES ('" +
    tempUsername +
    "' , '" +
    tempFriend +
    "' , '" +
    sqlDate +
    "' , '" +
    sqlDate +
    "')";

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(err1);
      // console.log(`Error addfriend`);
    } else {
      // console.log(`addfriend Successful`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////
// deleteuser
///////////////////////////////////////////

webapp.delete("/deleteuser", (req, res) => {
  console.log("in chatserver deleteuser");
  const tempUsername = req.body.username;
  console.log(tempUsername);

  const sql = `Delete From Users Where username = "${tempUsername}"`;

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(err1);
      // console.log(`Error deleteuser`);
    } else {
      // console.log(`deleteuser Successful`);
      res.json(result);
    }
  });
});

webapp.post("/updatepassword", (req, res) => {
  console.log("in chatserver updatepassword");
  const tempUsername = req.body.username;
  const tempPassword = req.body.newPassword;
  console.log(tempUsername);
  console.log(tempPassword);
  const sql = `Update Users Set password = "${tempPassword}" Where username = "${tempUsername}"`;

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(err1);
      // console.log(`Error updatepassword`);
    } else {
      // console.log(`updatepassword Successful`);
      res.json(result);
    }
  });
});

// check if this username exists in the database
webapp.get("/exist/:username", (req, res) => {
  console.log("Check if this username exists");
  const username = req.params.username;
  console.log(username);

  const sql = "SELECT * FROM Users WHERE `username` = '" + username + "';";
  connectiondb.query(sql, function (err, result, fields) {
    if (err) {
      // console.log(err);
      // console.log(`Error retrive text message ... sql = ${sql}`);
    } else {
      if (result.length === 0) {
        res.sendStatus(400);
      } else {
        res.json(result);
      }
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete one previous Message from dataBase
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/deletemessage", (req, res) => {
  console.log("Delete one Message from dataBase");
  // console.log(req.body.from);
  // console.log(req.body.to);
  // console.log(req.body.mid);

  const sql = `DELETE FROM Messages WHERE  mid = '${req.body.mid}'`;

  console.log(sql);
  // values = [req.body.from, req.body.to];
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error delete a Message from dataBase `);
    } else {
      console.log(`Successfully delete a Message from dataBase`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete one current Message from dataBase
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/deletecurrentmessage", (req, res) => {
  console.log("Delete one Current Message from dataBase");
  // console.log(req);
  // console.log(req.body);
  // console.log(req.body.rawTime);
  const sql = `DELETE FROM Messages WHERE  time_raw = '${req.body.rawTime}'`;

  // console.log(sql);
  // values = [req.body.from, req.body.to];
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error delete a current Message from dataBase `);
    } else {
      console.log(`Successfully delete a current Message from dataBase`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete one conversation from dataBase
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/deleteconversation", (req, res) => {
  console.log("Delete one conversation from dataBase");
  // console.log(req);
  // console.log(req.body);
  const sql = `DELETE FROM Messages WHERE (from_host = '${req.body.from}' And to_host = '${req.body.to}') OR (from_host = '${req.body.to}' And to_host = '${req.body.from}')`;

  // console.log(sql);
  // values = [req.body.from, req.body.to];
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error delete a conversation  from dataBase `);
    } else {
      console.log(`Successfully delete a conversation from dataBase`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// add current talking pair to ws servers
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.post("/userpair", (req, res) => {
  console.log("add userpair to wsserver");
  console.log(req.body.from);
  console.log(req.body.to);
  if (!req.body.from || !req.body.to) {
    res.status(400).json({ error: "missing username" });
    return;
  }
  const msg = {
    type: "pair",
    data: { from: req.body.from, to: req.body.to },
  };
  connection.send(JSON.stringify(msg));
  res.sendStatus(200);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// disconnect and delete talk pair  in wsserver
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.post("/disconnect", (req, res) => {
  // console.log("disconnect and delete talk pair  in wsserver");
  // console.log(req.body.from);

  if (!req.body.from) {
    res.status(400).json({ error: "missing username" });
    return;
  }
  const msg = {
    type: "disconnect",
    data: { from: req.body.from },
  };
  connection.send(JSON.stringify(msg));
  res.sendStatus(200);
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  update all message to read
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/updateallmessagetoread", (req, res) => {
  console.log(" update all message to read");
  if (!req.body.from || !req.body.to) {
    res.status(400).json({ error: "missing username" });
    return;
  }
  console.log(req.body.to);
  console.log(req.body.from);

  const sql1 = `UPDATE Messages SET status = "read" WHERE from_host = "${req.body.to}" AND to_host = "${req.body.from}"; `;

  // console.log(sql1);
  connectiondb.query(sql1, function (err1, result, fields) {
    if (err1) {
      // console.log(`Error update all message to read  in dataBase `);
    } else {
      console.log(`Successfully update all message to read in dataBase`);
      res.sendStatus(200);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update last_visit_post_time
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/updatelastvisitposttime", (req, res) => {
  const tempUsername = req.body.username;
  const tempLastTime = req.body.lastTime;
  console.log("Update time: " + tempUsername + " " + tempLastTime);

  const sql = `Update Users Set last_visit_post_time = "${tempLastTime}" Where username = "${tempUsername}"`;

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      // console.log(err1);
      // console.log(`Error update last_visit_post_time`);
    } else {
      console.log(`Update last_visit_post_time Successful`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update user_profile_Picutre
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const upload5 = multer({ limits: { fieldSize: 50 * 1024 * 1024 } });
webapp.post("/profilepicture", upload5.single("file"), (req, res) => {
  // console.log("Update User Profile Picture");
  // console.log(req.file);
  const sql = `UPDATE Users SET Picture = '${JSON.stringify(
    req.file
  )}' WHERE (username = '${req.body.username}')`;

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      console.log(`Failed to updat the profile Photo`);
    } else {
      console.log(`Successfully updated the profile Photo`);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// get user_profile_Picutre
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.get("/getprofilepicture/:name", (req, res) => {
  // console.log("Get User Profile Picture");
  // console.log(req.params.name);
  const name = req.params.name;
  const sql = `Select Picture From Users where username = '${name}'
    `;
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      console.log(`Failed to get the profile Photo`);
    } else {
      // console.log(`Successfully get the profile Photo`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// update  Last Chat time
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/updatelastchattime", (req, res) => {
  console.log("Update Last Chat Time");
  console.log(req.body.host);
  console.log(req.body.friend);
  const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sql = `UPDATE Friends SET last_chat = '${sqlDate}' WHERE (host = '${req.body.host}' And friend = '${req.body.friend}');
    `;
  console.log(sql);
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      console.log(`Failed to update the Last Chat Time `);
    } else {
      console.log(`Successfully update the Last Chat Time`);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Check Notifaciton
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.get("/checknotifaciton/:name", (req, res) => {
  console.log("Get Notifications");
  // console.log(req.params.name);
  const name = req.params.name;
  const sql = `Select * From Notifications where to_host = '${name}'
    `;
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      console.log(`Failed to get notifications `);
    } else {
      console.log(`Successfully get notifications`);
      res.json(result);
    }
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete Notifaciton
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/deletenotifaction", (req, res) => {
  console.log("Delete notifaction");
  const num = req.body.mid;
  const sql = `DELETE From Notifications WHERE (mid = '${num}');`;
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      console.log(`Failed to Delete notifaction `);
    } else {
      console.log(`Successfully Delete notifaction`);
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// save Story Notifaciton to db
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
webapp.post("/postStorynotifaciton", (req, res) => {
  console.log("post Story notifaciton notifaction");
  saveNotifactation(
    req.body.from,
    req.body.to,
    req.body.messageType,
    req.body.sqlDate
  );
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// delete all notification after user logout all close the session
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.post("/deleteallnotification", (req, res) => {
  console.log("Delete all notifaction in the database");
  const name = req.body.host;
  const sql = `DELETE From Notifications WHERE (to_host = '${name}');`;
  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      console.log(`Failed to Delete all notifaction `);
    } else {
      console.log(`Successfully Delete all notifactions`);
    }
  });
});

//this function is to be called to save the notifaction to db
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function saveNotifactation(from, to, messageType, sqlDate) {
  console.log("save a notifaction");
  const sql =
    "INSERT INTO Notifications (`from_host`, `to_host`, `message_type`, `message_time`) VALUES ('" +
    from +
    "', '" +
    to +
    "', '" +
    messageType +
    "', '" +
    sqlDate +
    "');";

  connectiondb.query(sql, function (err1, result, fields) {
    if (err1) {
      console.log(`failed to save a notification`);
    } else {
      console.log(`Successfully save a notification to db`);
    }
  });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// forgot and reset password
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

webapp.post("/forgotandreset", (req, res) => {
  console.log("forgot and reset password");
  const username = req.body.username;
  const password = req.body.password;
  const securityCode = req.body.securityCode;
  console.log(username);
  console.log(password);
  console.log(securityCode);
  const sql = `Select *  From Users WHERE username = ? and securityCode = ? ;`;
  const values = [username, securityCode];
  connectiondb.query(sql, values, function (err1, result, fields) {
    if (err1) {
      console.log(`Failed to reset password `);
    } else {
      if (result.length === 0) {
        console.log(`Failed to find  the  username and securityCode `);
        res.sendStatus(409);
      } else {
        console.log(`Successfully find  the  username and securityCode`);
        const sql1 = `UPDATE Users SET password = ? WHERE (username = '${username}')`;
        const values1 = [password];
        connectiondb.query(sql1, values1, function (err1, result, fields) {
          if (err1) {
            console.log(`failed to update a password`);
            res.sendStatus(409);
          } else {
            res.sendStatus(200);
            console.log(`Successfully update a password`);
          }
        });
      }
    }
  });
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

module.exports = { webapp, serverFD, connection }; // for testing
