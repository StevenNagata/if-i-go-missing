import React from "react";
import { Container, Col, Form, ListGroup, Button } from "react-bootstrap";
import { CreateFormComponent } from "../components/formComponent";

class MyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addAccount: true,
      editNum: null,
      accounts: this.props.accounts
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ accounts: nextProps.accounts });  
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
    this.props.updateUserAccounts(copyOfAccounts)
    event.target.reset();
  };
  editAccount = event => {
    event.preventDefault();
    const target = event.target;
    const copyOfAccounts = this.state.accounts.map((account, index) => {
      if (target.index.value === index.toString()) {
        return {
          account: target.account.value,
          username: target.username.value,
          password: target.password.value,
          hiddenPassword: true,
          link: target.link.value
        };
      } else {
        return Object.assign({}, account);
      }
    });
    this.props.updateUserAccounts(copyOfAccounts)
    this.setState({ editNum: null });
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
        <Container
          style={{
            paddingBottom: "2rem",
            display: this.state.addAccount ? "" : "none"
          }}
        >
          <h2 style={{ textAlign: "center", padding: "1rem" }}>My Info</h2>
          <Col xs={12}>
            <ListGroup>
              {this.state.accounts.map((account, index) => {
                if (index === this.state.editNum) {
                  return (
                    <ListGroup.Item key={account.account}>
                      <Form
                        style={{ padding: "5%" }}
                        onSubmit={this.editAccount}
                      >
                        <input
                          id="index"
                          readOnly
                          style={{ display: "none" }}
                          value={index}
                        />
                        <CreateFormComponent
                          id="account"
                          title="Account"
                          placeholder="ex. Facebook, Wells Fargo, AppleID ..."
                          defaultValue={account.account}
                        />
                        <CreateFormComponent
                          id="username"
                          title="Username"
                          placeholder="Enter your login username"
                          defaultValue={account.username}
                        />
                        <CreateFormComponent
                          id="password"
                          title="Password"
                          placeholder="Enter password"
                          defaultValue={account.password}
                        />
                        <CreateFormComponent
                          id="link"
                          title="Website Link"
                          placeholder="ex. https://www.facebook.com/"
                          defaultValue={account.link}
                        />

                        <Button style={{ float: "right" }} type="submit">
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ float: "right", margin: "0 0.5rem" }}
                          onClick={() => this.setState({ editNum: null })}
                        >
                          Cancel
                        </Button>
                      </Form>
                    </ListGroup.Item>
                  );
                }
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
                      <div
                        onClick={() => this.setState({ editNum: index })}
                        style={{ fontSize: "0.8rem", float: "right" }}
                      >
                        edit
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
              <ListGroup.Item>
                <h3> Add a New Account</h3>
                <Form style={{ padding: "5%" }} onSubmit={this.addAccount}>
                  <CreateFormComponent
                    id="account"
                    title="Account"
                    placeholder="ex. Facebook, Wells Fargo, AppleID ..."
                    defaultValue=""
                  />
                  <CreateFormComponent
                    id="username"
                    title="Username"
                    placeholder="Enter your login username"
                    defaultValue=""
                  />
                  <CreateFormComponent
                    id="password"
                    title="Password"
                    placeholder="Enter password"
                    defaultValue=""
                  />
                  <CreateFormComponent
                    id="link"
                    title="Website Link"
                    placeholder="ex. https://www.facebook.com/"
                    defaultValue=""
                  />
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

export default MyInfo;
