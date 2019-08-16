import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navigation(props) {
  const linkStyle={
    textDecoration: 'none',
    color: 'grey',
    padding: '0.5rem'

  }
  return (
    <Navbar collapseOnSelect bg="dark" variant="dark">
      <Navbar.Brand>I.C.I.G.M</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link style={linkStyle} to="/">Home</Link>
          <Link style={linkStyle} to="/myTrusties">Trusties</Link>
          <Link style={linkStyle} to="/myEntrusties">Entrusties</Link>
          <Link style={linkStyle} to="/myInfo">My Info</Link>
        </Nav>
        <Nav>
          {props.appState.isAuth ? (
            <Link style={linkStyle} onClick={() => {
              props.updateUser(null, false)
              window.localStorage.removeItem('user')
            }} to="/login">
              Logout
            </Link>
          ) : (
            <Link style={linkStyle} to="/login">Login</Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
