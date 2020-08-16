import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Messagesheader from "./MessagesHeader";
import MessageForm from "./MessageForm";

class Messages extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Messagesheader />

        <Segment>
          <Comment.Group className="messages">{/*  */}</Comment.Group>
        </Segment>
        <MessageForm />
      </React.Fragment>
    );
  }
}

export default Messages;
