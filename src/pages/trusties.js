import React from "react";
import {
  Form,
  Container,
  Col,
  ListGroup,
  Button,
  InputGroup,
  FormControl
} from "react-bootstrap";
import Fab from "@material-ui/core/Fab";

class Trusties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      trusties: [
        {
          username: "tifflui25@yahoo.com",
          reportedYouAsMissing: false
        },
        {
          username: "andre300@gmail.com",
          reportedYouAsMissing: true
        },
        {
          username: "andyrezz33@gmail.com",
          reportedYouAsMissing: false
        }
      ],
      editedTrusties: [
        {
          username: "tifflui25@yahoo.com",
          reportedYouAsMissing: false
        },
        {
          username: "andre300@gmail.com",
          reportedYouAsMissing: true
        },
        {
          username: "andyrezz33@gmail.com",
          reportedYouAsMissing: false
        }
      ]
    };
    this.deleteTrustie = this.deleteTrustie.bind(this)
  }
  addTrustie = event => {
    event.preventDefault();
    let copyOfEditedTrusties = this.state.editedTrusties.map(user =>
      Object.assign({}, user)
    );
    copyOfEditedTrusties.push({
      username: event.target.newTrustie.value,
      reportedYouAsMissing: false
    });
    this.setState({ editedTrusties: copyOfEditedTrusties });
    event.target.reset();
  };
  deleteTrustie(user) {
    const removedUser = this.state.editedTrusties.filter(trustie => trustie.username !== user)
    this.setState({editedTrusties: removedUser})
  }
  render() {
    return (
      <div>
        <Container
          style={{
            padding: "0"
          }}
        >
          <h2 style={{ textAlign: "center", padding: "1rem" }}>
            {this.state.editMode ? "Edit" : "My"} Trusties
          </h2>

          <Col xs={12}>
            <ListGroup>
              {!this.state.editMode
                ? this.state.trusties.map(user => {
                    const marked = user.reportedYouAsMissing
                      ? {
                          color: "#F8D7DA",
                          text: "has marked you as missing!"
                        }
                      : {
                          color: "#D4EDDA",
                          text: "has marked you as safe!"
                        };
                    return (
                      <ListGroup.Item
                        key={user.username}
                        style={{
                          backgroundColor: marked.color
                        }}
                      >
                        <div>
                          {user.username} {marked.text}
                        </div>
                      </ListGroup.Item>
                    );
                  })
                : this.state.editedTrusties.map(user => {
                    return (
                      <ListGroup.Item key={user.username}>
                        <div>
                          {user.username}
                          <i
                            onClick={() => this.deleteTrustie(user.username)}
                            style={{ position: "absolute", right: "0.8rem" }}
                            className="material-icons"
                          >
                            close
                          </i>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
              {this.state.editMode && (
                <ListGroup.Item key="add">
                  <Form onSubmit={this.addTrustie}>
                    <InputGroup>
                      <FormControl
                        id="newTrustie"
                        placeholder="Add a trustie"
                      />
                      <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary">
                          Add
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form>
                </ListGroup.Item>
              )}
            </ListGroup>
            {this.state.editMode && (
              <div style={{ marginTop: "1rem" }}>
                <Button 
                style={{ float: "right" }}
                onClick={() => this.setState({editMode:false, trusties: this.state.editedTrusties})}>
                  Save
                </Button>
                <Button
                  variant="secondary"
                  style={{ float: "right", margin: "0 0.5rem" }}
                  onClick={() => this.setState({ editMode: false })}
                >
                  {" "}
                  Cancel
                </Button>
              </div>
            )}
          </Col>
        </Container>
        {!this.state.editMode && (
          <Fab
            onClick={() => this.setState({ editMode: true, editedTrusties: this.state.trusties })}
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              backgroundColor: "#343A40",
              color: "white"
            }}
            aria-label="add"
          >
            <i className="material-icons">edit</i>
          </Fab>
        )}
      </div>
    );
  }
}

export default Trusties;
