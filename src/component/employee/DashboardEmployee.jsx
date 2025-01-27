import React, { Component } from "react";
import "./DashboardEmployee.css";
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Switch } from "react-router";
import { Redirect } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
import Education from "./Education.jsx";
import FamilyInfo from "./FamilyInfo.jsx";
import WorkExperience from "./WorkExperience.jsx";
import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
import EmpTimesheet from "./Timesheet.jsx";
import Employee from "./Employee.jsx";
import NotFound404 from "../NotFound404.jsx";
import moment from 'moment';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from "axios";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Logo from "../../img/viru.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
 faUser,
faFileAlt,
faUniversity,
faBriefcase,
faMale,
faGavel,
faGlobe,
faVideoSlash,
faList,
faPlaneArrival,
faChartLine,
} from "@fortawesome/free-solid-svg-icons";


var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
var dayName = days[d.getDay()];
const currentDate = moment().format('MMM DD, YYYY');
setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  if( document.getElementById("time") !== 'undefined' &&  document.getElementById("time") != null)
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}

class DashboardHR extends Component {
  state = {
    redirect: true,
    checked: true,
    hasTodayLoginEntry:false,
    loginEntryObj:{},
    sinceLastLogin: "0h:0m"
  };
  handleChange=(checked)=> {
    console.log("switch");
    // var sidebarV = this.refs.sidebar;
    // var sidebarV = React.findDOMNode( this.refs.sidebar);
    // sidebarV.style.disply="none";
    
    if(this.state.checked==true){ 
       // document.getElementById("sidebar").setAttribute("style", "display:none")
      document.getElementById("sidebar").setAttribute("class", "display-none");
    }
    // document.getElementById("sidebar").setAttribute("style", "display:block");
    else{document.getElementById("sidebar").setAttribute("class", "display-block");}   
    this.setState({ checked });
  }
  componentDidMount() {
    this.checkLoginOutEnty();
  }

  logoutEntry = (entyDetail) => {
    if (window.confirm("Are you sure? ") == true) {
    let body = {
      employeeId: this.props.data["_id"],
      id: entyDetail.id
    };
    axios
      .put(process.env.REACT_APP_API_URL + "/api/logout-entry", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
          accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
       if(response.data) {
         this.setState({hasTodayLoginEntry: false})
       }
      });
    }
  }

  loginEntry=() => {
    let body = {
      employeeId: this.props.data["_id"]
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/api/login-entry", body, {
        headers: {
          authorization: localStorage.getItem("token") || "",
          accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
       if(response.data) {
        this.setState({loginEntryObj: response.data});
         this.setState({hasTodayLoginEntry: true})
         console.log(this.state.hasTodayLoginEntry)
       }
      });
  }
  checkLoginOutEnty=() =>{
    axios
    .get(process.env.REACT_APP_API_URL + "/api/login-entry-detail/" +this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
       if(response.data != "") {
         this.setState({loginEntryObj: response.data});
         console.log(this.state.loginEntryObj.loginEntry)
         this.setState({hasTodayLoginEntry: true})
         var date1 = new Date(this.state.loginEntryObj.loginEntry).getTime();
         var date2 = new Date().getTime();
         var msec = date2 - date1;
         var mins = Math.floor(msec / 60000);
         var hrs = Math.floor(mins / 60);
         var lastLoginDetail = 
         this.setState({lastLoginDetail:hrs +"h:"+mins % 60+"m"});
       }
      });
  }

  render() {
    const holidays = [
      { month: 'JAN', date: '01', name: "New Year's Day", day: 'Wednesday', floater: false },
      { month: 'JAN', date: '14', name: 'Makar Sankranti', day: 'Tuesday', floater: false },
      { month: 'FEB', date: '26', name: 'Maha Shivaratri', day: 'Wednesday', floater: true },
      { month: 'MAR', date: '14', name: 'Holi', day: 'Friday', floater: false },
      { month: 'MAR', date: '31', name: 'Eid al-Fitr', day: 'Monday', floater: false },
      { month: 'APR', date: '18', name: 'Good Friday', day: 'Friday', floater: true },
      { month: 'MAY', date: '01', name: 'May Day', day: 'Thursday', floater: false },
      { month: 'AUG', date: '15', name: 'Independence Day', day: 'Friday', floater: false },
      { month: 'AUG', date: '18', name: 'Raksha Bandhan', day: 'Monday', floater: true },
      { month: 'AUG', date: '27', name: 'Ganesh Chaturthi', day: 'Wednesday', floater: true },
      { month: 'SEPT', date: '05', name: 'Onam/Eid- e-Milad', day: 'Friday', floater: true },
      { month: 'OCT', date: '01', name: 'Ayudha Pooja/ Vijaya Dashami', day: 'Wednesday', floater: true },
      { month: 'OCT', date: '02', name: 'Gandhi Jayanti', day: 'Thursday', floater: false },
      { month: 'OCT', date: '20', name: 'Diwali', day: 'Monday', floater: false },
      { month: 'DEC', date: '25', name: 'Christmas', day: 'Thursday', floater: false },
  ];

  const HolidayItem = ({ month, date, name, day, floater }) => (
      <div className="flex items-center mb-4">
          <div className={`w-16 h-16 flex flex-col items-center justify-center rounded-lg ${month === 'JAN' ? 'bg-blue-200' : month === 'FEB' ? 'bg-red-200' : month === 'MAR' ? 'bg-yellow-200' : month === 'APR' ? 'bg-blue-200' : month === 'MAY' ? 'bg-yellow-200' : month === 'AUG' ? 'bg-pink-200' : month === 'SEPT' ? 'bg-blue-200' : month === 'OCT' ? 'bg-red-200' : month === 'DEC' ? 'bg-blue-200' : ''}`}>
              <div className="text-sm font-bold">{month}</div>
              <div className="text-xl font-bold">{date}</div>
          </div>
          <div className="ml-4">
              <div className="text-lg font-semibold">{name}</div>
              <div className="text-sm text-gray-500">{day}</div>
              {floater && <div className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1 inline-block">FLOATER LEAVE</div>}
          </div>
      </div>
  );

    const options = {
      dataPointWidth: 50,
      height: 336,
      axisY: [
        {
          title: "Hours",
          lineColor: "#369EAD"
        },
      ],
      axisX: [
        {
          title: "Days",
          lineColor: "#369EAD",
         
        },
      ],
			data: [
			{
				// Change type to "doughnut", "line", "splineArea", etc.
				type: "column",
        height: 80,
        dataPointWidth: 20,
				dataPoints: [
					{ label: "Monday",  y: 1  },
					{ label: "Tuesday", y: 2  },
					{ label: "Wednesday", y: 6  },
					{ label: "Thursday",  y: 3  },
					{ label: "Friday",  y: 10  }
				]
			}
			]
		}

    return (
      
      <Router>
       
        {/* <Redirect to='/login'  /> */}

        <div id="outer-main-div">
          <div id="outer-nav">
            {/* <NavBar loginInfo={this.props.data} /> */}
            <NavBar
              loginInfo={this.props.data}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>
          
          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title" className="main-title-employee">
                <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                Employee
              </div>
              <ul className="navbar-ul">
              <li>
                  <Link
                    to={
                      "/employee/" +
                      this.props.data["_id"] +
                      "/dashboard"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faGlobe}
                      className="sidebar-icon"
                    />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.props.data["_id"] +
                      "/personal-info"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      className="sidebar-icon"
                    />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to={
                      "/employee/" + this.props.data["_id"] + "/education"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faUniversity}
                      className="sidebar-icon"
                    />
                    Education
                  </Link>
                </li>
                <li>
                  <Link to={
                      "/employee/" + this.props.data["_id"] + "/family-info"
                    }>
                    <FontAwesomeIcon
                      icon={faMale}
                      className="sidebar-icon"
                    />
                    Dependents
                  </Link>
                </li>
                <li>
                  <Link to={
                      "/employee/" + this.props.data["_id"] + "/work-experience"
                    }>
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className="sidebar-icon"
                    />
                    Work Experience
                  </Link>
                </li>
                <li>
                  <Link to={
                      "/employee/" + this.props.data["_id"] + "/leave-application-emp"
                    }>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    Leave Application
                  </Link>
                </li>
                <li>
                  <Link to={
                      "/employee/" + this.props.data["_id"] + "/emp-timesheet"
                    }>
                    <FontAwesomeIcon
                      icon={faFileAlt}
                      className="sidebar-icon"
                    />
                    Time Sheet
                  </Link>
                </li>
                {this.props.data["Role"] == "manager" ? 
                <li>
                  <Link
                    to={
                      "/employee/" + this.props.data["_id"] + "/list"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faList}
                      className="sidebar-icon"
                    />
                    Employee List
                  </Link>
                </li>
                 :''}
                <li>
                  <Link
                    to={
                      "/employee/" +
                      this.props.data["_id"] +
                      "/emp-perfomance"
                    }
                  >
                    <FontAwesomeIcon
                      icon={faChartLine}
                      className="sidebar-icon"
                    />
                    Employee Performance
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div id="sidebar-top-content" /> */}
            <div id="main-area">
              <div id="sidebar-top-content" />
              {/* //table */}
              {/* <RoleHR/> */}
              <Switch>
                {/* <Route
                  path="/employee/:id/personal-info"
                  exact
                  component={PersonalInfoF}
                /> */}
                <Route
                  exact
                  path="/employee/:id/personal-info"
                  render={props => <PersonalInfo data={this.props.data} back={false}/>}
                />
                <Route
                  exact
                  path="/employee/:id/education"
                  render={props => <Education data={this.props.data} back={false}/>}
                />
                <Route
                  exact
                  path="/employee/:id/family-info"
                  render={props => <FamilyInfo data={this.props.data} back={false}/>}
                />
                <Route
                  exact
                  path="/employee/:id/work-experience"
                  render={props => <WorkExperience data={this.props.data} back={false}/>}
                />
                <Route
                  exact
                  path="/employee/:id/leave-application-emp"
                  render={props => <LeaveApplicationEmp data={this.props.data} />}
                />
                <Route
                  exact
                  path="/employee/:id/emp-timesheet"
                  render={props => <EmpTimesheet data={this.props.data} />}
                />

                <Route
                  exact
                  path="/employee/:id/list"
                  render={props => <Employee data={this.props.data} />}
                />
               
                {/* <Route
                  exact
                  path="/employee"
                  render={() => (
                    <Redirect
                      to={
                        "/employee/" +
                        this.props.data["_id"] +
                        "/personal-info"
                      }
                    />
                  )}
                /> */}
                <main className="flex-1 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Work Log</h1>
                            
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                            
                <div className="bg-white p-6 rounded-lg shadow-lg col-span-2">
                                <h2 className="text-gray-600 mb-4">Work Time Statistics</h2>
                                <div className="bg-white p-4 rounded shadow-lg">
                    <CanvasJSChart options = {options} />
                </div>
                            </div>
                            <div className=" bg-gray-100">
                        <div className="bg-white p-6 rounded-lg shadow-md flex space-x-6">
                         <div className="text-center">
                            <div className="border p-4 rounded-lg mb-4 bg-time">
                                <div className="text-2xl font-semibold">
                                  <span id="time"></span>
                                </div>
                            </div>
                            <div className="text-gray-600">{currentDate} <span>{dayName}</span></div>
                            <div className="mt-4 text-gray-600">
                                <div className="font-semibold">TOTAL HOURS <i className="fas fa-info-circle" title="These hours are calculated w.r.t Web and forgot id clock-ins/outs for the current day only. Bio-metric clock-ins are not considered."></i></div>
                                <div>Effective: {this.state.lastLoginDetail}</div>
                                <div class="margin-right">Gross: {this.state.lastLoginDetail}</div>
                            </div>
                        </div>
                        <div className="text-center">
                        {this.state.hasTodayLoginEntry == true ?
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4" onClick={e => this.logoutEntry(this.state.loginEntryObj, e)}>Web Clock-out</button> :
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4"  onClick={this.loginEntry}>Web Clock-In</button>
                        }
                            <div className="text-gray-600">
                             <span className="font-semibold">{this.state.lastLoginDetail}</span> Since Last Login
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center text-blue-500">
                                    <i className="fas fa-home mr-2"></i> Work From Home
                                </div>
                                <div className="flex items-center text-blue-500">
                                    <i className="fas fa-briefcase mr-2"></i> On Duty
                                </div>
                                <div className="flex items-center text-blue-500">
                                    <i className="fas fa-file-alt mr-2"></i> Attendance Policy
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-yellow-500 p-4 flex justify-between">
                    <div className="flex items-center">
                        
                        <div>
                            <h1 className="text-black text-sm">Holidays</h1>
                            <h2 className="text-white text-2xl font-bold">Maha Shivaratri</h2>
                            <p className="text-white text-sm">Wed, 26 February, 2025 <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">FLOATER LEAVE</span></p>
                        </div>
                    </div>
                    <div className="flex items-self-start">
                    <Popup trigger=
                {<button className="text-white rounded">View All</button>} 
                modal nested>
                {
                    close => (
                      <div> 
                         
                          <div className="flex items-center">
                          <h1 className="text-2xl font-bold">Holidays <span className="text-lg">2025</span></h1>
                             
                              
                          </div>
                      <div className="view-leave items-center  p-4">
                    <div className="bg-white rounded shadow-md">
                    {holidays.map((holiday, index) => (
                    <HolidayItem key={index} {...holiday} />
                ))}
                          
                      
                        
                    </div>
                        </div>
                        <button  className="btn-right bg-time text-white p-2 rounded" onClick=
                                    {() => close()}>
                                        Close
                                </button>
                        </div>
                    )
                }
            </Popup>
                    </div>
                </div>	
                </div>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
                            <div className="bg-project p-6 rounded-lg shadow-lg flex items-center">
                                <div className="font-white text-2xl font-bold text-blue-500 mr-4">10</div>
                                <div>
                                    <p className="font-white text-gray-600">Number of Projects Assigned</p>
                                </div>
                            </div>
                            <div className="bg-completed p-6 rounded-lg shadow-lg flex items-center">
                                <div className="font-white text-2xl font-bold text-green-500 mr-4">5</div>
                                <div>
                                    <p className="font-white text-gray-600">Number of Projects Completed</p>
                                </div>
                            </div>
                            <div className="bg-process p-6 rounded-lg shadow-lg flex items-center">
                                <div className="font-white text-2xl font-bold text-orange-500 mr-4">04</div>
                                <div>
                                    <p className="font-white text-gray-600">On Leave Today</p>
                                </div>
                            </div>
                            <div className="bg-pending p-6 rounded-lg shadow-lg flex items-center">
                                <div className="font-white text-2xl font-bold text-pink-500 mr-4">06</div>
                                <div>
                                    <p className="font-white text-gray-600">Leave Balance</p>
                                </div>
                            </div>
                        </div>
                        

                        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
                            <h2 className="text-gray-600 mb-4">Today</h2>
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-gray-600">BIRTHDAY</p>
                                    <p>It is Shyamalee's Birthday.</p>
                                </div>
                                <div>
            <Popup trigger=
                {<button className="bg-teal-500 text-white py-2 px-4 rounded">Send Wishes</button>} 
                modal nested>
                {
                    close => (
                        <div>
                            <div className="flex flex-col md:flex-row items-center justify-center p-4">
                    <div className="bg-white p-8 rounded shadow-md w-full-popup md:w-1/2 lg:w-1/3">
                        <h1 className="text-2xl font-bold text-green-900 mb-4">Happy Birthday </h1>
                        <form className="space-y-4">
                            <textarea className="textarea-pop" placeholder="Add Your Wishes"/>
                            <button type="submit" className="w-full-popup bg-green-900 text-white p-2 rounded">Send</button>
                            <button  className="w-full-popup bg-time text-white p-2 rounded" onClick=
                                    {() => close()}>
                                        Close
                                </button>
                        </form>
                        
                    </div>
                    <div className="mt-8 md:mt-0 md:ml-8">
                    <img src={Logo} alt="" className="rounded shadow-md" />
                    </div>
                
                           
                        </div>
                        </div>
                    )
                }
            </Popup>

            
</div>

                                
                            </div>
                          
                        </div>
                    </main>
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default DashboardHR;
