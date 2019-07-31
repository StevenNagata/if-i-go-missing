import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">In Case I Go Missing</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/myTrusties">Trusties</Nav.Link>
          <Nav.Link href="/myAccount">Account</Nav.Link>
        </Nav>
      </Navbar>
    )
  }
}

export default Navigation;