/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import { DropzoneArea } from "material-ui-dropzone";

// import PropTypes from "prop-types";
import NavigationBar from "./NavigationBar";
import {
  postStory,
  getStory,
  getAtUser,
  updateLastvisittime,
  deleteStory,
  getFriends,
  postNotifaciton,
} from "./getData";
import Post from "./Post";
import Signal from "./Signal";

class Story extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imgeFile: "",
      // story: [],
      dropBoxStyle: "none",
      PostButtonStyle: "inline",
      lastVisitTime: "",
      oldStory: [],
      newStory: [],
      // dataFetch: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.hanldeSubmit = this.hanldeSubmit.bind(this);
    this.handledisplayDropBox = this.handledisplayDropBox.bind(this);
    this.handleCloseDropBox = this.handleCloseDropBox.bind(this);
    this.getTime = this.getTime.bind(this);
    // this.cleanse = this.cleanse.bind(this);
    // this.double = this.double.bind(this);
    this.hanldeDelete = this.hanldeDelete.bind(this);
    this.getTimeHelper1 = this.getTimeHelper1.bind(this);
    this.getTimeHelper2 = this.getTimeHelper2.bind(this);
    this.forTest = this.forTest.bind(this);
    // this.getTime();
  }

  forTest() {
    this.setState({ lastVisitTime: "2020-12-04 07:14:12" });
  }

  getTimeHelper1(obj, timeTemp) {
    const friendName = obj.friend;
    let urlTemp = "";
    // console.log(obj.img_content);
    if (obj.img_content !== "undefined") {
      const mc = JSON.parse(obj.img_content);
      if (mc !== null && mc.buffer !== undefined) {
        urlTemp = URL.createObjectURL(new Blob([Buffer.from(mc.buffer)]));
        // console.log(urlTemp);
      }
    }
    let messageContent = "";
    if (obj.message_content !== "undefined") {
      messageContent = obj.message_content;
    }
    const time = obj.message_time;
    if (time !== null && time !== undefined) {
      const timeDate = new Date(obj.message_time);
      const lastVisitTimeDate = new Date(timeTemp);
      lastVisitTimeDate.setSeconds(lastVisitTimeDate.getSeconds() - 10);
      if (timeDate < lastVisitTimeDate) {
        return null;
      }
    }

    // const adjustTime = new Date(obj.message_time);
    const adjustTime = new Date(JSON.parse(JSON.stringify(obj.message_time)));
    // adjustTime.setHours(adjustTime.getHours() - 5);

    return (
      <Post
        name={friendName}
        textCotent={messageContent}
        imgContent={urlTemp}
        // postTime={`${time} New Feed`}
        postTime={`${adjustTime}`}
        viewStatus="New Feed"
      />
    );
  }

  getTimeHelper2(obj, timeTemp) {
    console.log("xxxxxxxxx");
    // console.log(obj);
    const friendName = obj.friend;
    let urlTemp = "";
    if (obj.img_content !== "undefined") {
      const mc = JSON.parse(obj.img_content);
      if (mc !== null && mc.buffer !== undefined) {
        urlTemp = URL.createObjectURL(new Blob([Buffer.from(mc.buffer)]));
      }
    }
    let messageContent = "";
    if (obj.message_content !== "undefined") {
      messageContent = obj.message_content;
    }
    const time = obj.message_time;
    if (time !== null && time !== undefined) {
      const timeDate = new Date(obj.message_time);
      const lastVisitTimeDate = new Date(timeTemp);
      lastVisitTimeDate.setSeconds(lastVisitTimeDate.getSeconds() - 10);

      const adjustTime = new Date(JSON.parse(JSON.stringify(obj.message_time)));
      // adjustTime.setHours(adjustTime.getHours() - 5);

      if (timeDate < lastVisitTimeDate) {
        return (
          <Post
            name={friendName}
            textCotent={messageContent}
            imgContent={urlTemp}
            // postTime={`${time} Viewed`}
            postTime={`${adjustTime}`}
            viewStatus="Viewed"
          />
        );
      }
    }

    return null;
  }

  async getTime() {
    console.log("get time");
    const { username } = this.props;
    await getAtUser(username)
      .then((res) => {
        console.log(res);
        let timeTemp = res[0].last_visit_post_time;
        if (timeTemp === null || timeTemp === undefined) {
          timeTemp = "2000-11-20T00:00:00Z";
        }
        this.setState({ lastVisitTime: timeTemp });
        getStory(username)
          .then((res1) => {
            const newStories = res1.map((obj) => {
              return this.getTimeHelper1(obj, timeTemp);
            });
            this.setState({ newStory: newStories });
            const oldStories = res1.map((obj) => {
              return this.getTimeHelper2(obj, timeTemp);
            });
            this.setState({ oldStory: oldStories });
          })
          .catch(() => {});
      })
      .catch(() => {});

    // updateLastvisittime(username, new Date().toString());
  }

  // componentDidUpdate() {
  componentDidMount() {
    // console.log("componentDidMount");
    // setInterval(() => {
    //   // console.log(window.top.location.href);
    this.getTime();
    // }, 2000);

    const { username } = this.props;

    // const { lastVisitTime } = this.state;
    // ////////////////////////////////////////////////////
    // const currentTime = new Date().toISOString();
    const currentTime = new Date().toString();

    console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
    console.log(new Date());
    console.log(new Date().toString());
    // console.log(new Date().toISOString());

    // const currentTime = "2020-11-20T00:00:00Z";
    // ////////////////////////////////////////////////////

    console.log(`currentTime = ${currentTime}, username = ${username}`);
    console.log(`EEEEEEE lastVisitTime = ${this.state.lastVisitTime}`);

    updateLastvisittime(username, currentTime);
  }

  // eslint-disable-next-line class-methods-use-this
  handleChange(files) {
    if (files.length !== 0) {
      if (files[0].size > 3800000) {
        // eslint-disable-next-line no-alert
        alert("File is too big!");
      } else {
        this.setState({ imgeFile: files[0] });
      }
    }
  }

  handledisplayDropBox() {
    this.setState({ dropBoxStyle: "inline" });
    this.setState({ PostButtonStyle: "none" });
  }

  handleCloseDropBox() {
    this.setState({ dropBoxStyle: "none" });
    this.setState({ PostButtonStyle: "inline" });
  }

  hanldeSubmit() {
    const { imgeFile } = this.state;
    const { username } = this.props;
    let text = "";
    if (document.getElementById("text") !== null) {
      text = document.getElementById("text").value;
    }
    // console.log(text);
    console.log(username);
    if (text.length !== 0 || imgeFile !== "") {
      postStory(username, text, imgeFile);

      this.handleCloseDropBox();

      getFriends(localStorage.getItem("currentUser"))
        .then((response) => {
          for (let i = 0; i < response.length; i += 1) {
            const sqlDate = new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " ");
            postNotifaciton(
              localStorage.getItem("currentUser"),
              response[i].friend,
              "story",
              sqlDate
            );
          }
        })
        .catch(() => {});
    }
  }

  hanldeDelete() {
    deleteStory();
  }

  render() {
    const { dropBoxStyle, PostButtonStyle, lastVisitTime } = this.state;
    if (lastVisitTime === "" || lastVisitTime === undefined) {
      return <div />;
    }
    let greeting = "See what's new!";
    if (this.state.newStory.length === 0) {
      greeting = "No new posts!";
    }
    return (
      <div>
        <NavigationBar />
        <div id="postStory" style={{ display: dropBoxStyle }}>
          <textarea
            id="text"
            cols="50"
            rows="5"
            placeholder="Share Your Story Here"
          />
          {/* <button type="submit" onClick={() => this.hanldeDelete()}>
            Delete All
          </button> */}
          <div id="dropbox">
            <DropzoneArea
              id="dropboxarea"
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              maxFileSize={3800000}
              filesLimit={1}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <button type="submit" onClick={() => this.hanldeSubmit()}>
            <AddBoxOutlinedIcon />
          </button>
          <button
            id="closeDropBox"
            type="submit"
            onClick={() => this.handleCloseDropBox()}
          >
            <CloseIcon />
          </button>
        </div>
        <button
          id="displayDropBox"
          type="submit"
          style={{ display: PostButtonStyle }}
          onClick={() => this.handledisplayDropBox()}
        >
          Share a Post
        </button>

        <div id="StoryDiv">
          <p>{greeting}</p>
          <div id="NewStoryDiv">{this.state.newStory}</div>
          <h2>
            <span>Previous Feeds</span>
          </h2>
          <div id="OldStoryDiv">{this.state.oldStory}</div>
        </div>
        <Signal />
      </div>
    );
  }
}

Story.propTypes = {};

export default Story;
