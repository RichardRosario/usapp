import React from "react";
import { Segment, Header, Icon, Input } from "semantic-ui-react";

class MessagesHeader extends React.Component {
  render() {
    const {
      channelName,
      numUniqueUsers,
      handleSearchChange,
      searchLoading,
    } = this.props;
    return (
      <Segment clearing>
        {/* channel title */}
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
          <span>
            {channelName}
            <Icon name="star outline" color="black" />
          </span>
          <Header.Subheader as="span">
            Online users: {numUniqueUsers}
          </Header.Subheader>
        </Header>
        {/* Channel Search Input */}
        <Header floated="right">
          <Input
            loading={searchLoading}
            onChange={handleSearchChange}
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
