import React, { Component } from "react";
// import "./WorklogFormEdit.css";
// import { Form,Button } from "react-bootstrap";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

class TimesheetForm extends Component {
  state = {
    // WorklogData: this.props.editData["WorklogName"],

    TaskDescriptionData: this.props.editData["taskDescription"],
    EntryDateData: this.props.editData["entryDate"],
    ProjectData: this.props.editData.project["name"],
    WorkHourData: this.props.editData["workHour"],
    ProjectIdData: this.props.editData.project["id"]
  };
  onDescriptionDataChange(e) {
    console.log("Name",e.target.value)
    this.setState({ TaskDescriptionData: e.target.value });
  }
  onDateDataChange(e) {
    this.setState({ EntryDateData: e.target.value });
  }
 
  onWorkHourDataChange(e) {
    this.setState({ WorkHourData: e.target.value });
  }
  

  componentWillMount() {
  }

  render() {
    console.log("Project =--==", this.state.ProjectData)
    return (
      <div>
        <h2 id="role-form-title">Edit Worklog Details</h2>

        <div id="role-form-outer-div">
          <Form
            id="form"
            onSubmit={e =>
              this.props.onWorklogEditUpdate(this.props.editData, e)
            }
          >
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Task Description
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Text"
                  placeholder="Task Description "
                  required
                  value={this.state.TaskDescriptionData}
                  onChange={value => this.onDescriptionDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Entry Date
              </Form.Label>
              <Col sm={10} className="form-input">
                <Form.Control
                  type="date"
                  placeholder="Entry Date "
                  required
                  value={this.state.EntryDateData}
                  onChange={value => this.onDateDataChange(value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={2}>
                Project
              </Form.Label>
              <Col sm={10} className="form-input">
                  <Form.Control as="select" required>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    {this.props.listData.map(project=>
                    <option
                      value={project.id}
                      selected={this.state.ProjectIdData == project.id}
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
              <Col sm={10} className="form-input">
                <Form.Control
                  type="Number"
                  placeholder="Work Hour"
                  required
                  value={this.state.WorkHourData}
                  onChange={value => this.onWorkHourDataChange(value)}
                />
              </Col>

              


            </Form.Group>

            <Form.Group as={Row} id="form-submit-button">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Update</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={this.props.onFormEditClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default TimesheetForm;
