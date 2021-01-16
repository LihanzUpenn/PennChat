/* eslint-disable consistent-return */
const axios = require("axios");

export const getUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8080/users");
    return res.data.data;
  } catch (err) {
    // console.log(err);
  }
};

export const joinChat = async (user) => {
  console.log("joinChat");
  try {
    if (user.length > 0) {
      const data = `username=${user}`;
      const res = await axios.post("http://localhost:8080/checkin", data);
      return res.data.token;
    }
  } catch (err) {
    // console.log(err);
  }
  return "";
};

export const sendMessage = async (sender, receiver, content) => {
  try {
    const data = `to=${receiver}&from=${sender}&message=${content}`;
    const res = await axios.post("http://localhost:8080/message", data);
    return res.data.message;
  } catch (err) {
    // console.log(err);
  }
};

export const sendImage = async (sender, receiver, content) => {
  // console.log(content);
  try {
    const formData = new FormData();
    formData.append("from", sender);
    formData.append("to", receiver);
    formData.append("file", content);

    const res = await axios.post("http://localhost:8080/image", formData);
    return res.data.message;
  } catch (err) {
    // console.log(err);
  }
};

export const sendAudio = async (sender, receiver, content) => {
  try {
    //  console.log(content);
    const formData = new FormData();
    formData.append("from", sender);
    formData.append("to", receiver);
    formData.append("file", content);

    const res = await axios.post("http://localhost:8080/audio", formData);
    return res.data.message;
  } catch (err) {
    // console.log(err);
  }
};

export const sendVideo = async (sender, receiver, content) => {
  try {
    //  console.log(content);
    const formData = new FormData();
    formData.append("from", sender);
    formData.append("to", receiver);
    formData.append("file", content);

    const res = await axios.post("http://localhost:8080/video", formData);
    return res.data.message;
  } catch (err) {
    // console.log(err);
  }
};

export const getMessage = async (sender, receiver) => {
  try {
    const x = { from: sender, to: receiver };

    const res = await axios.get(
      `http://localhost:8080/messagetest/${JSON.stringify(x)}`
    );

    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const postStory = async (sender, textContent, imgfile) => {
  try {
    const formData = new FormData();
    formData.append("from", sender);
    formData.append("text", textContent);
    formData.append("file", imgfile);
    console.log(imgfile);

    const res = await axios.post("http://localhost:8080/poststory", formData);
    return res.data.message;
  } catch (err) {
    // console.log(err);
  }
};

export const deleteStory = async () => {
  try {
    console.log("Delete All B");
    const res = await axios.post("http://localhost:8080/deletestory");
    console.log("Delete All B2");
    return res.data.message;
  } catch (err) {
    // console.log(err);
  }
};

export const getStory = async (hostName) => {
  console.log("xxxxx getStory ");
  try {
    console.log("getStory");
    console.log(hostName);
    const res = await axios.get(`http://localhost:8080/getstory/${hostName}`);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const getFriends = async (username) => {
  try {
    console.log("getFriends");
    console.log(username);
    const res = await axios.get(`http://localhost:8080/getfriends/${username}`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const getStrangers = async (username) => {
  try {
    console.log("getStrangers");
    console.log(username);
    const res = await axios.get(
      `http://localhost:8080/getstrangers/${username}`
    );
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const deleteFriend = async (username, friend) => {
  try {
    console.log("deleteFriend");
    console.log(username);
    console.log(friend);

    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("friend", friend);
    const res = await axios.delete(`http://localhost:8080/deletefriend`, {
      // eslint-disable-next-line object-shorthand
      data: { username: username, friend: friend },
    });
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const addFriend = async (username, friend) => {
  try {
    console.log("addFriend");
    console.log(username);
    console.log(friend);

    const res = await axios.get(
      `http://localhost:8080/addfriend/${username}&${friend}`
    );
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const deleteUser = async (username) => {
  try {
    console.log("deleteFriend");
    console.log(username);

    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("friend", friend);
    const res = await axios.delete(`http://localhost:8080/deleteuser`, {
      // eslint-disable-next-line object-shorthand
      data: { username: username },
    });
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const updatePassword = async (username, password) => {
  try {
    console.log("updatePassword");
    console.log(username);

    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("friend", friend);
    const data = `username=${username}&newPassword=${password}`;
    const res = await axios.post("http://localhost:8080/updatepassword", data);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const getAtUser = async (username) => {
  try {
    console.log(`getAtUser${username}`);
    const res = await axios.get(`http://localhost:8080/exist/${username}`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const deleteMessageInDataBase = async (dataID) => {
  await fetch("http://localhost:8080/deletemessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mid: dataID }),
  }).catch(() => {
    // console.log(error);deleteConversationInDataBase
  });
};

export const deleteCurrentMessageInDataBase = async (messageTime) => {
  await fetch("http://localhost:8080/deletecurrentmessage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rawTime: messageTime }),
  }).catch(() => {
    // console.log(error);
  });
};

export const deleteConversationInDataBase = async (user, friend) => {
  console.log("xxxxxxxx");
  await fetch("http://localhost:8080/deleteconversation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: user, to: friend }),
  }).catch(() => {
    // console.log(error);
  });
};

export const adduserPair = async (host, partner) => {
  await fetch("http://localhost:8080/userpair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: host, to: partner }),
  }).catch(() => {
    // console.log(error);
  });
};

// use to tell websocket server that a user close its window and clear the token on the server short push
export const disconnect = async (host) => {
  await fetch("http://localhost:8080/disconnect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: host }),
  }).catch(() => {
    // console.log(error);
  });
};

export const updateAllmessagetoRead = async (host, partner) => {
  await fetch("http://localhost:8080/updateallmessagetoread", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ from: host, to: partner }),
  }).catch(() => {
    // console.log(error);
  });
};

export const getStory2 = async (hostName) => {
  try {
    const res = await axios.get(`http://localhost:8080/getstory2/${hostName}`);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const updateLastvisittime = async (username, lastTime) => {
  try {
    console.log(`update last_visit_post_time: ${username}, time = lastTime`);

    const data = `username=${username}&lastTime=${lastTime}`;
    const res = await axios.post(
      "http://localhost:8080/updatelastvisitposttime",
      data
    );
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const addProfilePhoto = async (username, content) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("file", content);

    const res = await axios.post(
      "http://localhost:8080/profilepicture",
      formData
    );
    return res.data.message;
  } catch (err) {
    // console.log(err);
  }
};

export const getProfilePic = async (username) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/getprofilepicture/${username}`
    );
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};

export const updateLastChatTime = async (hostname, friendname) => {
  console.log("updateLastChatTime");
  await fetch("http://localhost:8080/updatelastchattime", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host: hostname, friend: friendname }),
  }).catch(() => {
    // console.log(error);
  });
};

export const checkNotifaciton = async (hostname) => {
  try {
    const res = await axios.get(
      `http://localhost:8080/checknotifaciton/${hostname}`
    );
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};
export const deleteNotifaction = async (num) => {
  console.log("delete Notifaction");
  await fetch("http://localhost:8080/deletenotifaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mid: num }),
  }).catch(() => {
    // console.log(error);
  });
};

export const postNotifaciton = async (From, To, MessageType, SqlDate) => {
  console.log("delete Notifaction");
  await fetch("http://localhost:8080/postStorynotifaciton", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from: From,
      to: To,
      messageType: MessageType,
      sqlDate: SqlDate,
    }),
  }).catch(() => {
    // console.log(error);
  });
};

export const deleteAllNotification = async (name) => {
  console.log("delete All Notification ");
  await fetch("http://localhost:8080/deleteallnotification", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host: name }),
  }).catch(() => {
    // console.log(error);
  });
};

export const forgotAndReset = async (Username, Password, SecurityCode) => {
  console.log("forgot and reset password");
  try {
    const data = `username=${Username}&password=${Password}&securityCode=${SecurityCode}`;
    const res = await axios.post(`http://localhost:8080/forgotandreset`, data);
    console.log(res);
    return res.data;
  } catch (err) {
    // console.log(err);
  }
};
