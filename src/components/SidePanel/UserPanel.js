import React from "react";
import { Grid, Header, Icon, Dropdown } from "semantic-ui-react";
import firebase from "../../firebase";

class UserPanel extends React.Component {
  dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>,
    },
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("you are signed out of UsApp!"));
  };

  render() {
    return (
      <Grid style={{ backround: "#A600FF" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2rem", margin: 0 }}>
            {/* app header */}
            <Header inverted floated="left" as="h2">
              <Icon name="cogs" />
              UsApp
            </Header>
          </Grid.Row>
          {/* user dropdown */}
          <Header style={{ padding: "0.25em" }} as="h4">
            <Dropdown
              trigger={<span>User</span>}
              options={this.dropDownOptions()}
            />
          </Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
