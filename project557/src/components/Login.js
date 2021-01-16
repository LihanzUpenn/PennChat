/* eslint-disable */

import Button from "@material-ui/core/Button";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import logo from "../images/messenger.svg";
import { forgotAndReset } from "./getData";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      username2: "",
      password: "",
      securitycode: "",
      newPassword: "",
      passwordConformation: "",
      MatchErrorMessageStyle: "none",
      lengthErrorMessageStyle: "none",
      forgotPasswordDivStyle: "none",
      wrongUsernameorSecurityCodeDivStyle: "none",
      resetSuccessMessageDivStyle: "none",
      // loginAttempt: 0,forgotPasswordDivStyle
      // lockoutTime: undefined,
      // lockoutArray: new Map(),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSetPassWordSubmit = this.handleSetPassWordSubmit.bind(this);
    this.showResetOption = this.showResetOption.bind(this);
    this.hideResetOption = this.hideResetOption.bind(this);
    this.encrypt = this.encrypt.bind(this);
  }

  /* istanbul ignore next */
  // timer() {
  //   setTimeout(() => {
  //     window.top.location = "https://project557.herokuapp.com/homepage";
  //   }, 2000);
  // }
  /* istanbul ignore next */
  async handleSubmit(e) {
    e.preventDefault();
    // ]
    if (this.state.username.length !== 0 && this.state.password.length !== 0) {
      if (document.getElementById("loginErrorMessage") !== null) {
        document
          .getElementById("loginErrorMessage")
          .setAttribute("style", "display: none;");
      }

      // /// lockout/////////////////////////////////////////////////////////
      if (localStorage.getItem(this.state.username) !== null) {
        const arrayTemp = localStorage.getItem(this.state.username).split(" ");
        const loginAttempt = parseInt(arrayTemp[0]);
        const lockoutTime = arrayTemp[1];

        console.log(`loginAttempt = ${loginAttempt}`);
        console.log(`lockoutTime = ${lockoutTime}`);
        if (
          loginAttempt >= 3 &&
          lockoutTime !== "undefined" &&
          (Date.now() - parseInt(lockoutTime)) / 1000 < 30
        ) {
          console.log("lockout in effect!");
          // document.getElementById("loginButton").innerHTML = "Lockout 30sec";
          return;
        }
      }
      document.getElementById("loginButton").innerHTML = "Login";

      // /// lockout/////////////////////////////////////////////////////////

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.state.username,
          password: this.encrypt(this.state.password), // for encryption
          // password: this.state.password,
        }),
      };

      await fetch("http://localhost:8080/login", requestOptions)
        .then((res) => {
          res.json().then((temp) => {
            console.log(temp);
            this.props.handleLogin("token", temp[0].username, temp[0].password);
            const rd = `${
              temp[0].regidate.split("T")[0]
            } ${temp[0].regidate.split("T")[1].substr(0, 8)}`;
            this.props.handleDate(rd);
          });

          if (res.status === 200) {
            const loginMessage = document.createElement("p");
            loginMessage.innerHTML = "Welcome back buddy!";
            loginMessage.setAttribute("id", "loginMessage");
            loginMessage.setAttribute("style", "color: green;");
            const login = document.getElementById("login");
            login.appendChild(loginMessage);

            // /// lockout/////////////////////////////////////////////////////////
            localStorage.setItem(this.state.username, `${0} undefined`);
            // /// lockout/////////////////////////////////////////////////////////
            // this.props.saveUserNameAndPassWord(this.state.username, this.state.password);

            // setTimeout(() => {
            //   window.top.location = "http://localhost:3000/homepage";
            // }, 2000);

            // document.getElementById("loginMessage").remove();
          } else {
            let loginErrorMessage = null;
            if (document.getElementById("loginErrorMessage") === null) {
              loginErrorMessage = document.createElement("p");
              loginErrorMessage.innerHTML =
                "Your username or password is incorrect";
              loginErrorMessage.setAttribute("id", "loginErrorMessage");
              loginErrorMessage.setAttribute("style", "color: red;");
              const login = document.getElementById("login");
              login.appendChild(loginErrorMessage);
            } else {
              document
                .getElementById("loginErrorMessage")
                .setAttribute("style", "display: inline; color: red ");
            }

            /// lockout//////////////////////////////////////////////////////////////////
            let loginAttemptTemp = 1;

            if (localStorage.getItem(this.state.username) === null) {
              localStorage.setItem(this.state.username, `${1} undefined`);
              console.log(`${this.state.username} not in map`);
            } else {
              loginAttemptTemp =
                parseInt(
                  localStorage.getItem(this.state.username).split(" ")[0]
                ) + 1;

              console.log(`A loginAttemptTemp = ${loginAttemptTemp}`);

              if (loginAttemptTemp >= 3) {
                const timeTemp = Date.now();
                // localStorage.setItem(this.state.username, [loginAttemptTemp, timeTemp]);
                localStorage.setItem(
                  this.state.username,
                  `${loginAttemptTemp} ${timeTemp}`
                );

                document.getElementById("loginButton").innerHTML =
                  "Lockout 30sec";
              } else {
                localStorage.setItem(
                  this.state.username,
                  `${loginAttemptTemp} undefined`
                );
              }
            }
            /// lockout//////////////////////////////////////////////////////////////////
          }
        })
        .catch(() => {});
    }
  }

  handleInputChange(e) {
    e.preventDefault();
    // console.log(e.target.value);
    if (e.target !== null) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  handleSetPassWordSubmit() {
    const {
      username2,
      newPassword,
      passwordConformation,
      securitycode,
      forgotPasswordDivStyle,
      wrongUsernameorSecurityCodeDivStyle,

      resetSuccessMessageDivStyle,
    } = this.state;
    this.setState({ wrongUsernameorSecurityCodeDivStyle: "none" });
    let digitFlag = false;
    let charFlag = false;
    let newPasswordCheck = false;
    let matchCheck = false;
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

    if (newPasswordCheck && matchCheck) {
      console.log(securitycode);
      const encryptpassword = this.encrypt(newPassword);
      forgotAndReset(username2, encryptpassword, securitycode).then((res) => {
        if (res === "OK") {
          console.log("200");
          this.setState({ forgotPasswordDivStyle: "none" });
          this.setState({ resetSuccessMessageDivStyle: "inline" });
        } else {
          console.log("xxxxxx");
          this.setState({ wrongUsernameorSecurityCodeDivStyle: "block" });
        }
      });
    }
  }

  // encryption////////////////////////////////////////////////////////////////
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

  showResetOption() {
    this.setState({ forgotPasswordDivStyle: "inline" });
  }

  hideResetOption() {
    this.setState({ forgotPasswordDivStyle: "none" });
  }

  // ////////////////////////////////////////////////////////////////

  render() {
    const {
      username,
      username2,
      password,
      securitycode,
      newPassword,
      passwordConformation,
      MatchErrorMessageStyle,
      lengthErrorMessageStyle,
      forgotPasswordDivStyle,
      wrongUsernameorSecurityCodeDivStyle,
      resetSuccessMessageDivStyle,
    } = this.state;
    return (
      <div>
        <header id="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <span className="AppTitle" id="logox">
            {" "}
            Video & Messaging Web App
          </span>
        </header>
        <div id="RegisterDiv" />
        <div className="loginMain">
          <div className="login" id="login">
            <div>
              <label htmlFor="fname">Username :</label>
              <input
                type="text"
                id="LoginUsername"
                className="loginEle"
                name="username"
                value={username}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="fname">Password :</label>

              <input
                type="password"
                id="loginPassword"
                className="loginEle"
                name="password"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>

            <Button
              onClick={this.handleSubmit}
              type="button"
              id="loginButton"
              className="loginEle"
              color="primary"
              size="large"
            >
              Login In
            </Button>
          </div>
          <div id="JumpLink">
            <span> Or you could </span>
            <Link to="/register" id="loginLink">
              {" "}
              register now!
            </Link>
          </div>
          <Button
            id="reset"
            type="submit"
            color="primary"
            size="small"
            onClick={this.showResetOption}
          >
            {" "}
            Forgot Your Password
          </Button>
          <div
            style={{
              display: resetSuccessMessageDivStyle,
              color: "green",
            }}
          >
            Reset password successfully
          </div>

          <div id="forgotPassword" style={{ display: forgotPasswordDivStyle }}>
            <div>
              <label htmlFor="fname">{`Security Code: `}</label>
              <input
                type="text"
                id="securitycode"
                className="loginEle"
                name="securitycode"
                value={securitycode}
                onChange={this.handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="fname">Username :</label>
              <input
                type="text"
                id="LoginUsername"
                className="loginEle"
                name="username2"
                value={username2}
                onChange={this.handleInputChange}
              />
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
            <br />
            <div
              style={{
                display: lengthErrorMessageStyle,
                color: "red",
              }}
            >
              <p>{`passwords length should > 5`}</p>
              <p>{`passwords should contain at least a digit and character`}</p>
            </div>
            <div
              style={{
                display: wrongUsernameorSecurityCodeDivStyle,
                color: "red",
              }}
            >
              Wrong User Name or Security Code
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
            <br />
            <Button
              type="submit"
              color="primary"
              size="small"
              onClick={this.hideResetOption}
            >
              Go back
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
import { format } from "prettier";

Login.propTypes = {
  // saveUserNameAndPassWord: PropTypes.func.isRequired,
  // saveRegidate: PropTypes.func.isRequired,
};

export default Login;
