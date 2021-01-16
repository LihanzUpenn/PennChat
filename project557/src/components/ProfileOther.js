/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */

import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Upload, Button, Icon } from "antd";
// import { Button } from "antd";
import { Avatar } from "@material-ui/core";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import { getAtUser, getProfilePic } from "./getData";

class ProfileOther extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePic: "",
      username: "",
      regidate: "",
    };

    this.handleGoBack = this.handleGoBack.bind(this);
  }

  componentDidMount() {
    const urlArray = window.location.href.split("/");
    const atName = urlArray[urlArray.length - 1];

    getAtUser(atName)
      .then((res) => {
        const otherProfile = res.map((obj) => {
          const username_temp = obj.username;
          const pic_temp = obj.picture;
          const date_temp = obj.regidate.split("T")[0];

          this.setState({ username: username_temp });
          this.setState({ regidate: date_temp });
          this.setState({ profilePic: pic_temp });
          return "";
        });
      })
      .catch(() => {});
  }

  handleGoBack() {
    window.location = `http://localhost:3000/homepage`;
  }

  render() {
    let { username, regidate, profilePic } = this.state;

    if (username === "") {
      username = "This user doesn't exist!";
      regidate = "Nothing here, please:";
      const nonexistPic = [
        "https://media.tenor.com/images/62238792a26f1957ee104fd17a54aaf8/tenor.gif",
        "https://www.gannett-cdn.com/presto/2019/07/01/USAT/56586d90-810d-408d-88d2-6340354d3c0c-VPC_DOG_CONFUSED_BY_VR_DESK_THUMB.jpg?width=388&height=388&crop=1080,1080,x290,y0",
        "https://steamuserimages-a.akamaihd.net/ugc/791992712493073080/9BF5EE311E5ED5B66350C0554262147CF3327D06/",
        "https://i.pinimg.com/originals/2a/80/9b/2a809b94926506068601c0506b5ef85f.jpg",
        "https://pbs.twimg.com/media/CDcyxK4WoAEPscs.jpg",
        "https://media.tenor.com/images/1879002401ffe6821c57e0434f125e5a/tenor.gif",
      ];
      const x = Math.floor(Math.random() * nonexistPic.length);
      profilePic = nonexistPic[x];
    } else {
      regidate = `Registration Date: ${regidate}`;
      getProfilePic(username)
        .then((res) => {
          // console.log(res[0].Picture);
          if (res[0].Picture != null) {
            const content = JSON.parse(res[0].Picture);
            const urlTemp = URL.createObjectURL(
              new Blob([Buffer.from(content.buffer)])
            );
            this.setState({ profilePic: urlTemp });
          } else {
            console.log("No User Profile Picture");
          }
        })
        .catch(() => {});
    }
    return (
      <div id="Profile">
        <div>
          <Avatar id="avatarProfile" src={profilePic} />
        </div>
        <h1>{username}</h1>
        <h3>{regidate}</h3>
        <div>
          <button type="submit" onClick={this.handleGoBack}>
            {" "}
            Go back
          </button>
        </div>
      </div>
    );
  }
}

export default ProfileOther;
