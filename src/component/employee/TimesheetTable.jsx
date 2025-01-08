import React, { Component } from "react";
import "./TimesheetTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class TimesheetTable extends Component {
  state = {
    timesheetData: [],
    projectData: [],
    loading: true,

    columnDefs: [

      {
        headerName: "Task Description",
        field: "TaskDescription",
        sortable: true,
        // width: 410,
        // filter: true ,
      },
      {
        headerName: "Entry Date",
        field: "EntryDate",
        sortable: true,
         //width: 410,
        // filter: true ,
      },
      {
        headerName: "Project",
        field: "Project",
        sortable: true,
         //width: 410,
        // filter: true ,
      },
      {
        headerName: "Work Hour(s)",
        field: "WorkHour",
        sortable: true,
         //width: 410,
        // filter: true ,
      },


      {
        headerName: "",
        field: "edit",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderEditButton.bind(this)
      },
      {
        headerName: "",
        field: "delete",
        filter: false,
        width: 30,
        cellRendererFramework: this.renderButton.bind(this)
      }
    ],
    rowData: [],
    defaultColDef: {
      resizable: true,
      width: 295,
      filter: "agTextColumnFilter"
      // filter: true ,
    },
    getRowHeight: function (params) {
      return 35;
    }


  };
  timesheetObj = [];
  projectObj = [];
  rowDataT = [];


  loadTimesheetData = () => {
    console.log(this.props.data)
    console.log("====="+process.env.REACT_APP_WORKLOG_API_URL)

    axios
    .get(process.env.REACT_APP_PROJECT_API_URL + "/api/project", {
      headers: {
        authorization: localStorage.getItem("token") || ""
      }
    })
    .then(response => {
      console.log("Project :: "+response.data)
      this.projectObj = response.data;
      console.log("response", response.data);
      this.setState({ projectDataObj: response.data });
      this.setState({ loading: false });
      this.rowDataProject = [];
      // let data=this.timesheetObj.education["0"];
      console.log("this.projectObj", this.state.projectDataObj);
      this.props.setTimeSheetData(this.state.projectDataObj);
      //this.timesheetObj.map(data => {
       
    })
    .catch(error => {
      console.log(error);
    });

    axios
      .get(process.env.REACT_APP_WORKLOG_API_URL + "/api/worklog/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        console.log("===<><>"+response)
        this.timesheetObj = response.data;
        console.log("response", response.data);
        this.setState({ timesheetData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];
        // let data=this.timesheetObj.education["0"];
        console.log("data", this.timesheetObj["entryDate"]);
        this.timesheetObj.map(data => {
          let temp = {
            data,
            TaskDescription:data["taskDescription"],
            EntryDate:data["entryDate"].slice(0, 10),
            Project:data.project["name"],
            WorkHour:data["workHour"],
            ProjectIdData:data.project["id"]
          };

          this.rowDataT.push(temp);
        });
        //this.timesheetObj.map(data => {
         
        this.setState({ rowData: this.rowDataT });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onWorklogDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete(process.env.REACT_APP_API_URL + "/api/education/" + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  componentDidMount() {
    this.loadTimesheetData();
  }
  renderButton(params) {
    console.log(">>>>>>>>>>"+params.data);
    if (this.props.back) { return <React.Fragment /> }
    if (this.props.data["Account"] != 3) {
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() =>
            this.onWorklogDelete(this.props.data["_id"], params.data.data["id"])
          }
        />
      );
    } else {
      return null;
    }
  }
  renderEditButton(params) {
    console.log("params====>>",params);
    if (this.props.back) { return <React.Fragment /> }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditWorklog(params.data.data, this.state.projectDataObj)}
      />
    );
  }

  render() {

    console.log("All>>>>>>>", this.state)

    return (
      <div id="table-outer-div-scroll">
        <h2 id="role-title">Employee TimeSheet Details {this.props.back ? "of " + this.props.data["FirstName"] + " " + this.props.data["LastName"] : ""}</h2>

        { this.props.back ? (<Link to="/hr/employee">
          <Button
            variant="primary"
            id="add-button"
          >
            Back
        </Button>
        </Link>) : <Button
          variant="primary"
          id="add-button"
          onClick={this.props.onAddWorklog}
        >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Add
        </Button>} 



        <div id="clear-both" />

        {!this.state.loading ? (
          <div
            id="table-div"
            className="ag-theme-balham"
          //   style={
          //     {
          //     height: "500px",
          //     width: "100%"
          //   }
          // }
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              // floatingFilter={true}
              // onGridReady={this.onGridReady}
              pagination={true}
              paginationPageSize={10}
              getRowHeight={this.state.getRowHeight}
            />
          </div>
        ) : (
            <div id="loading-bar">
              <RingLoader
                css={override}
                sizeUnit={"px"}
                size={50}
                color={"#0000ff"}
                loading={true}
              />
            </div>
          )}


      </div>
    );
  }
}

export default TimesheetTable;
