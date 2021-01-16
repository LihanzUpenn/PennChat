/* eslint-disable  */
import React, { useEffect, useState, useRef } from "react";
import { Howl } from "howler";
// import "./App.css";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import Timer from "./Timer";
import ringbell from "../audioclips/one_piece_phone.mp3";

const Container = styled.div`
  height: 50vh;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 200px;
  height: 150px;
`;

function Videocall(props) {
  const [yourID, setYourID] = useState("");
  const [partnerID, setpartnerID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [endCallStyle, setendCallStyle] = useState("none");
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [endCallState, setendCallState] = useState(false);
  const [ringbellState, setringbellState] = useState(true);
  const [r, setr] = useState("");

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  // ////////////////

  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    clearInterval(interv);
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  useEffect(() => {
    socket.current = io.connect("/", { query: `loggeduser=${props.username}` });
    if (navigator.mediaDevices !== undefined) {
      navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
    }

    socket.current.on("yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
      setInterv(setInterval(soundPlay, 3000));
    });

    socket.current.on("someoneGoBack", (users) => {
      setUsers(users);
      if (document.getElementById("friendAvaiablity")) {
        document.getElementById("friendAvaiablity").style.display = "inline";
      }
    });
  }, []);

  function callPeer(id) {
    if (document.getElementById("gobackbutton")) {
      document.getElementById("gobackbutton").style.display = "none";
    }
    setpartnerID(id);
    if (document.getElementById("message")) {
      document.getElementById("message").innerHTML = "";
    }
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      start();
      setUsers({});
      setCallAccepted(true);
      setendCallStyle("inline");
      peer.signal(signal);
    });

    socket.current.on("callDeclinedbyReceiver", (signal) => {
      if (document.getElementById("gobackbutton")) {
        document.getElementById("gobackbutton").style.display = "block";
      }
      if (document.getElementById("message")) {
        document.getElementById("message").innerHTML = "Call is rejected";
      }
    });

    socket.current.on("Callend", (singal) => {
      deleteTrack();
      // console.log("lalala");
      // console.log("singal");
      setendCallStyle("none");
      props.endDisplayVideo();
      socket.current.emit("disconnected", { id1: yourID, id2: partnerID });
    });
  }

  function acceptCall() {
    if (document.getElementById("acceptButton")) {
      document.getElementById("acceptButton").style.display = "none";
    }
    if (document.getElementById("declineButton")) {
      document.getElementById("declineButton").style.display = "none";
    }
    if (document.getElementById("callLabel")) {
      document.getElementById("callLabel").style.display = "none";
    }
    if (document.getElementById("message")) {
      document.getElementById("message").innerHTML = "";
    }

    start();
    setUsers({});
    setendCallStyle("inline");
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);

    socket.current.on("CallendbyCaller", (singal) => {
      deleteTrack();
      // console.log("lalala");
      // console.log("singal");
      setendCallStyle("none");
      props.endDisplayVideo();
      socket.current.emit("disconnected", { id1: yourID, id2: partnerID });
    });
  }

  const soundPlay = () => {
    const src = ringbell;
    const sound = new Howl({ src, html5: true });
    sound.play();
  };

  function handleEndCall() {
    deleteTrack();
    socket.current.emit("disconnected", { id1: yourID, id2: partnerID });
    setendCallStyle("none");
    socket.current.emit("endCall", { signal: "data", to: caller });
    socket.current.emit("callerEndCall", { signal: "data", to: partnerID });
    props.endDisplayVideo();
  }

  function declineCall() {
    clearInterval(interv);
    // console.log("decline");
    socket.current.emit("declineCall", { signal: "data", to: caller });
    if (document.getElementById("incomingCall")) {
      document.getElementById("incomingCall").style.display = "none";
    }
    if (document.getElementById("gobackbutton")) {
      document.getElementById("gobackbutton").style.display = "inline";
    }
    setReceivingCall(false);
  }

  function handleGoBack() {
    deleteTrack();
    socket.current.emit("declineCall", { signal: "data", to: caller });
    socket.current.emit("goback", { id1: yourID, id2: partnerID });
    props.endDisplayVideo();
    clearInterval(interv);
  }

  function deleteTrack() {
    if (!window.streamReference) return;
    window.streamReference.getAudioTracks().forEach((track) => {
      track.stop();
    });
    window.streamReference.getVideoTracks().forEach((track) => {
      track.stop();
    });
    window.streamReference = null;
  }

  let UserVideo;
  if (stream) {
    window.streamReference = stream;
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }
  let incomingCall;
  if (receivingCall) {
    document.getElementById("gobackbutton").style.display = "none";
    if (document.getElementById("incomingCall")) {
      document.getElementById("incomingCall").style.display = "inline";
    }
    // console.log(users[caller]);
    incomingCall = (
      <div>
        <h1 id="callLabel"> {users[caller]} is calling you</h1>
        <button type="submit" onClick={acceptCall} id="acceptButton">
          Accept
        </button>
        <button type="submit" onClick={declineCall} id="declineButton">
          Decline
        </button>
      </div>
    );
  }

  return (
    <Container>
      <Row id="videoes">
        {UserVideo}
        {PartnerVideo}
        <button
          type="submit"
          onClick={handleEndCall}
          id="endCallbutton"
          style={{ display: endCallStyle }}
        >
          End Call
        </button>
        <div id="message"></div>
        <br />
        <div id="friendAvaiablity">{`${props.friend} is not in the room`}</div>
      </Row>
      <Row>
        {Object.keys(users).map((key) => {
          // console.log(props.friend);
          if (key === yourID) {
            return null;
          }
          if (users[key] !== props.friend) {
            return null;
          }
          if (document.getElementById("friendAvaiablity")) {
            document.getElementById("friendAvaiablity").style.display = "none";
          }
          return (
            <button onClick={() => callPeer(key)}>Call {users[key]}</button>
          );
        })}
      </Row>
      <Row id="incomingCall">{incomingCall}</Row>
      <Row>
        <button type="submit" onClick={handleGoBack} id="gobackbutton">
          Go Back
        </button>
      </Row>
      <Row>
        <Timer time={time} />
      </Row>
    </Container>
  );
}

export default Videocall;
