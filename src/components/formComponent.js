import React from "react";
import { Form } from "react-bootstrap";

export function createFormComponent(id,title, placeHolder) {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{title}</Form.Label>
      <Form.Control  placeholder={placeHolder}/>
    </Form.Group>
  );
}
