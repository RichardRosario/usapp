import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";
import firebase from "../../firebase";

class MessageForm extends React.Component {
  state = {
    message: "",
    channel: this.props.currentChannel,
    loading: false,
    user: this.props.currentUser,
    errors: [],
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createMessage = () => {
    const message = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      user: {
        id: this.state.user.uid,
        name: this.state.user.displayName,
        avatar: this.state.user.photoURL,
      },
      content: this.state.message,
    };
    return message;
  };

  sendMessage = () => {
    const { messagesRef } = this.props;
    const { message, channel } = this.state;
    if (message) {
      this.setState({ loading: true });
      messagesRef
        .child(channel.id)
        .push()
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" }),
      });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <Segment clearing>
        {/* Channel Search Input */}

        <Input
          fluid
          onChange={this.handleChange}
          size="mini"
          style={{ marginBottom: "0.7em" }}
          name="message"
          placeholder="write your messages"
          labelPosition="left"
          label={<Button icon="add" />}
          className={
            errors.some((error) => error.message.includes("message"))
              ? "error"
              : ""
          }
        />
        <Button.Group>
          <Button
            onClick={this.sendMessage}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

export default MessageForm;
