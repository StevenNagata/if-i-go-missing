import React from "react";
import { Form } from "react-bootstrap";

export class CreateFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue
    };
  }
  render() {
      console.log(this.state.value)
    return (
      <Form.Group controlId={this.props.id}>
        <Form.Label>{this.props.title}</Form.Label>
        <Form.Control onChange={(event) => this.setState({value: event.target.value})} value={this.state.value} placeholder={this.props.placeholder} />
      </Form.Group>
    );
  }
}
