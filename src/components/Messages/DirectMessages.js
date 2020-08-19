import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import firebase from "../../firebase";

class DirectMessages extends React.Component {
  state = {
    user: this.props.currentUser,
    users: [],
    usersRef: firebase.database().ref("users"),
    presenceRef: firebase.database().ref("presence"),
    connectedRef: "",
  };

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  }

  addListeners = (currentUserUid) => {
    let loadedUsers = [];
    this.state.usersRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user["uid"] = snap.key;
        loadedUsers.push(user);
        this.setState({ users: loadedUsers });
      }
    });
    this.state.connectedRef.on("value", (snap) => {
      if (snap.val() === true) {
        const ref = this.state.presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove((err) => {
          if (err !== null) {
            console.error(err);
          }
        });
      }
    });
    this.state.presenceRef.on("child_added", (snap) => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUsers(snap.key);
      }
    });
    this.state.presenceRef.on("child_removed", (snap) => {
      if (currentUserUid !== snap.key) {
        this.addStatusToUsers(snap.key, false);
      }
    });
  };

  addStatusToUsers = (userId, connected = true) => {
    const updatedUsers = this.state.users.reduce((acc, user) => {
      if (user.uid === userId) {
        user["status"] = `${connected ? "online" : "offline"}`;
      }
      return acc.concat(user);
    }, []);
    this.setState({ users: updatedUsers });
  };

  render() {
    const { users } = this.state;

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> DIRECT MESSAGES
          </span>
          {users.length}
        </Menu.Item>

        {users.map((user) => (
          <Menu.Item></Menu.Item>
        ))}
      </Menu.Menu>
    );
  }
}

export default DirectMessages;