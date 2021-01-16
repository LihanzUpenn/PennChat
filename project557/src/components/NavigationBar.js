/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-wrap-multilines */
import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { disconnect, deleteAllNotification } from "./getData";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // eslint-disable-next-line class-methods-use-this
  handleLogout() {
    disconnect(localStorage.getItem("currentUser"));
    deleteAllNotification(localStorage.getItem("currentUser"));
    
    localStorage.removeItem("TOKEN_KEY");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("password");
    localStorage.removeItem("date");
   

    setTimeout(() => {
      window.top.location = "http://localhost:3000/login";
    }, 1000);
  }

  render() {
    return (
      <div className="n\NavigationBar">
        <CssBaseline />
        <Drawer className="drawer" variant="permanent" anchor="left">
          <Divider />
          <List>
            <ListItem button key="People">
              <ListItemText primary={<Link to="/homepage">People</Link>} />
            </ListItem>
          </List>
          <List>
            <ListItem button key="Story">
              <ListItemText primary={<Link to="/story">Story</Link>} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="Profile">
              <ListItemText primary={<Link to="/profile">Profile</Link>} />
            </ListItem>
            <ListItem button key="Logout">
              <button type="submit" onClick={this.handleLogout}>
                Logout
              </button>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }
}

export default NavigationBar;
