const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const users = {};

io.on("connection", (socket) => {
  if (!users[socket.id]) {
    users[socket.id] = socket.handshake.query.loggeduser;
  }
  console.log(users);
  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);
  socket.on("disconnect", () => {
    delete users[socket.id];
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("hey", {
      signal: data.signalData,
      from: data.from,
      fromid: data.fromid,
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  socket.on("endCall", (data) => {
    console.log("endCall received");
    io.to(data.to).emit("Callend", data.signal);
  });

  socket.on("callerEndCall", (data) => {
    console.log("callerEndCall received");
    io.to(data.to).emit("CallendbyCaller", data.signal);
  });

  socket.on("disconnected", (data) => {
    console.log("call disconnected");
    console.log("id1:", data.id1);
    console.log("id2:", data.id2);
    delete users[data.id1];
    delete users[data.id2];
  });

  socket.on("declineCall", (data) => {
    io.to(data.to).emit("callDeclinedbyReceiver", data.signal);
  });

  socket.on("goback", (data) => {
    delete users[data.id1];
    delete users[data.id2];

    Object.keys(users).map((key) => {
      console.log("key:", key);
      io.to(key).emit("someoneGoBack", users);
    });
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));
