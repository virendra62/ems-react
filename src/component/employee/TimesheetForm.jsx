import React, { Component } from "react";
import "./TimesheetForm.css";
import { Form,Button,Col,Row } from "react-bootstrap";
import axios from "axios";

class TimesheetForm extends Component {
  state = {
  };
  componentWillMount()  {
     
  }
  render() {
    return (
      <div>
        
        <h2 id="role-form-title">Add Worklog Details</h2>
 <div id="role-form-outer-div"><Form id="form" onSubmit={this.props.onWorklogSubmit}>
  

  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    Task Description 
    </Form.Label>
    <Col sm={10}  className="form-input">
      <Form.Control type="Text" placeholder="Task Description " required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    Entry Date 
    </Form.Label>
    <Col sm={10}  className="form-input">
      <Form.Control type="date" placeholder="Entry Date " required/>
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    Project
    </Form.Label>
   <Col sm={10} className="form-input">
      <Form.Control as="select" required>
        
        {this.props.listData.map(project=>
        <option
          value={project.id}
          selected={true}
        >
          {project.name}
        </option>
        )}
        
    </Form.Control>
    </Col>
  </Form.Group>
  <Form.Group as={Row}>
    <Form.Label column sm={2}>
    Work Hour
    </Form.Label>
    <Col sm={10}  className="form-input">
      <Form.Control type="number" placeholder="Hour" required/>
    </Col>
  </Form.Group>
 
  

  <Form.Group as={Row} id="form-submit-button">
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Submit</Button>
    </Col>
  </Form.Group>
  <Form.Group as={Row} id="form-cancel-button">
    <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
      <Button type="reset" onClick={this.props.onFormClose}>cancel</Button>
    </Col>
  </Form.Group>
</Form></div>
      </div>
    );
  }
}

export default TimesheetForm;
