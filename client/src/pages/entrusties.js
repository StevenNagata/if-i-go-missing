import React from "react";
import { Container, Col, ListGroup, Button, Modal } from "react-bootstrap";

class Trusties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      modalContent: null,
      entrusties: this.props.entrusties,
      missingInformation: []
    };
  }
  componentDidMount() {
    this.checkMissing();
  }
  checkMissing = () => {
    const entrusties = this.props.entrusties.map(entrustie => entrustie.id);
    fetch("/checkIfMissing", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ entrusties })
    })
      .then(res => res.json())
      .then(data => {
        const updatedEntrusties = this.state.entrusties.map(entrustie => {
          const missingFlag = data.find(user => user.id === entrustie.id)
          return Object.assign({}, entrustie, {missing: missingFlag.missing})
        })
        this.setState({entrusties: updatedEntrusties})
      });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ entrusties: nextProps.entrusties });
    this.checkMissing();
  }
  handleClose = () => this.setState({ show: false });
  handleSave = () => {
    this.props.updateMissingFlag(
      this.state.modalContent.id,
      this.state.modalContent.username
    );
    this.setState({ show: false });
  };
  render() {
    console.log(this.state)
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
                    <ListGroup.Item key={user.username} style={{backgroundColor: user.reportedAsMissing ? "#F8D7DA" : "#FFFFFF"}}>
                      <span>{user.username}</span>
                      <Button
                        style={{ postion: "absolute", float: "right" }}
                        size="sm"
                        variant={reportButton.color}
                        onClick={() =>
                          this.setState({ show: true, modalContent: user })
                        }
                      >
                        {reportButton.text}
                      </Button>
                      
                      {user.missing && (
                        <div>
                          <hr/>
                        <span>
                          This user has been reported as missing by all thier trusties. You may now access their information.
                          </span>
                          <div style={{margin: '0.4rem'}}>
                          <Button 
                          variant="dark"
                          onClick={()=> {
                            this.props.history.push(`/missingPerson#${user.id}`)
                          }}>View Missing Information</Button>
                          </div>
                        </div>
                      )}
                      
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
