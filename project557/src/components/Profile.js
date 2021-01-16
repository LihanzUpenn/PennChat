/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Upload, Button, Icon } from "antd";
import { Button } from "antd";
import { Avatar } from "@material-ui/core";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import ReactFileReader from "react-file-reader";
import CryptoJS from "crypto-js";
import NavigationBar from "./NavigationBar";
import Signal from "./Signal";
import {
  deleteUser,
  updatePassword,
  addProfilePhoto,
  getProfilePic,
} from "./getData";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordInput: "",
      newPassword: "",
      passwordConformation: "",
      profileButtonDivStyle: "inline",
      changePasswordDivStyle: "none",
      passwordErrorMessageStyle: "none",
      MatchErrorMessageStyle: "none",
      lengthErrorMessageStyle: "none",
      changeAvatorStyle: "none",
      deactivateDivStyle: "none",
      updatedPassword: "",
      deactivatePassword: "",
      profilePic:
        "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg",
      testing: false,
    };
    this.handlechangePasswordButton = this.handlechangePasswordButton.bind(
      this
    );
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetPassWordSubmit = this.handleSetPassWordSubmit.bind(this);
    this.hanfleImgUpload = this.hanfleImgUpload.bind(this);
    this.handlechangeAvatarButton = this.handlechangeAvatarButton.bind(this);
    this.handledeactivateAccountButton = this.handledeactivateAccountButton.bind(
      this
    );
    this.finishAvatorButton = this.finishAvatorButton.bind(this);
    this.handleDeactivateButton = this.handleDeactivateButton.bind(this);
    this.handledeactivateAccountButton = this.handledeactivateAccountButton.bind(
      this
    );
    this.handleDeactivateGoback = this.handleDeactivateGoback.bind(this);
    this.handleResetPasswordGoback = this.handleResetPasswordGoback.bind(this);
    this.forTest = this.forTest.bind(this);
    this.encrypt = this.encrypt.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  forTest() {
    this.setState({ newPassword: "abc123abc" });
    this.setState({ testing: true });
    this.setState({ updatedPassword: "abc123abc" });
    this.setState({ deactivatePassword: "abc123abc" });
  }

  // eslint-disable-next-line class-methods-use-this
  encrypt(value) {
    const hash = CryptoJS.MD5(value).toString();
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    console.log("encryption");
    console.log(`pass = ${value}, hash = ${hash}`);
    console.log(`type: ${typeof hash}`);
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    return hash;
  }

  componentDidMount() {
    const changePasswordDiv = document.getElementById("changePasswordDiv");
    if (changePasswordDiv !== null) {
      changePasswordDiv.setAttribute("style", "display:none");
    }
    const { password } = this.props;
    this.setState({ updatedPassword: password });

    // need a fetch function to fetch data for profilePic

    getProfilePic(this.props.username)
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
  // const mc = JSON.parse(obj.message_content);
  // const urlTemp = URL.createObjectURL(new Blob([Buffer.from(mc.buffer)]))

  // ///////// Change Password Button ///////////////////////////
  handleSetPassWordSubmit() {
    const {
      passwordInput,
      newPassword,
      passwordConformation,
      updatedPassword,
    } = this.state;

    let digitFlag = false;
    let charFlag = false;
    let newPasswordCheck = false;
    let passwordCheck = false;
    let matchCheck = false;
    this.setState({ passwordErrorMessageStyle: "none" });
    this.setState({ MatchErrorMessageStyle: "none" });
    this.setState({ lengthErrorMessageStyle: "none" });

    if (newPassword.length < 5) {
      this.setState({ lengthErrorMessageStyle: "block" });
    } else {
      for (let i = 0; i < newPassword.length; i += 1) {
        if (newPassword.charAt(i) >= "0" && newPassword.charAt(i) <= "9") {
          digitFlag = true;
        }
        if (newPassword.charAt(i) < "0" || newPassword.charAt(i) > "9") {
          charFlag = true;
        }
      }
      if (digitFlag && charFlag) {
        this.setState({ lengthErrorMessageStyle: "none" });
        newPasswordCheck = true;
      } else {
        this.setState({ lengthErrorMessageStyle: "block" });
      }
    }

    if (newPassword !== passwordConformation) {
      this.setState({ MatchErrorMessageStyle: "block" });
    } else {
      matchCheck = true;
    }

    if (updatedPassword !== this.encrypt(passwordInput)) {
      this.setState({ passwordErrorMessageStyle: "block" });
    } else {
      passwordCheck = true;
    }

    if (this.state.testing) {
      passwordCheck = true;
      newPasswordCheck = true;
      matchCheck = true;
    }

    if (passwordCheck && newPasswordCheck && matchCheck) {
      this.setState({ profileButtonDivStyle: "block" });
      this.setState({ changePasswordDivStyle: "none" });
      this.setState({ updatedPassword: newPassword });
      const newPasswordencrypt = this.encrypt(newPassword);
      updatePassword(this.props.username, newPasswordencrypt);
      localStorage.setItem("password", newPasswordencrypt);
    }
  }

  handlechangePasswordButton() {
    this.setState({ profileButtonDivStyle: "none" });
    this.setState({ changePasswordDivStyle: "inline" });
  }

  handleResetPasswordGoback() {
    this.setState({ profileButtonDivStyle: "inline" });
    this.setState({ changePasswordDivStyle: "none" });
  }

  // ///////// Change Password Button ///////////////////////////

  // ///////// Change Avatar Button ///////////////////////////
  // eslint-disable-next-line class-methods-use-this
  handlechangeAvatarButton() {
    this.setState({ profileButtonDivStyle: "none" });
    this.setState({ changeAvatorStyle: "inline" });
  }

  // ///////// Change Avatar Button ///////////////////////////

  // ///////// Deactivate Account Button ///////////////////////////

  // eslint-disable-next-line class-methods-use-this
  handledeactivateAccountButton() {
    this.setState({ profileButtonDivStyle: "none" });
    this.setState({ deactivateDivStyle: "inline" });
  }

  handleDeactivateButton() {
    const { updatedPassword, deactivatePassword } = this.state;
    if (updatedPassword === this.encrypt(deactivatePassword)) {
      // we need a fetch function here to delete user in the database
      const ByeMessage = document.createElement("div");
      ByeMessage.innerHTML = "Good Bye!";
      if (document.getElementById("Profile") !== null) {
        document.getElementById("Profile").appendChild(ByeMessage);
      }
      deleteUser(this.props.username);

      localStorage.removeItem("TOKEN_KEY");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("password");
      localStorage.removeItem("date");

      setTimeout(() => {
        window.top.location = "http://localhost:3000/login";
      }, 2000);
    }
  }
  // ///////// Deactivate Account Button ///////////////////////////

  handleInputChange(e) {
    e.preventDefault();
    if (e.target !== null) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleDeactivateGoback() {
    this.setState({ profileButtonDivStyle: "inline" });
    this.setState({ deactivateDivStyle: "none" });
  }

  hanfleImgUpload(e) {
    if (e.target !== null) {
      if (e.target.files.length !== 0) {
        if (e.target.files[0].size > 3800000) {
          // eslint-disable-next-line no-alert
          alert("File is too big!");
          e.target.value = "";
        } else {
          this.setState({ picFile: e.target.files[0] });
          const reader = new FileReader();
          // eslint-disable-next-line func-names
          reader.onload = function () {
            const img = new Image();
            img.src = reader.result;
            console.log(img.src);
            this.setState({ profilePic: img.src });
          }.bind(this);
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    }
  }

  finishAvatorButton() {
    this.setState({ profileButtonDivStyle: "inline" });
    this.setState({ changeAvatorStyle: "none" });
    // Need a fetch to post the state profilePic to dataBase
    if (this.state.picFile !== undefined) {
      addProfilePhoto(this.props.username, this.state.picFile);
    }
  }

  render() {
    const { username, date } = this.props;
    const {
      profileButtonDivStyle,
      changePasswordDivStyle,
      passwordInput,
      passwordErrorMessageStyle,
      newPassword,
      passwordConformation,
      MatchErrorMessageStyle,
      lengthErrorMessageStyle,
      changeAvatorStyle,
      deactivateDivStyle,
      profilePic,
      deactivatePassword,
    } = this.state;
    return (
      <div id="Profile">
        <NavigationBar />
        <div>
          <Avatar id="avatarProfile" src={profilePic} />
        </div>
        <h1>{username}</h1>
        <h3>
          Registration Date:
          {date}
        </h3>
        <div id="profileButtonDiv" style={{ display: profileButtonDivStyle }}>
          <div>
            <Button
              className="profileButton"
              id="changeAvatarButton"
              onClick={this.handlechangeAvatarButton}
            >
              change avatar / profile picture
            </Button>

            <div>
              {" "}
              <Button
                className="profileButton"
                id="changePasswordButton"
                onClick={this.handlechangePasswordButton}
              >
                Change password
              </Button>
            </div>

            <div>
              <Button
                className="profileButton"
                id="deactivateAccountButton"
                onClick={this.handledeactivateAccountButton}
              >
                Deactivate the account
              </Button>
            </div>
          </div>
        </div>
        <div style={{ display: deactivateDivStyle }}>
          <input
            type="password"
            id="loginPassword"
            className="loginEle"
            name="deactivatePassword"
            value={deactivatePassword}
            onChange={this.handleInputChange}
          />
          <button
            type="button"
            id="handleDeactivateButton"
            onClick={this.handleDeactivateButton}
          >
            Deactivate
          </button>
          <button type="submit" onClick={this.handleDeactivateGoback}>
            {" "}
            Go back
          </button>
        </div>
        <div style={{ display: changeAvatorStyle }}>
          <input
            type="file"
            name="attachments[0][uploaded_data]"
            onChange={this.hanfleImgUpload}
            accept="image/png, image/jpeg"
          />
          <button type="button" onClick={this.finishAvatorButton}>
            Finish
          </button>
        </div>
        {/* <div>{changePasswordBlock}</div> */}
        {/* changePassword Block will be hidden at first */}
        <div id="changePasswordDiv" style={{ display: changePasswordDivStyle }}>
          <div>
            <div>
              <span>Orginal Password: </span>

              <input
                id="loginPassword"
                className="loginEle"
                name="passwordInput"
                value={passwordInput}
                onChange={this.handleInputChange}
              />
              <div
                style={{
                  display: passwordErrorMessageStyle,
                  color: "red",
                }}
              >
                Your orginal password is incorrect
              </div>
            </div>

            <div>
              <span>New Password :</span>

              <input
                type="password"
                id="loginPassword"
                className="loginEle"
                name="newPassword"
                value={newPassword}
                onChange={this.handleInputChange}
              />
            </div>

            <div>
              <span>Password Conformation:</span>

              <input
                type="password"
                id="loginPassword"
                className="loginEle"
                name="passwordConformation"
                value={passwordConformation}
                onChange={this.handleInputChange}
              />
            </div>
            <div
              style={{
                display: MatchErrorMessageStyle,
                color: "red",
              }}
            >
              passwords doesn&apos;t Match!
            </div>
            <div
              style={{
                display: lengthErrorMessageStyle,
                color: "red",
              }}
            >
              passwords length should be greater than 5 and should contain at
              least a digit and a character
            </div>

            <Button
              onClick={this.handleSetPassWordSubmit}
              type="button"
              id="loginButton"
              className="loginEle"
              color="primary"
              size="small"
            >
              Reset Password
            </Button>
            <button type="submit" onClick={this.handleResetPasswordGoback}>
              Go back
            </button>
          </div>
        </div>
        <Signal />
      </div>
    );
  }
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default Profile;
