/* eslint-disable  */

import React, { Component } from "react";
import AnnouncementIcon from "@material-ui/icons/Announcement";

import { checkNotifaciton, deleteNotifaction } from "./getData";

class Signal extends Component {
  constructor(props) {
    super(props);
    const set = new Set();
    this.state = {
      notifiactionArray: [],
      notifiaction: "",
      notifactionSet: set,
    };
  }
  handleDelete(num) {
    let array = this.state.notifiactionArray;
    if (array.length == 1) {
      deleteNotifaction(num);
      array = [];
    } else {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i] !== null && array[i].mid === num) {
          array.splice(i, 1);
          deleteNotifaction(num);
        }
      }
    }
    this.setState({ notifiactionArray: array });
  }

  componentDidMount() {
    setInterval(() => {
      checkNotifaciton(localStorage.getItem("currentUser")).then((res) => {
        const array = this.state.notifiactionArray;
        if (res) {
          res.map((obj) => {
            if (!this.state.notifactionSet.has(obj.mid)) {
              array.push(obj);
            }
          });
          //  console.log(array);
          const notifiactionTemp = array.map((obj) => {
            const adjustTime = new Date(
              JSON.parse(JSON.stringify(obj.message_time))
            );
            adjustTime.setHours(adjustTime.getHours() - 5);
            const setTemp = this.state.notifactionSet;
            setTemp.add(obj.mid);
            this.setState({ notifactionSet: setTemp });
            return (
              <div className="notifactionElement">
                <AnnouncementIcon />
                <div className="notifactionMsg">
                  {`a new ${obj.message_type} from ${obj.from_host} ${adjustTime}`}
                </div>
                <button
                  className="notificationbtn"
                  onClick={() => this.handleDelete(obj.mid)}
                >
                  {" "}
                  x{" "}
                </button>
              </div>
            );
          });
          this.setState({ notifiactionArray: array });
          this.setState({ notifiaction: notifiactionTemp });
        }
      });
    }, 3000);
  }

  render() {
    return (
      <div>
        <h5>
          <span>Notification</span>
        </h5>
        <div id="notifaction">{this.state.notifiaction}</div>
      </div>
    );
  }
}

export default Signal;
