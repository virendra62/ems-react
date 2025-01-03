import React, { Component } from "react";
import "./PersonalInfo.css";
import axios from "axios";
import PersonalInfoTable from "./PersonalInfoTable.jsx";
import PersonalInfoFormEdit from "./PersonalInfoFormEdit.jsx";
class PersonalInfo extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    addFormGender: "",
    editFormGender: ""
  };

  render() {
    return (
      <React.Fragment>

        {this.state.table ? (
          this.state.editForm ? (
            <PersonalInfoFormEdit
              onPersonalInfoEditUpdate={this.handlePersonalInfoEditUpdate}
              onFormEditClose={this.handleEditFormClose}
              editData={this.state.editData}
              onGenderChange={this.handleEditFormGenderChange}
            />
          ) : (
              <PersonalInfoTable
                onAddPersonalInfo={this.handleAddPersonalInfo}
                onEditPersonalInfo={this.handleEditPersonalInfo}
                data={this.props.data}
                back={this.props.back}
              />
            )
        ) : (
            <div />
          )}
      </React.Fragment>
    );
  }
  handleEditPersonalInfo = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handlePersonalInfoEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    console.log("zero data", this.props.data["_id"]);
    let body = {
      id:  this.props.data["_id"],
      gender: newInfo.target[3].value,
      firstName: newInfo.target[0].value,
      middleName: newInfo.target[1].value,
      lastName: newInfo.target[2].value,
      phone: newInfo.target[5].value,
      emergencyContactNo: newInfo.target[6].value,
      email: newInfo.target[7].value,
      panCardNumber: newInfo.target[8].value,
      dob: newInfo.target[9].value,
      bloodGroup: newInfo.target[10].value,
      hobby: newInfo.target[11].value,
      address: newInfo.target[12].value,
      permanentAddress: newInfo.target[13].value
    };
    console.log("update", body);
    axios
      .put(process.env.REACT_APP_API_URL + "/api/personal-info/"+ this.props.data["_id"], body, {
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

    this.setState({ editForm: false });
  };
  handleEditFormGenderChange = e => {
    // console.log(e.currentTarget.value);
    // console.log("ggggggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnnnnn")
    this.setState({
      editFormGender: e.currentTarget.value
    });
  };
}

export default PersonalInfo;
