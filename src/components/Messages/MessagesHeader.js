import React from "react";
import { Segment, Header, Icon, Input } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    return (
      <Segment clearing>
        {/* channel title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            Channel
            <Icon name="star outline" color="black" />
          </span>
          <Header.Subheader>2 Users</Header.Subheader>
        </Header>
        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            size="mini"
            icon="search"
            name="searchTerm"
            placeholder="search messages"
          />
        </Header>
      </Segment>
    );
  }
}

export default MessagesHeader;