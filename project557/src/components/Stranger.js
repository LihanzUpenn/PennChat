/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { getProfilePic } from "./getData";

class Stangers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profilePic:
        "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg",
    };
  }

  componentDidMount() {
    const { name } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    getProfilePic(name)
      .then((res) => {
        // console.log(res[0].Picture);
        if (res[0].Picture != null) {
          const content = JSON.parse(res[0].Picture);
          const urlTemp = URL.createObjectURL(
            new Blob([Buffer.from(content.buffer)])
          );
          this.setState({ profilePic: urlTemp });
          this.props.mapStrangerFunction(name, urlTemp);
        } else {
          console.log("No User Profile Picture");
          this.props.mapStrangerFunction(
            name,
            "https://img.favpng.com/6/14/19/computer-icons-user-profile-icon-design-png-favpng-vcvaCZNwnpxfkKNYzX3fYz7h2.jpg"
          );
        }
      })
      .catch(() => {});
  }

  // async componentDidUpdate(){
  //   const {name} = this.props;

  //   // eslint-disable-next-line react/destructuring-assignment
  //   const picTemp = this.state.profilePic;
  //   await getProfilePic(name).then((res) => {
  //    if(res[0].Picture != null){
  //     const content = JSON.parse(res[0].Picture);
  //     const urlTemp = URL.createObjectURL(new Blob([Buffer.from(content.buffer)]));
  //     if(picTemp !== urlTemp){
  //     this.setState({profilePic:urlTemp});
  //     }
  //    }else{
  //      console.log("Fial to get Profile photo");
  //    }
  //   }
  //     ).catch(() => { });
  // }

  componentDidUpdate() {
    if (this.props.url !== undefined) {
      // const {name} = this.props;
      // eslint-disable-next-line react/destructuring-assignment
      const picTemp = this.state.profilePic;

      if (picTemp !== this.props.url) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ profilePic: this.props.url });
      }
    }
  }

  render() {
    const { AddStangers, name } = this.props;
    const { profilePic } = this.state;
    return (
      <div className="contactBox">
        <Avatar className="stangerAvater" src={`${profilePic}`} />
        <button
          className="addFriend"
          type="submit"
          onClick={() => {
            AddStangers(name);
          }}
        >
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-person-plus-fill"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </button>
        <div className="strangers" id={name}>
          {name}
        </div>
      </div>
    );
  }
}

Stangers.propTypes = {
  name: PropTypes.string.isRequired,
  AddStangers: PropTypes.func.isRequired,
};

export default Stangers;
