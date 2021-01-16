import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import SendIcon from "@material-ui/icons/Send";
import ImageIcon from "@material-ui/icons/Image";
import MovieIcon from "@material-ui/icons/Movie";
import Button from "@material-ui/core/Button";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import {
  joinChat,
  sendMessage,
  sendImage,
  sendAudio,
  sendVideo,
  deleteMessageInDataBase,
  deleteCurrentMessageInDataBase,
  deleteConversationInDataBase,
  postNotifaciton,
} from "./getData";
import { setupWSConnection } from "./notifications";
/* eslint-disable  */

function Chat(props) {
  // eslint-disable-next-line no-unused-vars
  const [contacts, setContacts] = useState(0); // number of connected users
  // eslint-disable-next-line no-unused-vars
  const [messages, setMessages] = useState(0); // counts messages sent and received - lift up state

  const {
    previousMessages,
    currentMessage,
    time,
    from,
    to,
    displayVideo,
    currentPair,
    friendPhoto,
  } = props;
  console.log(displayVideo);
  // eslint-disable-next-line no-shadow
  const updateContacts = () => setContacts((contacts) => contacts + 1);
  // eslint-disable-next-line no-shadow
  const updateMessages = () => setMessages((messages) => messages + 1);

  const authenticate = async () => {
    if (sessionStorage.getItem("token") === null) {
      const token = await joinChat(localStorage.getItem("currentUser")); // get the token (jwt) from the web server
      if (token) {
        sessionStorage.setItem("token", token); // store token in session storage
      }
    }
    setupWSConnection(
      updateContacts,
      updateMessages,
      currentMessage,
      localStorage.getItem("currentUser"),
      currentPair,
      to,
      previousMessages
    ); // setup ws connection -- pass the wrapper functions as parameters
    // eslint-disable-next-line no-shadow
    setContacts((contacts) => contacts + 1); // update state to trigger re-rendering and useEffect
  };

  useEffect(() => {
    authenticate();

    const cleanup = () => {
      sessionStorage.removeItem("token"); // clean the session storage
    };

    // we need to cleanup when leaving the tab
    window.addEventListener("beforeunload", cleanup);

    return () => {
      window.removeEventListener("beforeunload", cleanup);
    };
  }, []);

  // we pass the messages to the child as props
  // the .current property of a mutable reference
  // contains the messages
  return (
    <div id="chatbox">
      {/* <UsersComponent /> */}
      <MessagesComponent
        currentMessageHtml={currentMessage}
        from={from}
        to={to}
        previousMessages={previousMessages}
        displayVideo={props.displayVideo}
        currentPair={currentPair}
        friendPic={friendPhoto}
      />
    </div>
  );
}

// messages component
export function MessagesComponent(props) {
  const [conversation, setconversation] = useState(0);
  const [audioState, setaudioState] = useState(); // current audio blob
  const [videoState, setVideoState] = useState(); // current video blob
  const conversationState = () =>
    setconversation((conversation) => conversation + 1);
  const { to, from } = props;
  let stopAudioButton = function stop() {};
  let uploadImg = function upl() {};
  const sendMsg = () => {
    const text = document.getElementById("msg").value;
    if (text.length > 0 && to.length > 0 && from.length > 0) {
      sendMessage(from, to, text);
      document.getElementById("msg").value = "";
    }
  };

  // useEffect(() => {
  //   shortpullforNotifcationCheck();
  // }, []);

  // shortpullforNotifcationCheck(){
  //   setInterval(() => {

  //   }, 2000);
  // }

  // handle sending img
  const handleSendImg = (e) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].size > 3800000) {
        // eslint-disable-next-line no-alert
        alert("File is too big!");
        e.target.value = "";
      } else {
        // setimgState(e.target.files[0]);
        const reader = new FileReader();
        // eslint-disable-next-line func-names
        reader.onload = function () {
          const img = new Image();
          img.src = reader.result;
          document.getElementById("showingArea").setAttribute("src", img.src);

          const imgURL = img.src;
          uploadImg = function upload() {
            if (imgURL.length > 0 && to.length > 0 && from.length > 0) {
              sendImage(from, to, e.target.files[0]);
              document.getElementById("showingArea").setAttribute("src", "");
              document.getElementById("imgInput").value = null;
              const sqlDate = new Date()
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
              postNotifaciton(from, to, "image", sqlDate);
            }
          };
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  // sending audio

  const audioButton = () => {
    document.getElementById("stopbtn").setAttribute("style", "display: inline");
    const device = navigator.mediaDevices.getUserMedia({ audio: true });
    const items = [];
    device.then((stream) => {
      window.streamReference = stream;
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        items.push(e.data);
        if (recorder.state === "inactive") {
          const blob = new Blob(items, { type: "audio/webm" });
          const audio = document.getElementById("audioMessageDiv");
          const mainaudio = document.createElement("audio");
          mainaudio.setAttribute("controls", "controls");
          mainaudio.setAttribute("id", "audioMessage");
          if (document.getElementById("audioMessage") !== null) {
            document.getElementById("audioMessage").remove();
          }
          audio.appendChild(mainaudio);
          mainaudio.innerHTML = `<source src=" ${URL.createObjectURL(
            blob
          )}" type= "video/webm" />`;

          setaudioState(blob);
        }
      };
      recorder.start(100);

      stopAudioButton = () => {
        recorder.stop();
        if (!window.streamReference) return;
        window.streamReference.getAudioTracks().forEach((track) => {
          track.stop();
        });
        window.streamReference = null;
        document
          .getElementById("stopbtn")
          .setAttribute("style", "display: none");
      };
    });
  };

  const uploadAudio = () => {
    if (audioState != null) {
      sendAudio(from, to, audioState);
      if (document.getElementById("audioMessage") !== null) {
        document.getElementById("audioMessage").remove();
      }
      const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
      postNotifaciton(from, to, "audio", sqlDate);
    }
  };

  // sending video
  const handleSendVideo = (e) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].size > 3800000) {
        // eslint-disable-next-line no-alert
        alert("File is too big!");
        e.target.value = "";
      } else {
        const reader = new FileReader();
        // eslint-disable-next-line func-names
        reader.onload = function () {
          // console.log(reader.result);
          const videoMessageDiv = document.getElementById("videoMessageDiv");
          const thevideo = document.createElement("video");
          thevideo.setAttribute("id", "videoMessage");
          thevideo.setAttribute("controls", "controls");
          thevideo.style.maxHeight = "100px";
          thevideo.style.maxWidth = "200px";
          if (document.getElementById("videoMessage") !== null) {
            document.getElementById("videoMessage").remove();
          }
          videoMessageDiv.appendChild(thevideo);
          thevideo.innerHTML = `<source src=" ${reader.result}" type= "video/mp4" />`;
          setVideoState(e.target.files[0]);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  const uploadVideo = function up() {
    sendVideo(from, to, videoState);
    if (document.getElementById("videoMessage") !== null) {
      document.getElementById("videoMessage").remove();
      document.getElementById("videoInput").value = null;
    }
    const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    postNotifaciton(from, to, "video", sqlDate);
  };

  function processAt(message_content) {
    let message_content_temp = <div>{message_content}</div>;
    const index1 = message_content.indexOf("@");
    if (index1 >= 0) {
      let index2 = message_content.indexOf(" ", index1 + 1);
      if (index2 == -1) {
        index2 = message_content.length;
      }
      if (index2 == index1 + 1) {
        message_content_temp = <div>{message_content}</div>;
      } else {
        const name_at = message_content.substring(index1 + 1, index2);
        const url = `http://localhost:3000/profileOther/${name_at}`;
        message_content_temp = (
          // <div> <a href="http://localhost:3000/profileOther/Lili" target="_blank">@Lili</a></div>
          <div>
            {message_content.substring(0, index1)}
            <a href={url} target="_blank">
              @{name_at}
            </a>
            {message_content.substring(index2)}
          </div>
        );
      }
    } else {
      message_content_temp = <div>{message_content}</div>;
    }
    return message_content_temp;
  }

  function processAt_2(message_content) {
    // let message_content_temp_str = `<div>${message_content}</div>`;
    let message_content_temp_str = `${message_content}`;
    const index1 = message_content.indexOf("@");
    if (index1 >= 0) {
      let index2 = message_content.indexOf(" ", index1 + 1);
      if (index2 == -1) {
        index2 = message_content.length;
      }
      if (index2 == index1 + 1) {
        // message_content_temp_str = `<div>${message_content}</div>`;
        message_content_temp_str = `${message_content}`;
      } else {
        const message_at_array = message_content.split("@");
        let index3;
        let name_at;
        let url;
        let message_content_temp_str = message_at_array[0];
        for (let i = 1; i < message_at_array.length; i += 1) {
          index3 = message_at_array[i].indexOf(" ");
          if (index3 == -1) {
            index3 = message_at_array[i].length;
          }
          name_at = message_at_array[i].substring(0, index3);
          url = `http://localhost:3000/profileOther/${name_at}`;
          message_content_temp_str += `<a href=${url} target="_blank">@${name_at}</a>`;
          message_content_temp_str += message_at_array[i].substring(index3);
        }
        // message_content_temp_str = "<div>" + message_content_temp_str + "</div>";
        return { __html: message_content_temp_str };
      }
    } else {
      // message_content_temp_str = `<div>${message_content}</div>`;
      message_content_temp_str = `${message_content}`;
    }
    return { __html: message_content_temp_str };
  }

  const { previousMessages, currentMessageHtml, displayVideo } = props;
  let previousMessagesCopy = previousMessages;
  let currentMessageHtmlCopy = currentMessageHtml;

  if (currentMessageHtmlCopy === undefined) {
    currentMessageHtmlCopy = [];
  }

  const deleteMessage = function (time) {
    // console.log(time);
    for (let i = 0; i < previousMessagesCopy.length; i += 1) {
      if (
        previousMessagesCopy[i] !== null &&
        previousMessagesCopy[i].message_time === time
      ) {
        console.log("find it");
        deleteMessageInDataBase(previousMessagesCopy[i].mid);
        previousMessagesCopy.splice(i, 1);
      }
    }

    for (let i = 0; i < currentMessageHtmlCopy.length; i += 1) {
      console.log(currentMessageHtmlCopy[i].rawtime);

      if (
        currentMessageHtmlCopy[i] !== null &&
        currentMessageHtmlCopy[i].message_time === time
      ) {
        console.log("find it");
        deleteCurrentMessageInDataBase(currentMessageHtmlCopy[i].rawtime);
        currentMessageHtmlCopy.splice(i, 1);
      }
    }
    conversationState();
  };

  const deleteConversation = function () {
    conversationState();
    deleteConversationInDataBase(props.from, props.to);
    for (let i = 0; i < previousMessagesCopy.length; i += 1) {
      previousMessagesCopy[i] = null;
    }
    for (let i = 0; i < currentMessageHtmlCopy.length; i += 1) {
      currentMessageHtmlCopy[i] = null;
    }
  };

  return (
    <div>
      <div>
        <a href={`http://localhost:3000/profileOther/${to}`} target="_blank">
          <Avatar className="friendavatar" src={`${props.friendPic}`} />
        </a>
        <label>Talking To: </label>

        <span>{to}</span>
        <div id="displayDiv">
          <div>
            {previousMessagesCopy.map((msg) => {
              let readStatus = "delievered";
              if (msg !== null) {
                const adjustTime = new Date(
                  JSON.parse(JSON.stringify(msg.message_time))
                );
                adjustTime.setHours(adjustTime.getHours() - 5);
                if (msg.from_host === props.from) {
                  if (msg.status === "read") {
                    if (
                      msg.message_type === "text" ||
                      msg.message_type === "image"
                    ) {
                      readStatus = "read";
                    }
                    if (msg.message_type === "video") {
                      readStatus = "watched";
                    }
                    if (msg.message_type === "audio") {
                      readStatus = "listerned";
                    }
                  }
                  if (msg.message_type === "text") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <div
                            dangerouslySetInnerHTML={processAt_2(
                              msg.message_content
                            )}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{readStatus}</div>
                      </div>
                    );
                  }
                  if (msg.message_type === "video") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <video
                            className="video"
                            controls="controls"
                            src={msg.message_content}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{readStatus}</div>
                      </div>
                    );
                  }
                  if (msg.message_type === "image") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <img
                            width="100"
                            height="100"
                            src={msg.message_content}
                            alt=""
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{readStatus}</div>
                      </div>
                    );
                  }
                  if (msg.message_type === "audio") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <audio
                            className="audio"
                            controls="controls"
                            src={msg.message_content}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{readStatus}</div>
                      </div>
                    );
                  }
                } else {
                  if (msg.message_type === "text") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft" id={msg.message_content}>
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <div
                          dangerouslySetInnerHTML={processAt_2(
                            msg.message_content
                          )}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                        />
                      </div>
                    );
                  }
                  if (msg.message_type === "video") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft">
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <video
                          className="video"
                          controls="controls"
                          src={msg.message_content}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                        />
                      </div>
                    );
                  }
                  if (msg.message_type === "image") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft">
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <img
                          width="100"
                          height="100"
                          src={msg.message_content}
                          alt=""
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                        />
                      </div>
                    );
                  }
                  if (msg.message_type === "audio") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft">
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <audio
                          className="audio"
                          controls="controls"
                          src={msg.message_content}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                        />
                      </div>
                    );
                  }
                }
              }
            })}
          </div>

          <div>
            {currentMessageHtmlCopy.map((msg) => {
              if (
                (msg !== null && msg.from_host === props.from) ||
                (msg !== null && msg.from_host === props.to)
              ) {
                const adjustTime = new Date(
                  JSON.parse(JSON.stringify(msg.message_time))
                );
                adjustTime.setHours(adjustTime.getHours() - 5);
                if (msg.from_host === props.from) {
                  console.log("zzzzzzzz");
                  if (msg.message_type === "text") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <div
                            dangerouslySetInnerHTML={processAt_2(
                              msg.message_content
                            )}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{`${msg.status}`}</div>
                      </div>
                    );
                  }
                  if (msg.message_type === "video") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <video
                            className="video"
                            controls="controls"
                            src={msg.message_content}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{`${msg.status}`}</div>
                      </div>
                    );
                  }
                  if (msg.message_type === "image") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <img
                            width="100"
                            height="100"
                            src={msg.message_content}
                            alt=""
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{`${msg.status}`}</div>
                      </div>
                    );
                  }
                  if (msg.message_type === "audio") {
                    return (
                      <div>
                        <div className="bubbleRight">
                          <span className="timeCssRight">
                            {`${adjustTime.toString().split(" GMT")[0]}`}
                          </span>
                          <br />
                          <audio
                            className="audio"
                            controls="controls"
                            src={msg.message_content}
                          />
                          <Button
                            variant="contained"
                            color="primary"
                            id="deleteBtn"
                            startIcon={
                              <HighlightOffOutlinedIcon size="small" />
                            }
                            onClick={() => deleteMessage(msg.message_time)}
                            size="small"
                          />
                        </div>
                        <div id="readStatusRight">{`${msg.status}`}</div>
                      </div>
                    );
                  }
                } else {
                  console.log("zz--------------");
                  console.log(msg.from_host);
                  console.log(msg.message_type);
                  if (msg.message_type === "text") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft">
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <div
                          dangerouslySetInnerHTML={processAt_2(
                            msg.message_content
                          )}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                        />
                      </div>
                    );
                  }
                  if (msg.message_type === "video") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft">
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <video
                          className="video"
                          controls="controls"
                          src={msg.message_content}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                          type="submit"
                        />
                      </div>
                    );
                  }
                  if (msg.message_type === "image") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft">
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <img
                          width="100"
                          height="100"
                          src={msg.message_content}
                          alt=""
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                        />
                      </div>
                    );
                  }
                  if (msg.message_type === "audio") {
                    return (
                      <div className="bubbleLeft">
                        <span className="timeCssLeft">
                          {`${adjustTime.toString().split(" GMT")[0]}`}
                        </span>
                        <br />
                        <audio
                          className="audio"
                          controls="controls"
                          src={msg.message_content}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          id="deleteBtn"
                          startIcon={<HighlightOffOutlinedIcon size="small" />}
                          onClick={() => deleteMessage(msg.message_time)}
                          size="small"
                        />
                      </div>
                    );
                  }
                }
              }
            })}
          </div>
        </div>
      </div>
      <div>
        <label>Current User: </label>
        <span>{from}</span>
      </div>
      <div>
        <div id="MessageBox">
          <textarea
            cols="10"
            rows="5"
            id="msg"
            placeholder="Type here/ Preview Section"
          />
          <div id="displayArea">
            <div id="imageMessageDiv">
              <img id="showingArea" alt="" />
            </div>
            <div id="videoMessageDiv"> </div>
          </div>
          <button
            type="button"
            id="messagebtn"
            className="button"
            onClick={() => sendMsg()}
          >
            <SendIcon />
          </button>
          <button
            type="button"
            id="videocallbtn"
            className="button"
            onClick={() => displayVideo()}
          >
            Video Call
          </button>
          <button
            type="submit"
            id="deleteCoversationButton"
            onClick={() => deleteConversation()}
          >
            Delete the conversation
          </button>
        </div>
        <div id="messageAndImgeButton">
          <input
            id="imgInput"
            type="file"
            name="attachment[0][uploaded_data]"
            onChange={(e) => handleSendImg(e)}
            accept=".jpg"
          />
          <button type="button" className="button" onClick={() => uploadImg()}>
            <ImageIcon />
          </button>
        </div>
      </div>
      <div id="audio">
        <button type="button" className="button" onClick={() => audioButton()}>
          <MicIcon />
        </button>
        <button
          type="submit"
          className="button"
          id="stopbtn"
          onClick={() => stopAudioButton()}
        >
          <StopIcon />
        </button>

        <button type="submit" className="button" onClick={() => uploadAudio()}>
          send
        </button>
        <div id="audioMessageDiv"> </div>
      </div>
      <div id="video">
        <input
          id="videoInput"
          type="file"
          onChange={(e) => handleSendVideo(e)}
        />
        <button type="submit" className="button" onClick={() => uploadVideo()}>
          <MovieIcon />
        </button>
      </div>
    </div>
  );
}

export default Chat;
