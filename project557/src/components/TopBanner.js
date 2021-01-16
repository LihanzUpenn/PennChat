import { Avatar } from "@material-ui/core";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../images/messenger.svg";
import {getProfilePic} from './getData';

class TopBanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePic : "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg"
    };
  }

  componentDidMount(){
    const {username} = this.props;
    getProfilePic(username).then((res) => {
      // console.log(res[0].Picture);
     if(res[0].Picture != null){
      const content = JSON.parse(res[0].Picture);
      const urlTemp = URL.createObjectURL(new Blob([Buffer.from(content.buffer)]));
      this.setState({profilePic:urlTemp});
     }else{
       console.log("No User Profile Picture");
     }
    }
      ).catch(() => { });
  }

  render() {
    const {profilePic} = this.state;
    return (
      <header id="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="AppTitle" id="logox">
          {" "}
          Video & Messaging Web App
        </span>
        <Link to="/profile" id="loginLink">
          <Avatar
            id="avatar"
            src={`${profilePic}`}
          />
        </Link>
      </header>
    );
  }
}

export default TopBanner;

TopBanner.propTypes = {
  username: PropTypes.string.isRequired,
  
};