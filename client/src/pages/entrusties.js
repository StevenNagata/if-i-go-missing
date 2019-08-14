import React from "react";
import {
  Container,
  Col,
  ListGroup,
  Button,
  Modal
} from "react-bootstrap";

class Trusties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalContent: null,
      entrusties: []
    };
  }
  componentDidMount() {
    fetch("user/1")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          entrusties: data[0].entrusties
        });
      });
  }
  handleClose = () => this.setState({ show: false });
  handleSave = () => {
    fetch("updateMissingFlag/", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id: this.state.modalContent.id , user: this.state.modalContent.username, requesterId: 1 })
    })
    .then(res => res.json())
    .then(data => {
        this.setState({entrusties: data[0].entrusties, show: false})
    })
  };
  render() {
    if (this.state.entrusties.length === 0) {
      return (
        <div style={{ position: "relative", height: "10rem" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          >
            You have no entrusties
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.modalContent && (
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {this.state.modalContent.reportedAsMissing
                  ? `You are about to declare ${
                      this.state.modalContent.username
                    } as safe. This will make thier information inaccesable to all of their trustiees`
                  : `You are about to declare ${
                      this.state.modalContent.username
                    } as missing. This will make thier information accesable once all trustiees confirm them as missing`}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleSave}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          )}
          <Container
            style={{
              padding: "0"
            }}
          >
            <h2 style={{ textAlign: "center", padding: "1rem" }}>
              {this.state.editMode ? "Edit" : "My"} Entrusties
            </h2>
            <Col xs={12}>
              <ListGroup>
                {this.state.entrusties.map(user => {
                  const reportButton = user.reportedAsMissing
                    ? { color: "success", text: "Report as safe" }
                    : { color: "danger", text: "Report as missing" };
                  return (
                    <ListGroup.Item
                      key={user.username}
                      onClick={() =>
                        this.setState({ show: true, modalContent: user })
                      }
                    >
                      <span>{user.username}</span>
                      {}
                      <Button
                        style={{ postion: "absolute", float: "right" }}
                        size="sm"
                        variant={reportButton.color}
                      >
                        {reportButton.text}
                      </Button>
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
}

export default Trusties;
