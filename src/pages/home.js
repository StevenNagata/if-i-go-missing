import React from "react";
import { Container, Col, Form, ListGroup, Button } from "react-bootstrap";
import { createFormComponent } from "../components/formComponent";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAccount: true,
      accounts: [
        {
          account: "Wells Fargo",
          username: "nagata.steven1@gmail.com",
          password: "password123!",
          hiddenPassword: true,
          link: "https://connect.secure.wellsfargo.com/auth/login/present"
        },
        {
          account: "Facebook",
          username: "nagata.steven1@gmail.com",
          password: "helloWorld#5",
          hiddenPassword: true,
          link: "https://www.facebook.com/"
        }
      ]
    };
  }
  addAccount = event => {
    event.preventDefault();
    const target = event.target;
    const copyOfAccounts = this.state.accounts.map(account =>
      Object.assign({}, account)
    );
    copyOfAccounts.push({
      account: target.account.value,
      username: target.username.value,
      password: target.password.value,
      hiddenPassword: true,
      link: target.link.value
    });
    this.setState({
      accounts: copyOfAccounts
    });
    event.target.reset();
  };
  showPassword = i => {
    const copyOfAccounts = this.state.accounts.map((account, index) => {
      if (i === index) {
        return Object.assign({}, account, {
          hiddenPassword: !account.hiddenPassword
        });
      } else {
        return Object.assign({}, account);
      }
    });
    this.setState({ accounts: copyOfAccounts });
  };
  render() {
    return (
      <div>
        <Container style={{ padding: '0', display: this.state.addAccount ? "" : "none" }}>
          <h2 style={{ textAlign: "center", padding: "1rem" }}>My Info</h2>
          <Col xs={12}>
            <ListGroup>
              {this.state.accounts.map((account, index) => {
                return (
                  <ListGroup.Item key={account.account}>
                    <div>
                      <a
                        href={account.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {account.account}
                      </a>
                    </div>
                    <div style={{ padding: "2%" }}>
                      <div>Username: {account.username}</div>
                      <div style={{ position: "relative" }}>
                        Password:{" "}
                        {account.hiddenPassword
                          ? "*********"
                          : account.password}
                        <i
                          onClick={() => this.showPassword(index)}
                          style={{
                            paddingLeft: "0.5rem",
                            position: "absolute"
                          }}
                          className="material-icons"
                        >
                          remove_red_eye
                        </i>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
              <ListGroup.Item>
                <h3> Add a New Account</h3>
                <Form style={{ padding: "5%" }} onSubmit={this.addAccount}>
                  {createFormComponent(
                    "account",
                    "Account",
                    "ex. Facebook, Wells Fargo, AppleID ..."
                  )}
                  {createFormComponent(
                    "username",
                    "Username",
                    "Enter your login username"
                  )}
                  {createFormComponent(
                    "password",
                    "Password",
                    "Enter password"
                  )}
                  {createFormComponent(
                    "link",
                    "Website Link",
                    "ex. https://www.facebook.com/"
                  )}
                  <Button style={{ float: "right" }} type="submit">
                    Add
                  </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Home;
