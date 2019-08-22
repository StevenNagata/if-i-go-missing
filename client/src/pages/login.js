import React from "react";
import { Form, Card, Button } from "react-bootstrap";

class Login extends React.Component {
  login = (user, password) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user,
        password: password
      })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.statusCode === 200) {
          this.props.updateUser(data.user, true);
          window.localStorage.setItem('user', JSON.stringify(data.user))
          this.props.history.push('/mytrusties')
        } else if (data.statusCode === 300) {
          window.alert(data.message)
        }
      });
  };
  render() {
    return (
      <Card style={{ margin: "10% auto", width: "20rem", padding: "1rem" }}>
        <Form
          onSubmit={event => {
            event.preventDefault();
            this.login(event.target.email.value, event.target.password.value);
          }}
        >
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <hr />
          <Button variant="dark" type="submit" block>
            Sign In
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Login;
