import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";

class SidePanel extends React.Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#a600ff", fontSize: "1.2em" }}
      >
        <UserPanel />
      </Menu>
    );
  }
}

export default SidePanel;