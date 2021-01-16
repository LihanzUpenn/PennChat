/* eslint-disable*/
import { updateAllmessagetoRead } from "./getData";

export const setupWSConnection = (
  updateContacts,
  updateMessages,
  currentMessage,
  host,
  currentPair,
  to,
  previousMessages
) => {
  // if not registered, do nothing
  if (sessionStorage.getItem("token") === null) {
    return;
  }

  // Create WebSocket connection
  const socket = new WebSocket(
    "ws://localhost:8085",
    sessionStorage.getItem("token")
  );

  // Connection opened
  socket.addEventListener("open", () => {
    // console.log("ws connection opened");
    socket.send("Hello Server!");
  });

  // Listener for messages
  socket.addEventListener("message", (event) => {
    // parse message to json
    const pushMessage = JSON.parse(event.data);
    helper(
      updateContacts,
      updateMessages,
      currentMessage,
      host,
      currentPair,
      to,
      previousMessages,
      pushMessage
    );
  });

  // Connection closed
  socket.addEventListener("close", (_event) => {
    // console.log("Connection closed bye bye! ");
  });
};

export function helper(
  updateContacts,
  updateMessages,
  currentMessage,
  host,
  currentPair,
  to,
  previousMessages,
  pushMessage
) {
  if (pushMessage.type === "new user") {
    console.log("user " + pushMessage.user);
    updateContacts(); // update contacts to fire re-rendering
  }
  if (pushMessage.type === "delivered") {
    const time = new Date().toISOString().slice(0, 19);
    currentMessage.push({
      from_host: host,
      message_type: "text",
      message_content: ` ${pushMessage.text}`,
      message_time: `${time}`,
      rawtime: `${pushMessage.time}`,
      status: `${pushMessage.status}`,
    });
    if (pushMessage.status == "read") {
      console.log("XXXXXXXXXXXX");
      updateAllmessagetoRead(localStorage.getItem("currentUser"), to);
    }
    // console.log(currentMessage);
    // update previous message box via state and props
    updateMessages(); // update messages to fire re-rendering
  }
  if (pushMessage.type === "new message") {
    console.log("new message ! ! !");
    const time = new Date().toISOString().slice(0, 19);
    currentMessage.push({
      from_host: `${pushMessage.from}`,
      message_type: "text",
      message_content: ` ${pushMessage.text}`,
      message_time: `${time}`,
      rawtime: `${pushMessage.time}`,
    });
    // console.log(currentMessage);
    // update previous message box via state and props
    updateMessages(); // update messages to fire re-rendering
  }

  //handle images
  if (pushMessage.type === "image delivered") {
    const blob = new Blob([Buffer.from(pushMessage.imgUrl.buffer)]);
    const time = new Date().toISOString().slice(0, 19);
    currentMessage.push({
      from_host: host,
      message_type: "image",
      message_content: `${URL.createObjectURL(blob)}`,
      message_time: `${time}`,
      rawtime: `${pushMessage.time}`,
      status: `${pushMessage.status}`,
    });
    if (pushMessage.status == "read") {
      updateAllmessagetoRead(localStorage.getItem("currentUser"), to);
    }
    // update previous message box via state and props
    updateMessages(); // update messages to fire re-rendering
  }
  if (pushMessage.type === "new image message") {
    // console.log("new image message");
    const blob = new Blob([Buffer.from(pushMessage.imgUrl.buffer)]);
    const time = new Date().toISOString().slice(0, 19);
    currentMessage.push({
      from_host: `${pushMessage.from}`,
      message_type: "image",
      message_content: `${URL.createObjectURL(blob)}`,
      message_time: `${time}`,
      rawtime: `${pushMessage.time}`,
    });
    // console.log(currentMessage);
    // update previous message box via state and props
    updateMessages(); // update messages to fire re-rendering  img delivered
  }

  //handle aduio
  if (pushMessage.type === "aduio delivered") {
    // console.log("aduio delivered");

    // console.log(Buffer.from(pushMessage.audiofile.buffer));
    const blob = new Blob([Buffer.from(pushMessage.audiofile.buffer)]);
    const time = new Date().toISOString().slice(0, 19);
    currentMessage.push({
      from_host: host,
      message_type: "audio",
      message_content: `${URL.createObjectURL(blob)}`,
      message_time: `${time}`,
      rawtime: `${pushMessage.time}`,
      status: `${pushMessage.status}`,
    });
    if (pushMessage.status == "read") {
      updateAllmessagetoRead(localStorage.getItem("currentUser"), to);
    }
    // update previous message box via state and props
    updateMessages(); // update messages to fire re-rendering
  }
  if (pushMessage.type === "new audio message") {
    // console.log("new audio message");

    const blob = new Blob([Buffer.from(pushMessage.audiofile.buffer)]);
    const time = new Date().toISOString().slice(0, 19);
    currentMessage.push({
      from_host: `${pushMessage.from}`,
      message_type: "audio",
      message_content: `${URL.createObjectURL(blob)}`,
      message_time: `${time}`,
      rawtime: `${pushMessage.time}`,
    });

    updateMessages(); // update messages to fire re-rendering  img delivered
  }
  //handle video
  if (pushMessage.type === "video delivered") {
    // console.log("aduio delivered");
    if (pushMessage.videofile !== undefined) {
      const blob = new Blob([Buffer.from(pushMessage.videofile.buffer)]);
      const time = new Date().toISOString().slice(0, 19);
      currentMessage.push({
        from_host: host,
        message_type: "video",
        message_content: `${URL.createObjectURL(blob)}`,
        message_time: `${time}`,
        rawtime: `${pushMessage.time}`,
        status: `${pushMessage.status}`,
      });
      if (pushMessage.status == "read") {
        updateAllmessagetoRead(localStorage.getItem("currentUser"), to);
      }
      // // update previous message box via state and props
      updateMessages(); // update messages to fire re-rendering
    }
  }
  if (pushMessage.type === "new video message") {
    // console.log("new audio message");

    // const videoblob = new Blob([Buffer.from(pushMessage.videofile.buffer)]);
    const blob = new Blob([Buffer.from(pushMessage.videofile.buffer)]);
    const time = new Date().toISOString().slice(0, 19);
    currentMessage.push({
      from_host: `${pushMessage.from}`,
      message_type: "video",
      message_content: `${URL.createObjectURL(blob)}`,
      message_time: `${time}`,
      rawtime: `${pushMessage.time}`,
    });
    updateMessages(); // update messages to fire re-rendering  img delivered
  }

  // use the current conversation pair to determine if the meesage has been read or not
  if (pushMessage.type === "newUserPair") {
    // console.log(pushMessage.pair);
    currentPair = pushMessage.pair;
    if (currentPair[to] === host) {
      for (let i = 0; i < currentMessage.length; i++) {
        if (
          currentMessage[i] !== null &&
          currentMessage[i].status &&
          currentMessage[i].from_host == host
        ) {
          if (currentMessage[i].message_type === "video") {
            currentMessage[i].status = "watched";
          }
          if (currentMessage[i].message_type === "audio") {
            currentMessage[i].status = "listerned";
          }
          if (currentMessage[i].message_type === "image") {
            currentMessage[i].status = "read";
          }
          if (currentMessage[i].message_type === "text") {
            currentMessage[i].status = "read";
          }
        }
      }
      for (let i = 0; i < previousMessages.length; i++) {
        if (
          previousMessages[i] !== null &&
          previousMessages[i].status &&
          previousMessages[i].from_host == host
        ) {
          if (previousMessages[i].message_type === "video") {
            previousMessages[i].status = "watched";
          }
          if (previousMessages[i].message_type === "audio") {
            previousMessages[i].status = "listerned";
          }
          if (previousMessages[i].message_type === "image") {
            previousMessages[i].status = "read";
          }
          if (previousMessages[i].message_type === "text") {
            previousMessages[i].status = "read";
          }
        }
      }
    }
    updateMessages();
  }
}

// module.exports = {
//   setupWSConnection,
//   helper
// }
