import React, { Component } from "react";
import "./Timesheet.css";
import axios from "axios";
import TimesheetTable from "./TimesheetTable.jsx";
import TimesheetForm from "./TimesheetForm.jsx";
import TimesheetFormEdit from "./TimesheetFormEdit.jsx";
class Timesheet extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    listData: [],

  };

  render() {
    return (
      <React.Fragment>
        {/* <h1>iiiiiiiiiinnnnnnnnnnnnnn{
          JSON.stringify(this.props.data)}</h1> */}

        {this.state.table ? (
          this.state.editForm ? (
            <TimesheetFormEdit
              onWorklogEditUpdate={this.handleWorklogEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
              listData={this.state.listData}
              />
            ) : (
              <TimesheetTable
              onAddWorklog={this.handleAddWorklog}
              onEditWorklog={this.handleEditWorklog}
              data={this.props.data}
              back={this.props.back}
              setTimeSheetData={(data)=>this.state.listData=data}
              />
            )
        ) : (
            <TimesheetForm
              onWorklogSubmit={this.handleWorklogSubmit}
              onFormClose={this.handleFormClose}
              onGenderChange={this.handleAddFormGenderChange}
              listData={this.state.listData}
            />
          )}
      </React.Fragment>
    );
  }
  handleWorklogSubmit = event => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });

    let body = {

      taskDescription: event.target[0].value,
      entryDate: event.target[1].value,
      projectId: event.target[2].value,
      workHour: event.target[3].value,
      employeeId: this.props.data["_id"]
    };
    axios
      .post(process.env.REACT_APP_WORKLOG_API_URL + "/api/worklog/" + this.props.data["_id"], body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleAddWorklog = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditWorklog = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    //this.setState({ editFormGender: e["Gender"] })
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  // handleFormClose = () => {
  //   console.log("clicked1");
  //   this.setState({ table: true });
  // };
  handleWorklogEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", info);
    console.log(this.props)
    let body = {
      id:  info["id"],
      taskDescription: newInfo.target[0].value,
      entryDate: newInfo.target[1].value,
      projectId: newInfo.target[2].value,
      workHour: newInfo.target[3].value,
      employeeId: info["employeeId"]
    };
    console.log("update", body);
    axios
      .put(
        process.env.REACT_APP_WORKLOG_API_URL + "/api/worklog/" + info["id"],
        body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
      )
      .then(res => {
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({ editForm: false });
  };

}

export default Timesheet;
