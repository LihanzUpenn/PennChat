const WebSocket = require("ws");

const jwt = require("jsonwebtoken");

// web socket
const portcode = process.env.PORT || 8085;
const wss = new WebSocket.Server({ port: portcode, clientTracking: true });

// Map of connected clients (user - client id) pairs
const connectedUsers = new Map();
const userPair = {};

// connection event
wss.on("connection", (ws, req) => {
  console.log("New connection");
  let client = "";
  let token;
  // client authentication get the name from the token
  if (req.headers.token !== "") {
    token = req.headers.token;
  }
  if (ws.protocol !== "") {
    // the client's address
    token = ws.protocol;
  }

  jwt.verify(token, "this_is_a_secret", (err, decoded) => {
    if (err) {
      console.log(`Error: ${err}`);
      return;
    }
    client = decoded.name;
    // console.log(`New connection from user ${client}`);
    if (client !== "webserver") {
      // add client to map of clients
      connectedUsers.set(String(client), ws);
    }
  });

  // message event: sent by the webserver
  ws.on("message", (message) => {
    // console.log(`Received message ${message} from user ${client}`);
    if (client === "webserver") {
      // get the text message
      const msg = JSON.parse(message);
      if (msg.type === "message") {
        console.log(
          `new message notification ${connectedUsers.has(
            msg.data.to
          )} - ${connectedUsers.has(msg.data.from)}`
        );
        if (connectedUsers.has(msg.data.from)) {
          console.log(`send message`);
          // send message to receiver
          if (
            !connectedUsers.has(msg.data.to) ||
            userPair[msg.data.to] !== msg.data.from
          ) {
            const newMessage = {
              type: "delivered",
              from: msg.data.from,
              text: msg.data.message,
              time: msg.data.time,
              status: "delivered",
            };
            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          } else {
            const newMessage = {
              type: "delivered",
              from: msg.data.from,
              text: msg.data.message,
              time: msg.data.time,
              status: "read",
            };
            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          }
          if (connectedUsers.has(msg.data.to)) {
            // send update to sender
            console.log(`send receipt`);
            const update = {
              type: "new message",
              to: msg.data.to,
              text: msg.data.message,
              time: msg.data.time,
              from: msg.data.from,
            };
            connectedUsers.get(msg.data.to).send(JSON.stringify(update));
          }
        }
      }
      if (msg.type === "new user") {
        // ask all connected clients to update
        console.log(`new user notification`);
        const newUser = { type: "new user", user: msg.data };
        connectedUsers.forEach((v) => {
          v.send(JSON.stringify(newUser));
        });
      }

      if (msg.type === "pair") {
        // ask all connected clients to update
        console.log(`new user pair notification`);
        console.log("new pair:", msg.data.from, "taking to", msg.data.to);
        userPair[msg.data.from] = msg.data.to;
        const newUserPair = { type: "newUserPair", pair: userPair };
        console.log(newUserPair);
        connectedUsers.forEach((v) => {
          v.send(JSON.stringify(newUserPair));
        });
      }

      if (msg.type === "disconnect") {
        // ask all connected clients to update
        console.log(`disconnect and delete a user pair notification`);
        console.log("new pair to delete:", msg.data.from);
        userPair[msg.data.from] = "";
        const newUserPair = { type: "newUserPair", pair: userPair };
        console.log(newUserPair);
        connectedUsers.forEach((v) => {
          v.send(JSON.stringify(newUserPair));
        });
      }
      // handle imge disconnect
      if (msg.type === "image") {
        console.log(
          `new image message notification ${connectedUsers.has(
            msg.data.to
          )} - ${connectedUsers.has(msg.data.from)}`
        );
        if (connectedUsers.has(msg.data.from)) {
          console.log(`send image message`);
          // console.log("***********************");
          // console.log(msg.data.imgUrl);
          // console.log("***********************");
          // send message to receiver
          if (
            !connectedUsers.has(msg.data.to) ||
            userPair[msg.data.to] !== msg.data.from
          ) {
            const newMessage = {
              type: "image delivered",
              from: msg.data.from,
              imgUrl: msg.data.imgUrl,
              time: msg.data.time,
              status: "delivered",
            };
            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          } else {
            const newMessage = {
              type: "image delivered",
              from: msg.data.from,
              imgUrl: msg.data.imgUrl,
              time: msg.data.time,
              status: "read",
            };
            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          }
          // send update to sender
          if (connectedUsers.has(msg.data.to)) {
            console.log(`send receipt img to ${msg.data.to}`);
            const update = {
              type: "new image message",
              to: msg.data.to,
              imgUrl: msg.data.imgUrl,
              time: msg.data.time,
              from: msg.data.from,
            };
            connectedUsers.get(msg.data.to).send(JSON.stringify(update));
          }
        }
      }
      // handle audio
      if (msg.type === "audio") {
        console.log(
          `new audio message notification ${connectedUsers.has(
            msg.data.to
          )} - ${connectedUsers.has(msg.data.from)}`
        );
        if (connectedUsers.has(msg.data.from)) {
          console.log(`send aduio message`);
          // console.log(msg.data.audiofile);
          // send message to receiver
          if (
            !connectedUsers.has(msg.data.to) ||
            userPair[msg.data.to] !== msg.data.from
          ) {
            const newMessage = {
              type: "aduio delivered",
              from: msg.data.from,
              audiofile: msg.data.audiofile,
              time: msg.data.time,
              status: "delivered",
            };

            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          } else {
            const newMessage = {
              type: "aduio delivered",
              from: msg.data.from,
              audiofile: msg.data.audiofile,
              time: msg.data.time,
              status: "listerned",
            };

            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          }
          // send update to sender
          if (connectedUsers.has(msg.data.to)) {
            console.log(`send receipt`);
            const update = {
              type: "new audio message",
              to: msg.data.to,
              audiofile: msg.data.audiofile,
              time: msg.data.time,
              from: msg.data.from,
            };
            connectedUsers.get(msg.data.to).send(JSON.stringify(update));
          }
        }
      }

      // handle video
      if (msg.type === "video") {
        if (connectedUsers.has(msg.data.from)) {
          console.log(`send video message`);
          if (
            !connectedUsers.has(msg.data.to) ||
            userPair[msg.data.to] !== msg.data.from
          ) {
            const newMessage = {
              type: "video delivered",
              from: msg.data.from,
              videofile: msg.data.videofile,
              time: msg.data.time,
              status: "delivered",
            };
            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          } else {
            const newMessage = {
              type: "video delivered",
              from: msg.data.from,
              videofile: msg.data.videofile,
              time: msg.data.time,
              status: "watched",
            };
            connectedUsers.get(msg.data.from).send(JSON.stringify(newMessage));
          }
          // send update to sender
          if (connectedUsers.has(msg.data.to)) {
            console.log(`send receipt`);
            const update = {
              type: "new video message",
              to: msg.data.to,
              videofile: msg.data.videofile,
              time: msg.data.time,
              from: msg.data.from,
            };
            // console.log(msg.data.videofile);
            connectedUsers.get(msg.data.to).send(JSON.stringify(update));
          }
        }
      }
    }
  });
  // welcome message
  const greet = { type: "welcome" };
  ws.send(JSON.stringify(greet));
});

module.exports = wss;
