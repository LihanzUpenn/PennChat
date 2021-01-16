/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import chat from "../images/chat.png";
import {getProfilePic,adduserPair,updateLastChatTime} from './getData';

class Contacts extends Component {
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
      // eslint-disable-next-line react/destructuring-assignment
      this.props.mapFunction(name, urlTemp);
     }else{
       console.log("No User Profile Picture");
       this.props.mapFunction(name, "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg");
     }
    }
      ).catch(() => { });
  }

  // async componentDidUpdate(){
  //   const {name} = this.props;
  //   // eslint-disable-next-line react/destructuring-assignment
  //   const picTemp = this.state.profilePic;
    
  //   await getProfilePic(name).then((res) => {
  //     // console.log(res[0].Picture);
  //    if(res[0].Picture != null){
  //     const content = JSON.parse(res[0].Picture);
  //     const urlTemp = URL.createObjectURL(new Blob([Buffer.from(content.buffer)]));

  //     if(picTemp !== urlTemp){
  //     this.setState({profilePic:urlTemp});
  //     }
  //    }else{
  //      console.log("No User Profile Picture");
  //    }
  //   }
  //     ).catch(() => { });
  // }


   componentDidUpdate(){
     if(this.props.url !== undefined){
    // const {name} = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const picTemp = this.state.profilePic;
  
      if(picTemp !== this.props.url){
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({profilePic:this.props.url});
      
    }
  }
  }

  render() {
    const { messageSomeone, deleteFriend , name} = this.props;
    const { profilePic } = this.state;
    return (
      <div className="contactBox">
        <Avatar
          className="friendavatar"
          src={`${profilePic}`}
        />
        <button 
          id={name}
          className="messageButton"
          type="submit"
          onClick={() => {
            adduserPair(localStorage.getItem("currentUser"), name);
            messageSomeone(name,profilePic );
            updateLastChatTime(localStorage.getItem("currentUser"), name);
          }}
        >
          <img id="messageImage" src={chat} alt="message" />
        </button>
        <button
          type="button"
          className="deleteFriend"
          onClick={() => deleteFriend(name)}
        >
          {" "}
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-person-x-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6.146-2.854a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
        <div className="contacts" id={name}>
          {name}
        </div>
      </div>
    );
  }
}

Contacts.propTypes = {
  name: PropTypes.string.isRequired,
  messageSomeone: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
};

export default Contacts;