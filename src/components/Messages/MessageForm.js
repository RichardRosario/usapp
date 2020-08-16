import React from "react";
import { Segment, Button, Input } from "semantic-ui-react";

class MessageForm extends React.Component {
  render() {
    return (
      <Segment clearing>
        {/* Channel Search Input */}

        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="search messages"
        />
        <Button.Group>
          <Button
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
