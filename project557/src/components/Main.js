/* eslint-disable*/
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import Story from "./Story";
import ProfileOther from "./ProfileOther";
// import Videocall from "./Videocall";
import { disconnect, deleteAllNotification } from "./getData";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // this.saveUserNameAndPassWordK = this.saveUserNameAndPassWordK.bind(this);
    // this.saveRegidate = this.saveRegidate.bind(this);
    this.getLogin = this.getLogin.bind(this);
    this.getHome = this.getHome.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getStory = this.getStory.bind(this);
  }
  componentDidMount() {
    setInterval(() => {
      // console.log(window.top.location.href);
      if (window.top.location.href !== "http://localhost:3000/homepage") {
        if (localStorage.getItem("currentUser") !== null) {
          disconnect(localStorage.getItem("currentUser"));
        }
      }
    }, 5000);
    window.addEventListener("beforeunload", function () {
      disconnect(localStorage.getItem("currentUser"));
      deleteAllNotification(localStorage.getItem("currentUser"));
    });
  }

  getHome() {
    if (this.props.loginStatus) {
      return (
        <Home
          username={localStorage.getItem("currentUser")}
          password={localStorage.getItem("password")}
        />
      );
    } else {
      return <Redirect to="/login" />;
    }
  }

  getLogin() {
    console.log(this.props.loginStatus);
    if (this.props.loginStatus) {
      return <Redirect to="/homepage" />;
    } else {
      return (
        <Login
          handleLogin={this.props.handleLogin}
          handleDate={this.props.handleDate}
        />
      );
    }
  }
  getProfile() {
    if (Boolean(localStorage.getItem("TOKEN_KEY"))) {
      return (
        <Profile
          username={localStorage.getItem("currentUser")}
          password={localStorage.getItem("password")}
          date={localStorage.getItem("date")}
        />
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
  getStory() {
    if (Boolean(localStorage.getItem("TOKEN_KEY"))) {
      console.log(this.props.username);
      return <Story username={localStorage.getItem("currentUser")} />;
    } else {
      return <Redirect to="/login" />;
    }
  }

  render() {
    // Mocking //////////////
    // user = "Jack";
    // Password = "12345";
    // regidate = "11.1.2020";

    /// ///// Mocking /////////////////

    return (
      <div className="main">
        <Switch>
          <Route path="/login" component={this.getLogin} />
          <Route path="/register" component={Register} />
          <Route path="/homepage" component={this.getHome} />
          <Route path="/profile" component={this.getProfile} />
          <Route path="/story" component={this.getStory} />
          <Route path="/ProfileOther" component={ProfileOther} />
          {/* <Route
            path="/videocall"
            render={() => (
              <Videocall username={localStorage.getItem("currentUser")} />
            )}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default Main;
