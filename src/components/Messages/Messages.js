import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Messagesheader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import Message from "./Message";
import firebase from "../../firebase";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),
    messages: [],
    messageLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
  };

  componentDidMount() {
    const { channel, user } = this.state;

    if (channel && user) {
      this.addListeners(channel.id);
    }
  }

  addListeners = (channelId) => {
    this.addMessageListener(channelId);
    // this.displayMessageListener();
  };

  addMessageListener = (channelId) => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", (snap) => {
      loadedMessages.push(snap.val());
      this.setState({
        messages: loadedMessages,
        messageLoading: false,
      });
    });
  };

  displayMessages = (messages) =>
    messages.length > 0 &&
    messages.map((message) => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ));

  render() {
    const { messagesRef, messages, channel, user } = this.state;
    return (
      <React.Fragment>
        <Messagesheader />

        <Segment>
          <Comment.Group className="messages">
            {this.displayMessages(messages)}
          </Comment.Group>
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
