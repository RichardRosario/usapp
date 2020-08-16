import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Messagesheader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from "../../firebase";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    channel: this.props.currentChannel,
    user: this.props.currentUser,
  };
  render() {
    const { messagesRef, channel, user } = this.state;
    return (
      <React.Fragment>
        <Messagesheader />

        <Segment>
          <Comment.Group className="messages">{/*  */}</Comment.Group>
        </Segment>
        <MessageForm
          currentUser={user}
          messagesRef={messagesRef}
          currentChannel={channel}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
