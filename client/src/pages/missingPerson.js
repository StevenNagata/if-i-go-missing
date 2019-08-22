import React from "react";
import { Container, Col, Form, ListGroup, Button } from "react-bootstrap";
import { CreateFormComponent } from "../components/formComponent";

class MissingPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      missingPersonInfo: null
    };
  }
  componentDidMount() {
    fetch("/missingPerson", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userId: window.location.hash.substr(1),
        requesterId: this.props.requesterId
      })
    })
      .then(res => res.json())
      .then(data => {
          console.log(data)
        if (data.statusCode === 200) {
          this.setState({ missingPersonInfo: data.content });
        } else if (data.statusCode === 400) {
          window.alert(data.message);
        } else {
          window.alert("Something went wrong");
        }
      });
  }
  showPassword = i => {
    const copyOfAccounts = this.state.missingPersonInfo.map((account, index) => {
      if (i === index) {
        return Object.assign({}, account, {
          hiddenPassword: !account.hiddenPassword
        });
      } else {
        return Object.assign({}, account);
      }
    });
    this.setState({ missingPersonInfo: copyOfAccounts });
  };
  render() {
      console.log(this.state)
    if (!this.state.missingPersonInfo) {
      return null;
    }
    return (
      <div>
        <Container
          style={{
            paddingBottom: "2rem",
          }}
        >
          <h2 style={{ textAlign: "center", padding: "1rem" }}>Missing Person Info</h2>
          <Col xs={12}>
            <ListGroup>
              {this.state.missingPersonInfo.map((account, index) => {
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
            </ListGroup>
          </Col>
        </Container>
      </div>
    );
  }
}

export default MissingPerson;
