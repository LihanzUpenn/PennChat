/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import {getProfilePic} from './getData';

class Post extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      profilePic : "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg"
    };
  }

  componentDidMount(){
    const {name} = this.props;
    getProfilePic(name).then((res) => {
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
    const { name, textCotent, imgContent, postTime, viewStatus } = this.props;
    const {profilePic}= this.state;
    let username = `${name}:`;
    if(textCotent === ""){
      username = ""
    }
    return (
      <div className="Post">
        <div id="PostTag">
          <Avatar
            id="postAvatar"
            className="friendavatar"
            src={`${profilePic}`}
          />
          <div id="postName">{name}</div> 
        </div>
       
        <div>
          <img width="300" height="200" src={`${imgContent}`} alt="" />
        </div>
        <div>{`${postTime}`}</div>
        <br />
        <div id="postMsg">
          <div id="postName">{username}</div> 
          <div id="postTextCotent">{textCotent}</div>
        </div>
        <div>
          <span style={{ color: "red" }}>{`${viewStatus}`}</span>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  name: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  textCotent: PropTypes.string.isRequired,
  imgContent: PropTypes.string.isRequired,
  postTime: PropTypes.string.isRequired,
  viewStatus: PropTypes.string.isRequired,
};

export default Post;
