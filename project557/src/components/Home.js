/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import Contacts from "./Contacts";
import TopBanner from "./TopBanner";
import Chat from "./Chat";
import Strangers from "./Stranger";
import {
  getMessage,
  getFriends,
  getStrangers,
  deleteFriend,
  addFriend,
  postNotifaciton,
  updateAllmessagetoRead,
} from "./getData";
import Videocall from "./Videocall";
import Signal from "./Signal";

class Home extends Component {
  constructor(props) {
    super(props);

    const map1 = new Map(); // for contacts
    const map2 = new Map(); // for strangers
    this.state = {
      contacters: [],
      strangers: [],
      // searchTemp: "",
      search: "",
      searchStranger: "",
      chat: [],
      videoCall: [],
      friend: [],
      map: map1,
      mapStranger: map2,
    };
    this.MessageSomeone = this.MessageSomeone.bind(this);
    this.handleInputonChange = this.handleInputonChange.bind(this);
    this.handleInputonChangeStranger = this.handleInputonChangeStranger.bind(
      this
    );
    this.AddStangers = this.AddStangers.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.displayVideo = this.displayVideo.bind(this);
    this.endDisplayVideo = this.endDisplayVideo.bind(this);
    this.mapFunction = this.mapFunction.bind(this);
    this.mapStrangerFunction = this.mapStrangerFunction.bind(this);
  }

  componentDidMount() {
    const logo = document.getElementById("logox");
    if (logo !== null) {
      logo.setAttribute("style", "margin-left: 100px");
    }
    // const arrayOfContacts = fetchFunction();
    // const nameAndPassword = localStorage.getItem('TOKEN_KEY').split(",");
    // console.log(`Curr user ${localStorage.getItem("currentUser")}`);
    // console.log(`Curr Password ${localStorage.getItem("password")}`);

    const arrayOfContacts = [];
    const arrayOfStranges = [];

    getFriends(localStorage.getItem("currentUser"))
      .then((response) => {
        for (let i = 0; i < response.length; i += 1) {
          arrayOfContacts.push(response[i].friend);
        }
        this.setState({ contacters: arrayOfContacts });

        getStrangers(localStorage.getItem("currentUser"))
          .then((response2) => {
            for (let i = 0; i < response2.length; i += 1) {
              if (!arrayOfContacts.includes(response2[i].username)) {
                arrayOfStranges.push(response2[i].username);
              }
            }
            this.setState({ strangers: arrayOfStranges });
          })
          .catch(() => {});
      })
      .catch(() => {});
  }

  handleInputonChange(e) {
    e.preventDefault();
    if (e.target !== null) {
      this.setState({ search: e.target.value });
    }
    const { search } = this.state;
    console.log(search);
  }

  // handleFriendSearchOK(){
  //   const {searchTemp} = this.state;
  //   this.setState({ search: searchTemp });
  // }

  handleInputonChangeStranger(e) {
    e.preventDefault();
    if (e.target !== null) {
      this.setState({ searchStranger: e.target.value });
    }
    const { searchStranger } = this.state;
    console.log(searchStranger);
  }

  // eslint-disable-next-line class-methods-use-this

  MessageSomeone(friendname, profilePic) {
    this.setState({ friend: friendname });
    if (document.getElementById("showimgArea") !== null) {
      document.getElementById("showimgArea").setAttribute("src", "");
    }
    this.setState({ chat: "" });
    console.log(this.arrayOfContacts);
    console.log("sending Message to someone");
    console.log(`Talk to ${friendname}`);
    console.log(`Curr user ${this.props.username}`);
    const time = new Date();

    updateAllmessagetoRead(localStorage.getItem("currentUser"), friendname);

    // ////////////////////////////////////////////////

    getMessage(localStorage.getItem("currentUser"), friendname)
      .then((response) => {
        const previousMessages = [];

        const messagesTemp = [];
        const imgTemp = [];
        const voiceTemp = [];
        const videoTemp = [];

        response.map((obj) => {
          if (obj.message_type === "text") {
            messagesTemp.push(obj);
          } else if (obj.message_type === "image") {
            const temp = JSON.parse(obj.message_content);
            imgTemp.push(temp);

            const mc = JSON.parse(obj.message_content);
            const urlTemp = URL.createObjectURL(
              new Blob([Buffer.from(mc.buffer)])
            );
            // eslint-disable-next-line no-param-reassign
            obj.message_content = urlTemp;
          } else if (obj.message_type === "video") {
            const temp = JSON.parse(obj.message_content);
            videoTemp.push(temp);

            const mc = JSON.parse(obj.message_content);
            const urlTemp = URL.createObjectURL(
              new Blob([Buffer.from(mc.buffer)])
            );
            // eslint-disable-next-line no-param-reassign
            obj.message_content = urlTemp;
          } else if (obj.message_type === "audio") {
            const temp = JSON.parse(obj.message_content);
            voiceTemp.push(temp);

            const mc = JSON.parse(obj.message_content);
            const urlTemp = URL.createObjectURL(
              new Blob([Buffer.from(mc.buffer)])
            );
            // eslint-disable-next-line no-param-reassign
            obj.message_content = urlTemp;
          }
          // obj.message_content = urlTemp;
          previousMessages.push(obj);
          return "";
        });

        const ChatComponent = (
          <Chat
            from={localStorage.getItem("currentUser")}
            to={friendname}
            currentMessage={[]}
            time={time}
            // eslint-disable-next-line react/no-access-state-in-setstate
            previousMessages={previousMessages}
            displayVideo={this.displayVideo}
            currentPair={" "}
            friendPhoto={profilePic}
          />
        );
        this.setState({ chat: ChatComponent });
      })
      .catch(() => {});
  }

  async deleteFriend(name) {
    const { contacters, strangers } = this.state;
    const filteredStangers = strangers;
    filteredStangers.push(name);
    const filteredcontacters = contacters.filter((friend) => {
      if (friend !== name) {
        return friend;
      }
      return "";
    });
    this.setState({ contacters: filteredcontacters });
    this.setState({ strangers: filteredStangers });

    await deleteFriend(localStorage.getItem("currentUser"), name);
  }

  async AddStangers(name) {
    const { contacters, strangers } = this.state;
    const filteredcontacters = contacters;
    filteredcontacters.push(name);
    //  console.log(filteredcontacters);
    const filteredStangers = strangers.filter((friend) => {
      if (friend !== name) {
        return friend;
      }
      return "";
    });
    this.setState({ contacters: filteredcontacters });
    this.setState({ strangers: filteredStangers });

    await addFriend(localStorage.getItem("currentUser"), name);
  }

  displayVideo() {
    const videoCallDiv = (
      <Videocall
        username={localStorage.getItem("currentUser")}
        endDisplayVideo={this.endDisplayVideo}
        // eslint-disable-next-line react/no-access-state-in-setstate
        friend={this.state.friend}
      />
    );
    this.setState({ videoCall: videoCallDiv });
    if (document.getElementById("addingContacts") !== null) {
      document.getElementById("addingContacts").style.display = "none";
    }

    const sqlDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    postNotifaciton(
      localStorage.getItem("currentUser"),
      this.state.friend,
      "video call",
      sqlDate
    );
  }

  endDisplayVideo() {
    this.setState({ videoCall: [] });
    if (document.getElementById("addingContacts") !== null) {
      document.getElementById("addingContacts").style.display = "block";
    }
  }

  mapFunction(name, url) {
    // console.log(name);
    // console.log(url);
    // eslint-disable-next-line react/no-access-state-in-setstate
    const mapTemp = this.state.map;
    mapTemp[name] = url;
    // console.log("xx");
    // console.log(mapTemp);
    this.setState({ map: mapTemp });
  }

  mapStrangerFunction(name, url) {
    // console.log(name);
    // console.log(url);
    // eslint-disable-next-line react/no-access-state-in-setstate
    const mapTemp = this.state.mapStranger;
    mapTemp[name] = url;
    // console.log("xx");
    // console.log(mapTemp);
    this.setState({ mapStranger: mapTemp });
  }

  renderPeople(stranger) {
    const url = this.state.mapStranger[`${stranger}`];
    // console.log(url);
    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <Strangers
          name={stranger}
          AddStangers={this.AddStangers}
          mapStrangerFunction={this.mapStrangerFunction}
          url={url}
        />
      </div>
    );
  }

  renderFriend(friend) {
    // eslint-disable-next-line dot-notation
    const url = this.state.map[`${friend}`];
    return (
      <div className="col-md-3" style={{ marginTop: "20px" }}>
        <Contacts
          name={friend}
          messageSomeone={this.MessageSomeone}
          deleteFriend={this.deleteFriend}
          mapFunction={this.mapFunction}
          url={url}
        />
      </div>
    );
  }

  render() {
    const {
      search,
      contacters,
      searchStranger,
      strangers,
      videoCall,
    } = this.state;
    const filteredarrayOfContacts = contacters.filter((friend) => {
      return friend.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });

    const filteredarrayOfAddPeople = strangers.filter((stranger) => {
      return (
        stranger.toLowerCase().indexOf(searchStranger.toLowerCase()) !== -1
      );
    });

    return (
      <div>
        <TopBanner username={localStorage.getItem("currentUser")} />
        <NavigationBar />

        <div id="homeMainSection">
          <div id="page">
            <div id="videoCall">{videoCall}</div>
            <div id="addingContacts">
              <div id="searchBox">
                <span id="searchLabel">Search</span>
                <input
                  label="Search Friend"
                  icon="search"
                  onChange={this.handleInputonChange}
                />
                {/* <button type="submit" onClick={this.handleFriendSearchOK}>ok</button> */}
              </div>
              <div id="listOfContacts">
                {filteredarrayOfContacts.map((friend) => {
                  return this.renderFriend(friend);
                })}
              </div>
              <div id="AddContact">
                <div id="searchBoxStranger">
                  <span id="searchLabel">Explore New People</span>
                  <input
                    label="Add Strangers"
                    icon="search"
                    onChange={this.handleInputonChangeStranger}
                  />
                </div>
                <div id="PeopleToAdd">
                  {filteredarrayOfAddPeople.map((stranger) => {
                    return this.renderPeople(stranger);
                  })}
                </div>
              </div>
            </div>
          </div>
          <div id="chatBox">{this.state.chat}</div>
        </div>
        <Signal />
      </div>
    );
  }
}

export default Home;
