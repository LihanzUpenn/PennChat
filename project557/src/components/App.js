/* eslint-disable react/destructuring-assignment */
import React from "react";
import "../style/App.css";
import Main from "./Main";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loginStatus: Boolean(localStorage.getItem("TOKEN_KEY")),
      username: "",
      password: "",
      registdate: "",
    };
    this.handleLogink = this.handleLogink.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleLogink(token1, username1, password1) {
    localStorage.setItem("TOKEN_KEY", token1);
    localStorage.setItem("currentUser", username1);
    localStorage.setItem("password", password1);
    // localStorage.setItem("TOKEN_KEY2", token1);
    this.setState({ loginStatus: true });
    this.setState({ username: username1 });
    this.setState({ password: password1 });
  }

  handleDate(date) {
    localStorage.setItem("date", date);
    this.setState({ registdate: date });
  }

  render() {
    return (
      <div className="App">
        <Main
          loginStatus={this.state.loginStatus}
          handleLogin={this.handleLogink}
          handleDate={this.handleDate}
          username={this.state.username}
          password={this.state.password}
          registdate={this.state.registdate}
        />
      </div>
    );
  }
}
