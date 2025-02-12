import React, { Component } from "react";
import "./WorkExperience.css";
import axios from "axios";
import WorkExperienceTable from "./WorkExperienceTable.jsx";
import WorkExperienceForm from "./WorkExperienceForm.jsx";
import WorkExperienceFormEdit from "./WorkExperienceFormEdit.jsx";
class WorkExperience extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},

  };

  render() {
    return (
      <React.Fragment>
        {/* <h1>iiiiiiiiiinnnnnnnnnnnnnn{
          JSON.stringify(this.props.data)}</h1> */}

        {this.state.table ? (
          this.state.editForm ? (
            <WorkExperienceFormEdit
              onWorkExperienceEditUpdate={this.handleWorkExperienceEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}

            />
          ) : (
              <WorkExperienceTable
                onAddWorkExperience={this.handleAddWorkExperience}
                onEditWorkExperience={this.handleEditWorkExperience}
                data={this.props.data}
                back={this.props.back}
              />
            )
        ) : (
            <WorkExperienceForm
              onWorkExperienceSubmit={this.handleWorkExperienceSubmit}
              onFormClose={this.handleFormClose}
              onGenderChange={this.handleAddFormGenderChange}
            />
          )}
      </React.Fragment>
    );
  }
  handleWorkExperienceSubmit = event => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    this.setState({ table: true });
console.log(this.props.data["_id"])
    let body = {
      companyName: event.target[0].value,
      designation: event.target[1].value,
      fromDate: event.target[2].value,
      toDate: event.target[3].value,
      employeeId: this.props.data["_id"]
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/work-experience/" + this.props.data["_id"], body, {
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
  handleAddWorkExperience = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditWorkExperience = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] })
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
  handleWorkExperienceEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("Work info"+info)
    console.log("zero data", newInfo.target[0].value);
    let body = {
      id:  this.props.data["_id"],
      companyName: newInfo.target[0].value,
      designation: newInfo.target[1].value,
      fromDate: newInfo.target[2].value,
      toDate: newInfo.target[3].value,
      employeeId: info["employeeId"]
    };
    console.log("update", body);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/work-experience/" + info["id"],
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

export default WorkExperience;
